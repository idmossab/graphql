import { app_state } from "../controllers/app_state.js";
import { fetch_user_info, fetch_xp_pe_project } from "../controllers/requests.js";
import { navigateTo } from "../controllers/router.js";

export async function render_home_page() {
    if(!app_state.is_logged){
        navigateTo("/login")
    }
    console.log("the tocken is: ", app_state.access_token);
    console.log("the tocken is: ", app_state.is_logged);

    let container = document.getElementById("main_container")
    container.innerHTML = ""
    container.innerHTML = `
        <button id="get_token">get token</button>
        <p id="display_token"></p>
    `

    setTimeout(() => {
        const get_token = document.getElementById("get_token");
        console.log(get_token);

        if (get_token) {
            get_token.addEventListener("click", () => {
                document.getElementById("display_token").textContent = app_state.access_token;
            });
        }
    }, 200)

    fetch_user_info()
    await fetch_xp_pe_project()
}