import { app_state } from "./app_state.js"
import { navigateTo } from "./router.js"


document.addEventListener("DOMContentLoaded", () => {
    if (app_state.is_logged) {
        navigateTo("/")        // Logged in → Home page
    } else {
        navigateTo("/login")   // Not logged in → Login page
    }
});

