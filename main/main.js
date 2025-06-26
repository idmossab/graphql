import { app_state } from "../controllers/app_state.js"
import { navigateTo, router } from "../controllers/router.js"


document.addEventListener("DOMContentLoaded", () => {
    if (app_state.is_logged) {
        navigateTo("/")        // Logged in → Home page
    } else {
        navigateTo("/login")   // Not logged in → Login page
    }
});

