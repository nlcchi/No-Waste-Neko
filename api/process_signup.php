<?php
require_once "common.php";

    $errors = [];

    // Get the data from form processing
    $username = $_GET['username'];
    $password = $_GET['password'];
    $c_password = $_GET['c_password'];
    
    // Check if username is already taken
    $dao = new UserDAO();

    if($dao->get($username)) {
        $errors[] = "Username is already taken.";
    }

    if($password != $c_password) {
        $errors[] = "Passwords do not match";
    }

    // if everything is checked. Create user Object and write to database
    if($errors==[]) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($username, $passwordHash);
        $status = $dao->create($user);

        if ($status) {
            // success; redirect page
            $_SESSION["login_page"] = $username;
            header("Location: /html/loginpage.html");
            exit();
        }
    }

    $response = array();
    $response["errors"] = $errors;
    echo json_encode($response);
    
?>

