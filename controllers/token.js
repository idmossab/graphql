import { navigateTo } from "./router.js";

export function get_JWT() {
    let token = localStorage.getItem("access_token");


    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    if (!token || token.split('.').length !== 3) {
        console.error("Invalid or missing JWT:", token);
        navigateTo("/login")
        return;
    }
    return token
}