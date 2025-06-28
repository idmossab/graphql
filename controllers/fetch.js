import { app_state } from "./app_state.js";
import { render_fail_pass } from "./fail_pass.js";
import { render_user_profile } from "./profile.js";
import { get_JWT } from "./token.js";
import { handle_transaction } from "./transactions.js";



export function fetch_data() {
    let token = get_JWT()
    if (token == null) {
        alert("error retreiving JWT: " + error.message);
        return
    }
    const query = `     
query {
user{
  login
  firstName
  lastName
  email
  campus
  auditRatio
  totalUp
  totalDown
}
}`

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Unauthorized or request failed");
            }
            return response.json();
        })
        .then(data => {
            let user_data = data.data.user[0]
            console.log("the whole data is: ",user_data);
            if (user_data) {
                handle_received_data(user_data)
            } else {
                handle_error()
            }

        })
}

function handle_received_data(user_data) {
    // handle user profile:
    let user = {
        firstName: user_data.firstName,
        lastName: user_data.lastName,
        login: user_data.login,
        email: user_data.email,
        campus: user_data.campus
    }
    render_user_profile(user)

    // handle user ratio:
    handle_user_ratio()
}