import { is_logged_in } from "./utils/state.js";
import { render_login_form } from "./components/login.js";
import { render_home_page } from "./views/home.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main_container");
  container.innerHTML = "";

  if (is_logged_in()) {
    render_home_page();
  } else {
    render_login_form();
  }
});
