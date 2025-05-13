import { login_user } from "./login.js"

document.addEventListener("DOMContentLoaded", () => {
    let login_form = document.getElementById("login_form")
    login_form.addEventListener("submit", async (e) => {
        e.preventDefault()
        await login_user()
    })
    let get_token = document.getElementById("get_token")
    get_token.addEventListener("click", () => {
        document.getElementById("display_token").textContent = get_token_from_local_storage()
    })
})
