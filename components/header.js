import { logout_user } from "../controllers/auth.js";

export function render_header(parentId = "main_container") {
    const container = document.getElementById(parentId);

    const header = document.createElement("header");
    header.className = "app-header";

    // Title
    const title = document.createElement("h1");
    title.textContent = "GraphQL";

    // Logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.className = "logout-button";
    logoutBtn.addEventListener("click", logout_user);

    header.append(title, logoutBtn);
    container.prepend(header); // Add at the top
}
