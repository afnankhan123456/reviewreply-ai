"use client";

import { translations, type Language, type TranslationKeys } from "./translations";

export function useTranslation(language: Language) {
  const dict = translations[language] || translations.en;

  function t(key: keyof TranslationKeys): string {
    return dict[key] ?? translations.en[key];
  }

  return { t };
}
