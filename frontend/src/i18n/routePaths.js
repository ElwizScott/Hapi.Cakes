export const routeKeys = {
  home: "home",
  galleryElegant: "galleryElegant",
  gallerySocial: "gallerySocial",
  feedback: "feedback",
  order: "order",
  contact: "contact",
  cakeDetail: "cakeDetail",
  adminLogin: "adminLogin",
  adminDashboard: "adminDashboard",
  adminCategories: "adminCategories",
  adminCakes: "adminCakes",
  adminSettings: "adminSettings",
};

export const localizedRoutePaths = {
  vi: {
    [routeKeys.home]: "/",
    [routeKeys.galleryElegant]: "/gallery",
    [routeKeys.gallerySocial]: "/gallery-social",
    [routeKeys.feedback]: "/feedback",
    [routeKeys.order]: "/order",
    [routeKeys.contact]: "/contact",
    [routeKeys.cakeDetail]: "/cakes/:cakeId",
    [routeKeys.adminLogin]: "/admin/login",
    [routeKeys.adminDashboard]: "/admin/dashboard",
    [routeKeys.adminCategories]: "/admin/categories",
    [routeKeys.adminCakes]: "/admin/cakes",
    [routeKeys.adminSettings]: "/admin/settings",
  },
  en: {
    [routeKeys.home]: "/",
    [routeKeys.galleryElegant]: "/gallery",
    [routeKeys.gallerySocial]: "/gallery-social",
    [routeKeys.feedback]: "/feedback",
    [routeKeys.order]: "/order",
    [routeKeys.contact]: "/contact",
    [routeKeys.cakeDetail]: "/cakes/:cakeId",
    [routeKeys.adminLogin]: "/admin/login",
    [routeKeys.adminDashboard]: "/admin/dashboard",
    [routeKeys.adminCategories]: "/admin/categories",
    [routeKeys.adminCakes]: "/admin/cakes",
    [routeKeys.adminSettings]: "/admin/settings",
  },
};

export function getLocalizedRoutePath(routeKey, locale = "vi") {
  return localizedRoutePaths[locale]?.[routeKey] ?? localizedRoutePaths.vi[routeKey];
}