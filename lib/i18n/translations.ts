export type Language = "en" | "hi";

export type TranslationKeys = {
  settingsTitle: string;
  settingsSubtitle: string;
  backToDashboard: string;
  googlePlaceIdTitle: string;
  googlePlaceIdDesc: string;
  googlePlaceIdPlaceholder: string;
  saved: string;
  save: string;
  saving: string;
  appearanceTitle: string;
  appearanceDesc: string;
  mode: string;
  light: string;
  dark: string;
  accentColor: string;
  language: string;
  fontSize: string;
  fontWeight: string;
  normal: string;
  bold: string;
  small: string;
  medium: string;
  large: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    settingsTitle: "Settings",
    settingsSubtitle: "Manage your business settings",
    backToDashboard: "Back to Dashboard",
    googlePlaceIdTitle: "Google Place ID",
    googlePlaceIdDesc: "Save your Google Business Place ID to connect review syncing.",
    googlePlaceIdPlaceholder: "Enter your Google Place ID...",
    saved: "Saved",
    save: "Save",
    saving: "Saving...",
    appearanceTitle: "Appearance",
    appearanceDesc: "Customize how your dashboard looks.",
    mode: "Mode",
    light: "Light",
    dark: "Dark",
    accentColor: "Accent Color",
    language: "Language",
    fontSize: "Font Size",
    fontWeight: "Font Weight",
    normal: "Normal",
    bold: "Bold",
    small: "Small",
    medium: "Medium",
    large: "Large",
  },
  hi: {
    settingsTitle: "सेटिंग्स",
    settingsSubtitle: "अपनी बिज़नेस सेटिंग्स मैनेज करें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    googlePlaceIdTitle: "गूगल प्लेस आईडी",
    googlePlaceIdDesc: "रिव्यू सिंकिंग कनेक्ट करने के लिए अपनी गूगल बिज़नेस प्लेस आईडी सेव करें।",
    googlePlaceIdPlaceholder: "अपनी गूगल प्लेस आईडी डालें...",
    saved: "सेव हो गया",
    save: "सेव करें",
    saving: "सेव हो रहा है...",
    appearanceTitle: "अपीयरेंस",
    appearanceDesc: "अपने डैशबोर्ड का लुक कस्टमाइज़ करें।",
    mode: "मोड",
    light: "लाइट",
    dark: "डार्क",
    accentColor: "एक्सेंट कलर",
    language: "भाषा",
    fontSize: "फॉन्ट साइज़",
    fontWeight: "फॉन्ट वेट",
    normal: "नॉर्मल",
    bold: "बोल्ड",
    small: "छोटा",
    medium: "मीडियम",
    large: "बड़ा",
  },
};
