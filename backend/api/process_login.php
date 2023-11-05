<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Expose-Headers: Content-Length, X-JSON");
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json; charset=UTF-8");

    require_once 'common.php';

    $username = $_GET['username'];
    $password = $_GET['password'];
    
    // Create the DAO object to facilitate connection to the database.
    $dao = new UserDAO();
    
    // Check if the username exists
    if($dao->get($username))
    {
        // If username exists
        http_response_code(200);
        // get the hashed password from the database
        // Match the hashed password with the one which user entered
        // if it does not match. -> error
        $user = $dao->get($username);
        $password_hash = $user->getPasswordHash();

        if(password_verify($password, $password_hash)) {
            $response = [
                "message" => "Login successful"
            ];

        } else {
            http_response_code(409);

            $response = ["error" => "Incorrect password"];
        }
    
    } else {
        http_response_code(404);

        $response = ["error" => "Username does not exist in the database."];
    }

    echo json_encode($response);
  
?>
