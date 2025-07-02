import { get_JWT } from "../utils/token.js";
import { navigateTo } from "../router.js";
import { processUserData } from "./processUserData.js";

export function fetchUserData() {
        console.log("📦 fetchUserData running...");

    const token = get_JWT();
    if (!token) {
        alert("Missing JWT");
        return navigateTo("/login");
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
          order_by: { amount: desc }
          limit: 1
        ) {
          amount
        }
        xps(where: { originEventId: { _eq: 41 } }) {
          path
          amount
          event {
            createdAt
          }
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
    .then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
    })
    .then(data => {
        const user = data?.data?.user?.[0];
        if (!user) return navigateTo("/login");
        processUserData(user);
    })
    .catch(err => {
        console.error(err);
        localStorage.clear();
        navigateTo("/login");
    });
}
