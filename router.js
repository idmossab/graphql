import { render_login_form } from "./components/login.js";
import { render_home_page } from "./views/home.js";
import { is_logged_in, is_token_valid } from "./utils/state.js";

const routes = {
  "/": render_home_page,
  "/login": render_login_form,
};

const protected_routes = ["/"];

export function navigateTo(url) {
  // Use hash-based routing instead of pushState
  window.location.hash = url;
}

export function router() {
  // Get path from hash instead of pathname
  let path = window.location.hash.slice(1) || "/";
  
  if (protected_routes.includes(path)) {
    if (!is_logged_in()) {
      console.log("Access denied: User not authenticated");
      navigateTo("/login");
      return;
    }
    
    if (!is_token_valid()) {
      console.log("Access denied: Invalid or expired token");
        alert("Session expired. Please login again.");

      navigateTo("/login");
      return;
    }
  }
  
  const route = routes[path];
  if (route) {
    route();
  }
}

// Listen for hash changes instead of popstate
window.addEventListener('hashchange', router);

// Initial route on page load
document.addEventListener('DOMContentLoaded', router);