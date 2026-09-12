"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

declare global {
  interface Window {
    __MEGAMENU_READY?: boolean;
  }
}

export const ArcheryTransition = ({ children }: { children: React.ReactNode }) => {
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Intercept clicks globally on internal relative links in the capturing phase
    const handleLinkClick = (e: MouseEvent) => {
      // Ignore if modifier keys are pressed (e.g. Cmd/Ctrl click)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");
        const targetAttr = target.getAttribute("target");
        
        // Ignore if target="_blank"
        if (targetAttr === "_blank") return;

        // Target relative paths, excluding anchors/hashes
        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("/#") &&
          !href.includes("#") &&
          !href.includes(":") &&
          href !== pathname
        ) {
          e.preventDefault();
          
          setIsTransitioning(true);
          
          const tl = gsap.timeline({
            onComplete: () => {
              // Add a pause delay once fully covered, before navigating
              setTimeout(() => {
                const targetPath = href.split("?")[0];
                const currentPath = pathname;

                router.push(href);

                // If navigating to the same page with different query parameters,
                // Next.js will NOT trigger a pathname change. We must trigger
                // the entrance reveal transition manually!
                if (targetPath === currentPath) {
                  setTimeout(() => {
                    runEntranceAnimation();
                  }, 120);
                }
              }, 450);
            }
          });

          // 1. Slide top and bottom shutters together to cover screen
          tl.to(topPanelRef.current, {
            y: "0%",
            duration: 0.5,
            ease: "power2.out"
          }, 0);

          tl.to(bottomPanelRef.current, {
            y: "0%",
            duration: 0.5,
            ease: "power2.out"
          }, 0);

          // 2. Fade in target face at the center
          tl.to(targetRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)"
          }, 0.1);

          // 3. Shoot arrow from left to target center
          tl.fromTo(arrowRef.current,
            { x: "-250px", opacity: 0 },
            {
              x: "0px",
              opacity: 1,
              duration: 0.35,
              ease: "power3.out"
            },
            0.25
          );

          // 4. Kinetic impact vibration (rapid target shake)
          tl.to([targetRef.current, arrowRef.current], {
            x: "+=5",
            duration: 0.05,
            yoyo: true,
            repeat: 5,
            ease: "sine.inOut"
          }, 0.6);
        }
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, [pathname, router]);

  // Shared helper function to split panels open and reset transitions
  function runEntranceAnimation() {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        // Instantly reset panels/target elements back off-screen
        gsap.set(topPanelRef.current, { y: "-100%" });
        gsap.set(bottomPanelRef.current, { y: "100%" });
        gsap.set(targetRef.current, { opacity: 0, scale: 0.5, x: 0 });
        gsap.set(arrowRef.current, { opacity: 0, x: "-250px" });
      }
    });

    // 1. Dissolve target and arrow
    tl.to([targetRef.current, arrowRef.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in"
    }, 0);

    // 2. Split top and bottom panels apart vertically
    tl.to(topPanelRef.current, {
      y: "-100%",
      duration: 0.5,
      ease: "power2.inOut"
    }, 0.15);

    tl.to(bottomPanelRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.inOut"
    }, 0.15);
  }

  const isInitialLoadRef = useRef(true);

  // Entrance transition triggered upon Next.js page change & initial website load
  useEffect(() => {
    let animationFrameId: number;
    let safetyTimer: NodeJS.Timeout;

    const triggerReveal = () => {
      clearTimeout(safetyTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("megamenu-ready", triggerReveal);
      }
      animationFrameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          runEntranceAnimation();
        });
      });
    };

    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;

      // On initial site load, check if mega menu data is already ready
      if (typeof window !== "undefined" && window.__MEGAMENU_READY) {
        triggerReveal();
      } else {
        // Keep shutters closed over the screen while mega menu data fetches
        gsap.set(topPanelRef.current, { y: "0%" });
        gsap.set(bottomPanelRef.current, { y: "0%" });
        gsap.set(targetRef.current, { opacity: 1, scale: 1, x: 0 });
        gsap.set(arrowRef.current, { opacity: 1, x: "0px" });

        // Listen for megamenu-ready event
        if (typeof window !== "undefined") {
          window.addEventListener("megamenu-ready", triggerReveal);
        }

        // Safety fallback timeout: if data isn't received within 4000ms, close preloader anyway
        safetyTimer = setTimeout(() => {
          triggerReveal();
        }, 4000);
      }
    } else {
      // Normal page navigation transition
      const timer = setTimeout(() => {
        animationFrameId = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            runEntranceAnimation();
          });
        });
      }, 160);

      return () => {
        clearTimeout(timer);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {
      clearTimeout(safetyTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("megamenu-ready", triggerReveal);
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return (
    <>
      {/* Primary Page Layout */}
      <div className={isTransitioning ? "pointer-events-none select-none" : ""}>
        {children}
      </div>

      {/* Top Shutter Panel */}
      <div
        ref={topPanelRef}
        style={{ transform: "translate3d(0, 0%, 0)" }}
        className="fixed top-0 left-0 w-full h-[50vh] bg-[#0e3b2e] z-[9999] pointer-events-none shadow-2xl border-b border-accent/10"
      />

      {/* Bottom Shutter Panel */}
      <div
        ref={bottomPanelRef}
        style={{ transform: "translate3d(0, 0%, 0)" }}
        className="fixed bottom-0 left-0 w-full h-[50vh] bg-[#0e3b2e] z-[9999] pointer-events-none shadow-2xl border-t border-accent/10"
      />

      {/* Central Target Face & Arrow */}
      <div
        ref={targetRef}
        style={{ opacity: 1, transform: "translate3d(-50%, -50%, 0) scale(1)" }}
        className="fixed top-1/2 left-1/2 z-[10000] pointer-events-none flex items-center justify-center"
      >
        {/* Archery Target Circular Face */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-accent/30 bg-[#0e3b2e] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
          
          {/* Target concentric outer rings */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-accent/20 flex items-center justify-center">
            <div className="absolute w-[60%] h-[60%] rounded-full border border-accent/25 flex items-center justify-center">
              <div className="absolute w-[40%] h-[40%] rounded-full border border-accent/30 flex items-center justify-center">
                {/* Gold Bullseye Center */}
                <div className="w-[40%] h-[40%] rounded-full bg-[#c5a880]/15 border border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Golden Arrow striking the target at a -35 degree angle */}
          <div
            style={{ transform: "rotate(-35deg)", transformOrigin: "right center" }}
            className="absolute right-[48.5%] top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <svg
              ref={arrowRef}
              viewBox="0 0 100 20"
              fill="none"
              style={{ opacity: 1 }}
              className="w-24 md:w-32 h-6 md:h-8 text-accent drop-shadow-[0_0_10px_rgba(197,168,128,0.55)]"
            >
              {/* Shaft */}
              <line x1="8" y1="10" x2="92" y2="10" stroke="#c5a880" strokeWidth="1.8" strokeLinecap="round" />
              
              {/* Arrowhead */}
              <polygon points="90,6 98,10 90,14" fill="#c5a880" />
              
              {/* Slanted Fletchings */}
              <polygon points="10,6 24,6 28,10 14,10" fill="#c5a880" />
              <polygon points="10,14 24,14 28,10 14,10" fill="#c5a880" />
            </svg>
          </div>

        </div>
      </div>
    </>
  );
};
