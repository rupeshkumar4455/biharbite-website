// 🔥 Environment-aware API base

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocalhost
  ? "https://biharbite-backend.onrender.com"
  : "";
