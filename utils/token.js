import { clear_app_state } from "./state.js";
import { render_login_form } from "../components/login.js"; // بدل navigateTo

export function get_JWT() {
  let token = localStorage.getItem("access_token");

  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  const isValid = isValidJWT(token);

  if (!isValid) {
    console.warn("Invalid or missing JWT:", token);
    clear_app_state();
    setTimeout(() => render_login_form(), 0); // بدل navigateTo("/login")
    return null;
  }

  return token;
}

export function isValidJWT(token) {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    if (!header.alg || !header.typ) return false;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      console.warn("JWT expired at:", new Date(payload.exp * 1000).toLocaleString());
      return false;
    }

    return true;
  } catch (err) {
    console.warn("Invalid JWT parts:", err);
    return false;
  }
}

let lastToken = localStorage.getItem("access_token");

setInterval(() => {
  const currentToken = localStorage.getItem("access_token");
  
  if (currentToken !== lastToken) {
    lastToken = currentToken;

    if (window.location.pathname === "/" && (!currentToken || !isValidJWT(currentToken))) {
      console.log("Token changed or invalidated, redirecting to login");
      clear_app_state();
      render_login_form(); 
    }
  }
}, 1000);
