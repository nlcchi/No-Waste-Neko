function validate_form() {

    console.log("=== [START] validate_form() ===")

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    let api_endpoint_url = "http://localhost/proj/php/process_login.php"

    axios.post(api_endpoint_url, {
        username, password
    })
        .then(response => {
            console.log(response.message)

        })

        .catch(error => {
            // ERROR
            // Something went wrong
            console.log(error.message)
        })

    console.log("=== [END] validate_form() ===")

}

function add_user() {
    console.log("=== [START] add_user() ===")

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const c_password = document.getElementById("c_password").value

    let api_endpoint_url = "http://localhost/proj/php/process_signup.php"

    axios.post(api_endpoint_url, {
        username, password, c_password
    })
        .then(response => {
            console.log(response.message)

        })

        .catch(error => {
            // ERROR
            // Something went wrong
            console.log(error.message)
        })


    console.log("=== [END] add_user() ===")

}