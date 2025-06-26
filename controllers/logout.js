export function logout_user() {
    app_state.access_token = null;
    app_state.is_logged = false;
    localStorage.clear();
    navigateTo("/login");
}
