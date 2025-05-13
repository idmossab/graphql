//  Set an example of future uses to the token to make aythenticated requests:
function func_example() {
    let token = localStorage.getItem("token")
    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    .then(response =>{
        if(!response.ok) {
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