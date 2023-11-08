<?php
require_once "common.php";
header('Content-Type: application/json');

$errors = [];
$response = array();

// Get the data from form processing
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData); // Decode JSON string into PHP object

// Check if the JSON is parsed correctly
if ($data === null) {
    http_response_code(400); // Bad Request
    $errors[] = "Invalid JSON data.";
    echo json_encode(["errors" => $errors]);
    exit();
}

$username = $data->username ?? null;
$password = $data->password ?? null;
$c_password = $data->c_password ?? null;

// Additional validation for username, password, and c_password could be performed here

// Check if username is already taken
$dao = new UserDAO();

if ($dao->get($username)) {
    http_response_code(409);
    $errors[] = "Username is already taken.";
} elseif ($password !== $c_password) {
    http_response_code(409);
    $errors[] = "Passwords do not match.";
}

// If there are no errors, proceed with user creation
if (empty($errors)) {
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $user = new User($username, $passwordHash);
    $status = $dao->create($user);

    if ($status) {
        http_response_code(200);
        $response = [
            "message" => "Signup successful"
        ];
    }
} else {
    $response["errors"] = $errors;
}

echo json_encode($response);
?>