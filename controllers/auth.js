import { navigateTo } from "../router.js";
import { set_app_state } from "../utils/state.js";
import { save_JWT } from "../utils/token.js";

// ⬅️ إعداد event handler
export function handle_login() {
    if (localStorage.getItem("is_logged") === "true") {
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

// ⬅️ تنفيذ عملية تسجيل الدخول
export function login_user() {
    const identifier = document.getElementById("identifier").value.trim();
    const password = document.getElementById("password").value;

    if (!identifier || !password) {
        alert("Please enter both identifier and password");
        return;
    }

    const credentials = btoa(`${identifier}:${password}`);

    fetch("https://learn.zone01oujda.ma/api/auth/signin", {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Invalid credentials");
            return response.text();
        })
        .then(token => {
            if (!isValidJWT(token)) throw new Error("Invalid JWT");

            save_JWT(token);
            set_app_state(token); // ⬅️ تحديث الحالة
            navigateTo("/");
        })
        .catch(err => {
            console.error("Login failed:", err);
            alert("Login failed: " + err.message);
        });
}

// ⬅️ تحقق من صلاحية JWT
function isValidJWT(token) {
    return token && token.split(".").length === 3;
}

// ⬅️ تسجيل الخروج
export function logout_user() {
    localStorage.clear();
    navigateTo("/login");
}
