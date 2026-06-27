# Next.js App Router Page Transitions Guide

This guide documents the technical architecture for implementing custom exit/entry page transitions in Next.js App Router applications.

---

## The Problem in Next.js App Router
By default, Next.js intercepts internal links using client-side routing. When a link is clicked:
1. Next.js instantly swaps layouts and routes.
2. The current page is immediately unmounted from the DOM.
3. This behavior makes playing an **exit transition** (before the new page unmounts) impossible through standard React hook lifecycles.

---

## The Solution: Capturing Phase Interception & Programmatic Routing

To bypass these defaults, we implement a persistent global wrapper layout that intercepts navigation clicks, stalls the browser event bubble, runs our transition timeline, and triggers programmatic routing only once the exit sequence finishes.

### Architectural Overview

```
[User Clicks Link]
       │
       ▼
[Capturing-Phase Interceptor]  ──(Matches relative internal routes)
       │
       ├─► e.preventDefault()   ──(Halts Next.js default routing)
       │
       ├─► Set state: isTransitioning = true (locks user clicks)
       │
       ├─► Play GSAP Exit Animation Timeline
       │         │
       │         └─► onComplete ──► setTimeout (optional pause) ──► router.push(href)
       │
       ▼
[Next.js Router Swap] ──► usePathname() updates
       │
       ▼
[Entrance Hydration Buffer] ──► 90ms paint buffer (prevents unpainted page flashes)
       │
       ▼
[Play GSAP Entry Animation Timeline]
       │
       └─► onComplete ──► Reset components ──► Set state: isTransitioning = false
```

---

## Step-by-Step Implementation Blueprint

### 1. Build the Global Interceptor Component
Create a wrapper component (e.g. `components/PageTransitionWrapper.tsx`) using the client-side router (`"use client"`).

```typescript
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

export const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Create refs for your transition elements
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Intercept Clicks Globally in the CAPTURING phase (useCapture = true)
    const handleLinkClick = (e: MouseEvent) => {
      // Ignore if modifier keys are pressed (e.g., Cmd/Ctrl click to open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");
        const targetAttr = target.getAttribute("target");
        
        // Ignore external targets
        if (targetAttr === "_blank") return;

        // Target relative internal routes only, excluding hash anchors
        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("/#") &&
          !href.includes("#") &&
          !href.includes(":") &&
          href !== pathname
        ) {
          // 2. Prevent Next.js from executing default instant navigation
          e.preventDefault();
          
          setIsTransitioning(true);
          
          // 3. Play your custom exit animation
          const tl = gsap.timeline({
            onComplete: () => {
              // 4. Navigate programmatically on complete
              // Optionally add a slight delay here so the user can inspect the fully covered state
              setTimeout(() => {
                router.push(href);
              }, 450); 
            }
          });

          // Insert custom exit animations here:
          tl.to(overlayRef.current, {
            y: "0%",
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }
    };

    // 'true' ensures we register the event in the CAPTURING phase
    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, [pathname, router]);

  // 5. Entrance transition triggered upon Next.js path changes
  useEffect(() => {
    // 90ms hydration buffer delay prevents flashes of unpainted page layouts
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          // Instantly reset coordinates for subsequent triggers
          gsap.set(overlayRef.current, { y: "-100%" });
        }
      });

      // Insert custom entrance animations here:
      tl.to(overlayRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.inOut"
      });
    }, 90);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Lock clicks and pointer events globally during route swaps */}
      <div className={isTransitioning ? "pointer-events-none select-none" : ""}>
        {children}
      </div>

      {/* Transition Overlay Element */}
      <div
        ref={overlayRef}
        style={{ transform: "translate3d(0, -100%, 0)" }}
        className="fixed inset-0 bg-[#0e3b2e] z-[9999] pointer-events-none"
      />
    </>
  );
};
```

### 2. Wrap the Root Layout
Wrap your root layout file (`app/layout.tsx`) around the wrapper component:

```tsx
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
```

---

## Key Technical Decisions & Best Practices

1. **Why `useCapture = true`?**
   Next.js intercept handlers are bound to bubble events on the `document`. By registering our event listener with `useCapture` (the third argument in `addEventListener`), our code intercepts the mouse click at the very start of the event cascade. Calling `e.preventDefault()` halts the event propagation before Next.js's router is even notified of the click, blocking premature redirects.

2. **Pointer Lock: `pointer-events-none`**
   When `isTransitioning` is true, we apply `pointer-events-none select-none` to the page layout container. This prevents users from clicking other links during the transition phase, which would trigger nested, overlapping animations or double-routing errors.

3. **Hydration Buffer Delay (`90ms`)**
   When `pathname` changes, React triggers layout mounts. Triggering the reveal animation instantly can cause a noticeable "flash" of an un-styled or half-painted DOM. A small timeout (`90ms`) allows Next.js to complete layout paint cycles before the overlay slides off-screen.
