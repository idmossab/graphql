
import { get_JWT } from "./token.js";
import { render_user_profile } from "../views/profile.js";
import { handle_user_ratio, handle_given_taken_xps } from "../views/ratio.js";
import { handle_user_level } from "../views/level.js";
import { navigateTo } from "./router.js";


export function fetch_data() {
    let token = get_JWT();
    if (token == null) {
        alert("Error retrieving JWT");
        return;
    }

    const query = `     
    query {
      user {
        login
        firstName
        lastName
        email
        campus
        auditRatio
        totalUp
        totalDown
        transactions(
          where: {
            _and: [
              { type: { _eq: "level" } },
              { eventId: { _eq: 41 } }
            ]
          }
          order_by:{amount: desc}
          limit: 1
        ) {
          amount
        }
            progresses(where:{object:{type:{_eq: "project"}}}){
        object{
      name
      type
    }
    isDone
    createdAt
  }
        xps(where:{originEventId:{_eq: 41}}){
      path
      amount
    }
      }
        
    }`;

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
        let user_data = data.data.user[0];
        console.log("the whole data is: ", user_data);
        if (user_data) {
            handle_received_data(user_data);
        } else {
            handle_error();
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Failed to fetch data: " + error.message);
        handle_error(); // Optional: you can call this to trigger any fallback logic
    });
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
    let ratio = {
        auditRatio: user_data.auditRatio,
        totalUp: user_data.totalUp,
        totalDown: user_data.totalDown
    }
    handle_user_ratio(ratio)
    handle_given_taken_xps(ratio)
    handle_user_level(user_data.transactions[0].amount)
}

function handle_error(error) {
    console.error("Error occurred:", error);
    localStorage.clear();
    if (typeof navigateTo === 'function') {
        navigateTo('/');
    } else {
        window.location.href = '/';
    }
}
