import { app_state } from "./app_state.js";
import { navigateTo } from "./router.js";

// Set up login form handler
export function handle_login() {
    if (app_state.is_logged) {
        navigateTo("/")
    }
    const login_form = document.getElementById("login_form");
    if (!login_form) return; // Safety check

    login_form.addEventListener("submit", (e) => {
        e.preventDefault();
        login_user();
    });
}


function login_user() {
    console.log("Login submitted...");

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
            if (!response.ok) {
                throw new Error("Invalid credentials");
            }
            return response.text(); // Only if server returns plain token
        })
        .then(token => {
            console.log("Received token:", token);

            if (!isValidJWT(token)) {
                throw new Error("Received token is not a valid JWT");
            }

            app_state.access_token = token;
            app_state.is_logged = true;

            localStorage.setItem("is_logged", "true");
            localStorage.setItem("access_token", token);

            navigateTo("/"); // Your routing logic
        })
        .catch(err => {
            console.error("Login error:", err);
            alert("Login failed: " + err.message);
        });
}

function isValidJWT(token) {
    return token && token.split(".").length === 3;
}

export function logout_user() {
    app_state.access_token = null;
    app_state.is_logged = false;
    localStorage.clear();
    navigateTo("/login");
}
