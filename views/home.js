import { fetchUserData } from "../controllers/fetchUserData.js";
import { render_header } from "../components/header.js";
import { render_profile_sidebar } from "../components/profile.js";

export async function render_home_page() {
  let container = document.getElementById("main_container");
  container.innerHTML = "";

  container.innerHTML = `
    ${render_profile_sidebar()}
    <main class="main-content">
      <div class="profile_section_wrapper">
        <!-- Left side: Current level -->
        <div class="profile_details">
          <h4>Current level</h4>
          <div id="user_level"></div>
          <div id="user_description"></div>
        </div>

        <!-- Right side: Audit ratio -->
        <div class="profile_details">
          <h4>Audit ratio</h4>
          <div id="svg_ratio"></div>
          <div id="given_taken">
            <div id="definition"></div>
          </div>
        </div>
      </div>

      <div class="profile_details">
        <h4>Passed & failed progress</h4>
        <div id="failed_passed_container"></div>
      </div>
    </main>
  `;

  render_header();
  fetchUserData();
}
