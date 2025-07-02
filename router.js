import { render_login_form } from "./components/login.js";
import { render_home_page } from "./views/home.js";



const routes = {
    "/": render_home_page,
    "/login": render_login_form,
};

export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

export function router() {
    const path = window.location.pathname;
    const route = routes[path];
    if (route) {
        route();
    } else {
        const status = 404;
        const message = getErrorMessage(status);
        render_error_page(status, message);    }
}

// Handle browser back/forward buttons
window.addEventListener("popstate", router);