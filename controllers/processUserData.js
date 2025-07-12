import { render_user_profile } from "../views/profile.js";
import { handle_user_ratio, handle_given_taken_xps } from "../views/ratio.js";
import { handle_user_level } from "../views/level.js";
import { handle_failed_passed_projects } from "../views/fail_pass.js";

export function processUserData(user,totalXp) {
  render_user_profile({
    firstName: user.firstName,
    lastName: user.lastName,
    login: user.login,
    email: user.email,
    campus: user.campus,
  });

  const ratio = {
    auditRatio: user.auditRatio,
    totalUp: user.totalUp,
    totalDown: user.totalDown,
  };
  const hasRatioData =
    user.auditRatio !== null &&
    user.totalUp !== null &&
    user.totalDown !== null;
  if (hasRatioData) {
    handle_user_ratio(ratio);
    handle_given_taken_xps(ratio);
  } else {
    const ratio_container = document.getElementById("svg_ratio");
    if (ratio_container) {
      ratio_container.innerHTML = `
        <div class="no-data-message">
          <p>No audit ratio data available</p>
          <small>Complete some audits to see your ratio</small>
        </div>
      `;
    }
    const given_taken = document.getElementById("given_taken");
    if (given_taken) {
      given_taken.innerHTML = "";
    }
  }

  if (user.transactions?.length > 0) {
    const level = user.transactions[0].amount;
    handle_user_level(level, totalXp);
  } else {
    const user_level = document.getElementById("user_level");
    user_level.innerHTML = `
       <div class="no-data-message">
         <p>No level data available</p>
         <small>Complete some projects to see your current level</small>
       </div>
     `;
  }

  if (user.xps?.length > 0) {
    handle_failed_passed_projects(user);
  } else {
    const container = document.getElementById("failed_passed_container");
    container.innerHTML = `
      <div class="no-data-message">
        <p>No project data available</p>
        <small>Complete some projects to see your progress chart</small>
      </div>
    `;
  }
}
