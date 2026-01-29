const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const ADMIN_LOGIN_PATH = "/admin/login";

const redirectToAdminLogin = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== ADMIN_LOGIN_PATH) {
    window.location.assign(ADMIN_LOGIN_PATH);
  }
};

export const handleUnauthorized = async () => {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (_) {
    // Ignore logout failures; redirect anyway.
  }

  redirectToAdminLogin();
};

export const fetchAdmin = async (path, init = {}, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
  });

  if (response.status === 401 && !options.skipAuthRedirect) {
    await handleUnauthorized();
  }

  return response;
};

export const fetchPublic = async (path, init = {}) =>
  fetch(`${API_BASE_URL}${path}`, init);

export { API_BASE_URL };
