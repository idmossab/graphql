import { is_logged_in } from "./utils/state.js";
import { navigateTo } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  // For hash routing, check if there's already a hash
  const currentHash = window.location.hash.slice(1);
  
  if (currentHash) {
    // If there's a hash, let the router handle it
    return;
  }
  
  // If no hash, redirect based on login status
  if (is_logged_in()) {
    navigateTo("/");
  } else {
    navigateTo("/login");
  }
});