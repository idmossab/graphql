import { app_state } from "./app_state.js";
import { render_user_profile } from "./profle.js";
import { get_JWT } from "./token.js";
import { handle_transaction } from "./transactions.js";

//  Set an example of future uses to the token to make aythenticated requests:
function func_example() {
    let token = app_state.access_token
    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

        .then(response => {
            if (!response.ok) {
                throw new Error("Unauthorized or request failed")
            }
            return response.json()
        })
        .then(data => {
            console.log(data);

        })
        .catch(error => {
            console.log("Error: ", error.message);

        })
}

export function fetch_user_info() {
    let token = get_JWT()
    if (token == null) {
        alert("error retreiving JWT: " + error.message);
        return
    }
    const query = `
        query {
            user {
                firstName
                lastName
                login
                email
                campus
            }
        }
    `;

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
            return data.data.user[0];
        })
        .then(data => {
            render_user_profile(data)
        }
        )
        .catch(error => {
            console.error("GraphQL error:", error.message);
            alert("Could not fetch user data: " + error.message);
        });
}

// fetch xp per project:
export async function fetch_xp_pe_project() {

    let token = get_JWT()
    if (token == null) {
        alert("error retreiving JWT: " + error.message);
        return
    }
    const query = `
       query{
          transaction(where: {type: {_eq: "xp"}}) {
            amount
            path
            createdAt
          }
        }
    `;

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
           handle_transaction(data.data.transaction)
        })
        .catch(error => {
            console.error("GraphQL error:", error.message);
            alert("Could not fetch user data: " + error.message);
        });
}
