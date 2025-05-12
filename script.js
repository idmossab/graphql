// import { login_user } from "./login"

document.addEventListener("DOMContentLoaded", ()=>{
    let login_form = document.getElementById("login_form")
    login_form.addEventListener("submit", async (e)=>{
        e.preventDefault()
        await login_user()
    })
})

async function login_user(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let credentials = btoa(`${email}:${password}`)
    console.log(credentials);
    fetch("https://learn.zone01oujda.ma/api/auth/signin",{
        method:'POST',
        headers:{
             'Authorization': `Basic ${credentials}`
        }
    })
    .then(response => response.json())
    .then(data => console.log("token: ", data))
    .catch(err => console.error('Error:', err));
}