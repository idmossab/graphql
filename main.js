import { is_logged_in } from "./utils/state.js";
import { navigateTo } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  if (is_logged_in()) {
    navigateTo("/"); // JWT valid → Home page
  } else {
    navigateTo("/login"); // No or expired JWT → Login page
  }
});

//python3 -m http.server 8000
