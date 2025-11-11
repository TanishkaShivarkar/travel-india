export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export function authFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = options.headers || {};
  if(token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(`${API_BASE}${path}`, { ...options, headers });
}
