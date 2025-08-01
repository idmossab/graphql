import { render_login_form } from "../components/login.js";

//check JWT validity
export function isValidJWT(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    if (!header.alg || !header.typ) return false;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function get_JWT() {
  let token = localStorage.getItem("access_token");
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  if (!isValidJWT(token)) {
    clear_app_state();
    render_login_form();
    return null;
  }
  return token;
}

export function clear_app_state() {
  localStorage.removeItem("access_token");
}

//check if user is logged in
export function is_logged_in() {
  const token = localStorage.getItem("access_token");
  return token && isValidJWT(token);
}

export function set_app_state(token) {
  localStorage.setItem("access_token", token);
}

// Handle token changes in localStorage
window.addEventListener("storage", (event) => {
  if (event.key === "access_token") {
    const newToken = event.newValue;
    if (!newToken || !isValidJWT(newToken)) {
      clear_app_state();
      render_login_form();
    }
  }
});
