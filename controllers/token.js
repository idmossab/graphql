export function get_JWT() {
    let token = localStorage.getItem("access_token");


    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
        console.warn("Fixed token by stripping quotes:", token);
    }

    if (!token || token.split('.').length !== 3) {
        console.error("Invalid or missing JWT:", token);
        alert("Your session token is invalid. Please log in again.");
        return;
    }

    console.log("Token being used:", token);
    return token
}