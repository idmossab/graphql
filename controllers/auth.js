import { render_login_form } from "../components/login.js";
import { render_home_page } from "../views/home.js";
import { set_app_state, isValidJWT } from "../utils/token.js";

export function handle_login() {
  const login_form = document.getElementById("login_form");
  if (!login_form) return;

  login_form.onsubmit = async (e) => {
    e.preventDefault();
    await login_user();
  };
}

export async function login_user() {
  try {
    clearError();
    const identifier = document.getElementById("identifier")?.value.trim();
    const password = document.getElementById("password")?.value;

    if (!identifier || !password) {
      showError("Please enter both identifier and password");
      return;
    }

    const credentials = btoa(`${identifier}:${password}`);

    const response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
    });

    if (!response.ok) throw new Error("Invalid email or password");
    const data = await response.json();
    const token = typeof data === "string" ? data : data.token || data.access_token;
    if (!isValidJWT(token)) throw new Error("Invalid JWT response");

    set_app_state(token);
    render_home_page();
  } catch (err) {
    showError(err.message);
  }
}

function showError(message) {
  clearError();
  const error = document.createElement("div");
  error.className = "error-msg";
  error.textContent = message;
  const form = document.getElementById("login_form");
  form.insertBefore(error, form.firstChild);
  setTimeout(clearError, 4000);
}

function clearError() {
  const error = document.querySelector(".error-msg");
  if (error) error.remove();
}

export function logout_user() {
  localStorage.clear();
  render_login_form();
}
