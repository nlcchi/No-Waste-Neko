<?php
require_once "common.php";
header('Content-Type: application/json');

    $errors = [];
    $response = array();


    // Get the data from form processing
    $data = file_get_contents('php://input');
    $username = $data->username;
    $password = $data->password;
    
    // Check if username is already taken
    $dao = new UserDAO();

    if($dao->get($username)) {
        http_response_code(409);
        $errors[] = "Username is already taken.";
    } elseif($password != $c_password) {
        http_response_code(409);
        $errors[] = "Passwords do not match";
    }

    // if everything is checked. Create user Object and write to database
    if($errors==[]) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($username, $passwordHash);
        $status = $dao->create($user);

        if ($status) {
            http_response_code(200);

            $response = [
                "message" => "Signup successful"
            ];
        }
    }

    $response["errors"] = $errors;
    echo json_encode($response);
    
?>
