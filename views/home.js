import { app_state } from "../utils/state.js";
import { fetchUserData } from "../controllers/fetchUserData.js";
import { navigateTo } from "../router.js";
import { render_header } from "../components/header.js";
import { render_profile_sidebar } from "../components/profile.js";

export async function render_home_page() {
    if (!app_state.is_logged) {
        navigateTo("/login")
    }

    console.log("the tocken is: ", app_state.access_token);
    console.log("the tocken is: ", app_state.is_logged);

    let container = document.getElementById("main_container")
    container.innerHTML = ""

    container.innerHTML = `
        ${render_profile_sidebar()}
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
        
        <div class="profile_details">
            <h4>Passed & failed progress</h4>
          
        </div>
    </main>
    `
    render_header(); 
    fetchUserData();
}