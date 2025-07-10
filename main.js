import { is_logged_in } from "./utils/state.js";
import { navigateTo } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  if (is_logged_in()) {
    navigateTo("/");
  } else {
    navigateTo("/login");
  }
});