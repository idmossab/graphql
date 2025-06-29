import { app_state } from "../controllers/app_state.js";
import { fetch_data } from "../controllers/fetch.js";
import { navigateTo } from "../controllers/router.js";

export async function render_home_page() {
    if (!app_state.is_logged) {
        navigateTo("/login")
    }

    console.log("the tocken is: ", app_state.access_token);
    console.log("the tocken is: ", app_state.is_logged);

    let container = document.getElementById("main_container")
    container.innerHTML = ""

    container.innerHTML = `
        <main class="main-content">
         <div class="profile_details">
             <h4>Current level</h4>
            <div id="user_level">
         
            
            </div>
                 <div id="user_description">
         
            
            </div>
        </div>
        <div class="profile_details">
            <h4>Audit ratio</h4>
            <div id="svg_ratio">
         
            
            </div>
            <div id="given_taken">
            <div id="definition">
            
            </div>
            </div>
        </div>
        
        <div class="content-body">
            <h2>Main Content Area</h2>
            <p>This is where your main application content would go. The user profile is displayed in the sidebar on the left.</p>
            <p>The profile will automatically load when the page opens, and you can refresh it using the button in the sidebar.</p>
        </div>
    </main>
    `
    fetch_data()
}