"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getAppearanceSettings, saveAppearanceSettings } from "./settings/actions";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { Language, TranslationKeys } from "@/lib/i18n/translations";

type ThemeMode = "light" | "dark";
type FontSize = "sm" | "md" | "lg";
type FontWeight = "normal" | "bold";

type ThemeContextType = {
  themeMode: ThemeMode;
  accentColor: string;
  fontSize: FontSize;
  fontWeight: FontWeight;
  language: Language;
  loaded: boolean;
  setThemeMode: (v: ThemeMode) => void;
  setAccentColor: (v: string) => void;
  setFontSize: (v: FontSize) => void;
  setFontWeight: (v: FontWeight) => void;
  setLanguage: (v: Language) => void;
  t: (key: keyof TranslationKeys) => string;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useDashboardTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useDashboardTheme must be used inside ThemeProvider");
  return ctx;
}

const FONT_SIZE_SCALE: Record<FontSize, string> = {
  sm: "0.9",
  md: "1",
  lg: "1.15",
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("dark");
  const [accentColor, setAccentColorState] = useState("#ae47ff");
  const [fontSize, setFontSizeState] = useState<FontSize>("md");
  const [fontWeight, setFontWeightState] = useState<FontWeight>("normal");
  const [language, setLanguageState] = useState<Language>("en");
  const [loaded, setLoaded] = useState(false);

  // Pehli baar DB se saved settings load karo
  useEffect(() => {
    (async () => {
      const result = await getAppearanceSettings();
      if (result?.success) {
        setThemeModeState((result.themeMode as ThemeMode) || "dark");
        setAccentColorState(result.accentColor || "#ae47ff");
        setFontSizeState((result.fontSize as FontSize) || "md");
        setFontWeightState((result.fontWeight as FontWeight) || "normal");
        setLanguageState((result.language as Language) || "en");
      }
      setLoaded(true);
    })();
  }, []);

  // Har change ko document root pe CSS variables ke through apply karo (pura dashboard affect hoga)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accentColor);
    root.style.setProperty("--font-scale", FONT_SIZE_SCALE[fontSize]);
    root.style.setProperty("--font-weight-base", fontWeight === "bold" ? "700" : "400");
    if (themeMode === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
  }, [themeMode, accentColor, fontSize, fontWeight]);

  const persist = (partial: Partial<{
    themeMode: ThemeMode;
    accentColor: string;
    fontSize: FontSize;
    fontWeight: FontWeight;
    language: Language;
  }>) => {
    saveAppearanceSettings({ themeMode, accentColor, fontSize, fontWeight, language, ...partial });
  };

  const setThemeMode = (v: ThemeMode) => { setThemeModeState(v); persist({ themeMode: v }); };
  const setAccentColor = (v: string) => { setAccentColorState(v); persist({ accentColor: v }); };
  const setFontSize = (v: FontSize) => { setFontSizeState(v); persist({ fontSize: v }); };
  const setFontWeight = (v: FontWeight) => { setFontWeightState(v); persist({ fontWeight: v }); };
  const setLanguage = (v: Language) => { setLanguageState(v); persist({ language: v }); };

  const { t } = useTranslation(language);

  return (
    <ThemeContext.Provider
      value={{
        themeMode, accentColor, fontSize, fontWeight, language, loaded,
        setThemeMode, setAccentColor, setFontSize, setFontWeight, setLanguage, t,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
