export const app_state = {
  access_token: localStorage.getItem("access_token") || null
};

export function set_app_state(token) {
  app_state.access_token = token;
  localStorage.setItem("access_token", token);
}

export function clear_app_state() {
  app_state.access_token = null;
  localStorage.removeItem("access_token");
}

export function is_logged_in() {
  const token = localStorage.getItem("access_token");
  return token && token.split(".").length === 3;
}
