import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import viCommon from "../locales/vi/common.json";
import viNavbar from "../locales/vi/navbar.json";
import viHome from "../locales/vi/home.json";
import viFooter from "../locales/vi/footer.json";
import viAuth from "../locales/vi/auth.json";
import viContact from "../locales/vi/contact.json";
import viOrder from "../locales/vi/order.json";
import enCommon from "../locales/en/common.json";
import enNavbar from "../locales/en/navbar.json";
import enHome from "../locales/en/home.json";
import enFooter from "../locales/en/footer.json";
import enAuth from "../locales/en/auth.json";
import enContact from "../locales/en/contact.json";
import enOrder from "../locales/en/order.json";

export const defaultLocale = "vi";
export const supportedLocales = ["vi", "en"];
export const defaultNamespaces = [
  "common",
  "navbar",
  "home",
  "footer",
  "auth",
  "contact",
  "order",
];

const resources = {
  vi: {
    common: viCommon,
    navbar: viNavbar,
    home: viHome,
    footer: viFooter,
    auth: viAuth,
    contact: viContact,
    order: viOrder,
  },
  en: {
    common: enCommon,
    navbar: enNavbar,
    home: enHome,
    footer: enFooter,
    auth: enAuth,
    contact: enContact,
    order: enOrder,
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