import { handle_login } from "../views/authentification.js";

export function render_login_form() {
    let container = document.getElementById("main_container");
    container.innerHTML = `
        <form id="login_form">
            <input id="identifier" type="text" placeholder="Enter your email or user name..." required>
            <input id="password" type="password" placeholder="Enter your password" required>
            <input type="submit" value="Submit">
        </form>
    `;

    handle_login();
}
