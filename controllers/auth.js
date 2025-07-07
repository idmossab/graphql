import { navigateTo } from "../router.js";
import { set_app_state } from "../utils/state.js";
import { is_logged_in } from "../utils/state.js";

export function handle_login() {
  // إذا المستخدم داير login فعلاً (JWT صالح)، دخلو للصفحة الرئيسية
  if (is_logged_in()) {
    navigateTo("/");
    return;
  }

  // جبد الفورم ديال تسجيل الدخول
  const login_form = document.getElementById("login_form");
  if (!login_form) return;

  // ملي يدير submit
  login_form.addEventListener("submit", (e) => {
    e.preventDefault();
    login_user();
  });
}

export function login_user() {
  const identifier = document.getElementById("identifier").value.trim();
  const password = document.getElementById("password").value;

  if (!identifier || !password) {
    alert("Please enter both identifier and password");
    return;
  }

  // تحويل البيانات ل base64 (حسب Basic Auth)
  const credentials = btoa(`${identifier}:${password}`);

  fetch("https://learn.zone01oujda.ma/api/auth/signin", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Invalid credentials");
      return response.text(); // JWT كيرجع كسلسلة
    })
    .then((token) => {
      if (!isValidJWT(token)) throw new Error("Invalid JWT");

      set_app_state(token); // تخزين JWT فـ localStorage و app_state
      navigateTo("/"); // انتقال للصفحة الرئيسية
    })
    .catch((err) => {
      console.error("Login failed:", err);
      alert("Login failed: " + err.message);
    });
}

function isValidJWT(token) {
  return token && token.split(".").length === 3;
}

export function logout_user() {
  localStorage.clear(); 
  navigateTo("/login");     
}
