export function get_JWT() {
    return localStorage.getItem("access_token");
}

export function save_JWT(token) {
    localStorage.setItem("access_token", token);
}

export function clear_JWT() {
    localStorage.removeItem("access_token");
}