"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PROTECTED_TERMS, SUPPORTED_LANGUAGES } from "@/data/site";
import { readConsent, type ConsentPreferences } from "@/lib/consent";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          targetId: string,
        ) => unknown;
      };
    };
  }
}

const SCRIPT_ID = "google-translate-script";
const PENDING_LANGUAGE_KEY = "jf_pending_language";

function currentLanguage() {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("googtrans="));
  return cookie?.split("/").pop() || "en";
}

function setTranslationCookie(language: string) {
  const value = language === "en" ? "" : `/en/${language}`;
  const expires = language === "en" ? "; Max-Age=0" : "; Max-Age=31536000";
  document.cookie = `googtrans=${value}; path=/${expires}; SameSite=Lax`;
  if (window.location.hostname.includes(".")) {
    document.cookie = `googtrans=${value}; path=/; domain=.${window.location.hostname.replace(/^www\./, "")}${expires}; SameSite=Lax`;
  }
}

function containsProtectedName(text: string) {
  return PROTECTED_TERMS.some((term) => {
    if (term === "Jan") return /(^|[^\p{L}\p{N}_])Jan(?=$|[^\p{L}\p{N}_])/u.test(text);
    return text.includes(term);
  });
}

function markProtectedNames(root: ParentNode = document) {
  if (root instanceof HTMLElement) {
    if (root.matches("[data-protected-name], .notranslate")) {
      root.classList.add("notranslate");
      root.setAttribute("translate", "no");
    } else if (!root.closest(".notranslate") && root.childElementCount === 0) {
      const text = root.textContent?.replace(/\s+/g, " ").trim() || "";
      if (containsProtectedName(text)) {
        root.classList.add("notranslate");
        root.setAttribute("translate", "no");
      }
    }
  }

  root.querySelectorAll<HTMLElement>("[data-protected-name], .notranslate").forEach((element) => {
    element.classList.add("notranslate");
    element.setAttribute("translate", "no");
  });

  root.querySelectorAll<HTMLElement>("*:not(script):not(style):not(textarea):not(input):not(option)").forEach((element) => {
    if (element.childElementCount > 0 || element.closest(".notranslate")) return;
    const text = element.textContent?.replace(/\s+/g, " ").trim() || "";
    if (containsProtectedName(text)) {
      element.classList.add("notranslate");
      element.setAttribute("translate", "no");
    }
  });
}

export default function GoogleTranslate() {
  const pathname = usePathname();
  const [functionalAllowed, setFunctionalAllowed] = useState(false);

  const applyLanguage = useCallback((language: string) => {
    markProtectedNames();
    setTranslationCookie(language);
    const selector = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (selector) {
      selector.value = language;
      selector.dispatchEvent(new Event("change", { bubbles: true }));
      sessionStorage.removeItem(PENDING_LANGUAGE_KEY);
      document.documentElement.lang = language;
      window.dispatchEvent(new CustomEvent("jf:language-changed", { detail: { language } }));
      return true;
    }
    sessionStorage.setItem(PENDING_LANGUAGE_KEY, language);
    return false;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialize from external consent storage
    setFunctionalAllowed(readConsent()?.functional === true);
    const handleConsent = (event: Event) => {
      const consent = (event as CustomEvent<ConsentPreferences>).detail;
      setFunctionalAllowed(consent.functional);
    };
    window.addEventListener("jf:consent-changed", handleConsent);
    return () => window.removeEventListener("jf:consent-changed", handleConsent);
  }, []);

  useEffect(() => {
    const handleRequest = (event: Event) => {
      const language = (event as CustomEvent<{ language?: string }>).detail?.language;
      if (!language || !SUPPORTED_LANGUAGES.some((item) => item.code === language)) return;

      if (language === "en") {
        sessionStorage.removeItem(PENDING_LANGUAGE_KEY);
        setTranslationCookie("en");
        document.documentElement.lang = "en";
        const selector = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
        if (selector) {
          selector.value = "en";
          selector.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          window.location.reload();
        }
        window.dispatchEvent(new CustomEvent("jf:language-changed", { detail: { language: "en" } }));
        return;
      }

      if (!readConsent()?.functional) {
        sessionStorage.setItem(PENDING_LANGUAGE_KEY, language);
        window.dispatchEvent(new Event("jf:open-consent"));
        return;
      }

      applyLanguage(language);
    };

    window.addEventListener("jf:language-request", handleRequest);
    window.dispatchEvent(new CustomEvent("jf:language-changed", { detail: { language: currentLanguage() } }));
    return () => window.removeEventListener("jf:language-request", handleRequest);
  }, [applyLanguage]);

  useEffect(() => {
    markProtectedNames();
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) markProtectedNames(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (!functionalAllowed) return () => observer.disconnect();

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate || document.querySelector("select.goog-te-combo")) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: SUPPORTED_LANGUAGES.map((item) => item.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );

      window.setTimeout(() => {
        const pending = sessionStorage.getItem(PENDING_LANGUAGE_KEY) || currentLanguage();
        if (pending !== "en") applyLanguage(pending);
      }, 250);
    };

    if (window.google?.translate) {
      window.googleTranslateElementInit();
      return () => observer.disconnect();
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.referrerPolicy = "strict-origin-when-cross-origin";
      document.head.appendChild(script);
    }
    return () => observer.disconnect();
  }, [applyLanguage, functionalAllowed]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      markProtectedNames();
      const language = currentLanguage();
      if (functionalAllowed && language !== "en") applyLanguage(language);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [applyLanguage, functionalAllowed, pathname]);

  return <div id="google_translate_element" className="notranslate sr-only" translate="no" aria-hidden="true" />;
}
