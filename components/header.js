import { logout_user } from "../controllers/auth.js";

export function render_header(parentId = "main_container") {
    console.log("Rendering header...");
    const container = document.getElementById(parentId);
    if (!container) {
        console.error(`❌ Parent element "${parentId}" not found`);
        return;
    }

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
