"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Extend global Window interface for Google Translate
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    // Hide standard Google translation banners and top frame offsets
    const addStyles = () => {
      const css = `
        /* Hide Google Translate top bar frame and dynamic container */
        iframe.goog-te-banner-frame,
        .skiptranslate iframe,
        iframe.skiptranslate,
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
        }
        /* Hide Google translation balloon hover dialogs */
        .goog-te-balloon-frame {
          display: none !important;
        }
        /* Prevent Google from shifting page body down */
        body {
          top: 0 !important;
          position: static !important;
        }
        /* Hide native Translate container */
        #google_translate_element {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
        }
        /* Hide Google logos and attributions */
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget {
          font-size: 0 !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-banner {
          display: none !important;
        }
        #goog-gt-tt {
          display: none !important;
        }
        .goog-te-spinner-pos {
          display: none !important;
        }
      `;
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);
    };

    addStyles();

    // Define the global callback that Google's script executes
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "de,sk,cs,en,es,ru,fr,it,ja,pl,uk,hu,ro,bg,el,hy,ka,et,lv,lt,pt,mn,ko,zh-CN,th,vi,tl,am,dz,no,sv,fi,da,is",
            layout: 0, // InlineLayout.SIMPLE
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  // When pathname changes (client-side routing navigation), re-trigger
  // Google Translate on the newly loaded DOM elements if a translation is active.
  useEffect(() => {
    const handleRouteChange = () => {
      // Retrieve translation language from Google's standard cookie
      const cookies = document.cookie.split("; ");
      const transCookie = cookies.find((row) => row.startsWith("googtrans="));
      if (transCookie) {
        const parts = transCookie.split("=");
        if (parts.length > 1) {
          const val = parts[1]; // Format: "/en/lang"
          const lang = val.split("/").pop();
          if (lang && lang !== "en") {
            // Apply delay to allow Next.js App Router to render the new route DOM
            setTimeout(() => {
              const select = document.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
              if (select) {
                // Toggle back and forth to force re-evaluation of new DOM nodes
                select.value = "en";
                select.dispatchEvent(new Event("change"));
                setTimeout(() => {
                  select.value = lang;
                  select.dispatchEvent(new Event("change"));
                }, 50);
              }
            }, 300);
          }
        }
      }
    };

    handleRouteChange();
  }, [pathname]);

  return (
    <>
      {/* Target element required by Google Translate */}
      <div id="google_translate_element" className="hidden" />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
