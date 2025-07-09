import { navigateTo } from "../router.js";
import { set_app_state, is_logged_in } from "../utils/state.js";
import { isValidJWT } from "../utils/token.js";

export function handle_login() {
  if (is_logged_in()) {
    navigateTo("/");
    return;
  }

  const login_form = document.getElementById("login_form");
  if (!login_form) return;

  login_form.addEventListener("submit", (e) => {
    e.preventDefault();
    login_user();
  });
}

export function login_user() {
  const identifier = document.getElementById("identifier").value.trim();
  const password = document.getElementById("password").value;

  // Clear any existing error
  clearError();

  if (!identifier || !password) {
    showError("Please enter both identifier and password");
    return;
  }

  const credentials = btoa(`${identifier}:${password}`);

  fetch("https://learn.zone01oujda.ma/api/auth/signin", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      return response.json();
    })
    .then((data) => {
      const token = typeof data === "string" ? data : data.token || data.access_token;

      if (!isValidJWT(token)) throw new Error("Invalid JWT response");

      set_app_state(token);
      navigateTo("/");
    })
    .catch((err) => {
      console.error("Login failed:", err);
      showError(err.message);
    });
}

function showError(message) {
  clearError();

  const error = document.createElement('div');
  error.className = 'error-msg';
  error.textContent = message;

  const form = document.getElementById('login_form');
  form.insertBefore(error, form.firstChild);

  setTimeout(clearError, 4000);
}

function clearError() {
  const error = document.querySelector('.error-msg');
  if (error) error.remove();
}

export function logout_user() {
  localStorage.clear();
  navigateTo("/login");
}
