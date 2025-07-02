export const app_state = {
    is_logged: localStorage.getItem("is_logged") === "true",
    access_token: localStorage.getItem("access_token") || null
};

export function set_app_state(token) {
    app_state.is_logged = true;
    app_state.access_token = token;
    localStorage.setItem("is_logged", "true");
    localStorage.setItem("access_token", token);
}

export function clear_app_state() {
    app_state.is_logged = false;
    app_state.access_token = null;
    localStorage.removeItem("is_logged");
    localStorage.removeItem("access_token");
}
