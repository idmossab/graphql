import { render_user_profile } from "../views/profile.js";
import { handle_user_ratio, handle_given_taken_xps } from "../views/ratio.js";
import { handle_user_level } from "../views/level.js";
import { handle_failed_passed_projects } from "../views/fail_pass.js";

export function processUserData(user) {
    render_user_profile({
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        email: user.email,
        campus: user.campus
    });

    const ratio = {
        auditRatio: user.auditRatio,
        totalUp: user.totalUp,
        totalDown: user.totalDown
    };
    handle_user_ratio(ratio);
    handle_given_taken_xps(ratio);

    if (user.transactions?.length > 0) {
        handle_user_level(user.transactions[0].amount);
    }

    if (user.xps?.length > 0) {
        handle_failed_passed_projects(user.xps);
    }
}
