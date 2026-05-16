"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const supportedLanguages = ["en", "pt", "es"] as const;
type Lang = (typeof supportedLanguages)[number];

type LangContext = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LangContext>({
  lang: "en",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLang: () => {},
  t: (k: string) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("lang");
      if (q && supportedLanguages.includes(q as Lang)) {
        setLang(q as Lang);
        return;
      }
    } catch (e) {
      // ignore
    }

    const stored = typeof window !== "undefined" ? localStorage.getItem("syntax-lang") : null;
    if (stored && supportedLanguages.includes(stored as Lang)) {
      setLang(stored as Lang);
      return;
    }

    if (typeof navigator !== "undefined") {
      const nav = navigator.language || "";
      if (nav.startsWith("pt")) setLang("pt");
      else if (nav.startsWith("es")) setLang("es");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("syntax-lang", lang);
  }, [lang]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const mod = await import(`../../locales/${lang}.json`);
        if (!cancelled) setMessages(mod.default || mod);
      } catch (e) {
        setMessages({});
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const t = (key: string) => messages[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
