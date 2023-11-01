function validate_form() {

    console.log("=== [START] validate_form() ===")

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    let api_endpoint_url = "../../backend/process_login.php?username=" + username + "&password=" + password

    axios.get(api_endpoint_url)
        .then(response => {
            console.log(response)
            window.location.href = "../view/homepage.html"
            sessionStorage.setItem("username", username);
            exit()
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


    let api_endpoint_url = "http://localhost/proj/backend/process_signup.php?username=" + username + "&password=" + password + "&c_password=" + c_password

    axios.get(api_endpoint_url)
        .then((response) => {
            console.log('Signup successful:', response.data);
            window.location.href = "../view/loginpage.html";

        }).catch((error) => {
            // ERROR
            // Something went wrong
            console.log(error);
        })


    console.log("=== [END] add_user() ===")

}
