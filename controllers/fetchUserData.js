import { get_JWT } from "../utils/token.js";
import { render_login_form } from "../components/login.js";
import { processUserData } from "./processUserData.js";
import { USER_PROFILE_QUERY } from "./queries.js";

export async function fetchUserData() {
  const token = get_JWT();
  if (!token) return render_login_form();

  try {
    const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: USER_PROFILE_QUERY }),
    });

    if (!res.ok) throw new Error("Fetch failed with status " + res.status);

    const data = await res.json();
    const user = data?.data?.user?.[0];
    const totalXp = data?.data?.totalXp?.aggregate?.sum?.amount || 0;

    if (!user) return render_login_form();

    processUserData(user, totalXp);
  } catch (err) {
    if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      alert("Server unreachable. Try again later.");
    } else {
      localStorage.clear();
      render_login_form();
    }
  }
}
