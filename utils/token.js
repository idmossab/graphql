import { clear_app_state } from "./state.js";
import { navigateTo } from "../router.js";

export function get_JWT() {
    let token = localStorage.getItem("access_token");

    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    const isValid = token && token.split('.').length === 3;

    if (!isValid) {
        console.warn("Invalid or missing JWT:", token);
        clear_app_state();
        setTimeout(() => navigateTo("/login"), 0);
        return null;
    }

    return token;
}

export function save_JWT(token) {
    localStorage.setItem("access_token", token);
}

export function clear_JWT() {
    localStorage.removeItem("access_token");
}
