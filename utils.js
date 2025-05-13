
// function to get the token from the loval storage:
export function get_token_from_local_storage() {
    let token = localStorage.getItem('token')
    return token
}