import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import viCommon from "../locales/vi/common.json";
import viNavbar from "../locales/vi/navbar.json";
import viHome from "../locales/vi/home.json";
import enCommon from "../locales/en/common.json";
import enNavbar from "../locales/en/navbar.json";
import enHome from "../locales/en/home.json";

export const defaultLocale = "vi";
export const supportedLocales = ["vi", "en"];
export const defaultNamespaces = ["common", "navbar", "home"];

const resources = {
  vi: {
    common: viCommon,
    navbar: viNavbar,
    home: viHome,
  },
  en: {
    common: enCommon,
    navbar: enNavbar,
    home: enHome,
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: "en",
    defaultNS: "common",
    ns: defaultNamespaces,
    supportedLngs: supportedLocales,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    returnEmptyString: false,
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;