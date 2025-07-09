import { render_login_form } from "./components/login.js";
import { render_home_page } from "./views/home.js";
import { render_error_page } from "./error.js";
import { is_logged_in, is_token_valid } from "./utils/state.js";

const routes = {
  "/": render_home_page,
  "/login": render_login_form,
};

const protected_routes = ["/"];

export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

export function router() {
  const path = window.location.pathname;
  
  if (protected_routes.includes(path)) {
    if (!is_logged_in()) {
      console.log("Access denied: User not authenticated");
      navigateTo("/login");
      return;
    }
    
    if (!is_token_valid()) {
      console.log("Access denied: Invalid or expired token");
      navigateTo("/login");
      return;
    }
  }
  
  if (path === "/login" && is_logged_in()) {
    navigateTo("/");
    return;
  }
  
  const route = routes[path];
  if (route) {
    route();
  } else {
    const status = 404;
    const message = "page not found";
    render_error_page(status, message);
  }
}

// Handle browser back/forward buttons
window.addEventListener("popstate", router);
