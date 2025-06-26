// app_state.js
export const app_state = {
    is_logged: localStorage.getItem("is_logged") === "true",
    access_token: localStorage.getItem("access_token") || null
};

export function reset_app_state() {
    app_state.is_logged = false;
    app_state.access_token = null;
    localStorage.removeItem("is_logged");
    localStorage.removeItem("access_token");
}
