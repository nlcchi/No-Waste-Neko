<?php
require_once "common.php";

    $errors = [];

    // Get the data from form processing
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $c_password = $_POST['c_password'];
    
    // Check if username is already taken
    $dao = new UserDAO();

    if($dao->get($username)) {
        $errors[] = "Username is already taken.";
        $_SESSION['errors'] = $errors;
        header("Location: signuppage.php?email={$email}&username={$username}");
        exit();
    }

    // If one or more fields have validation error
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors[] = "Invalid email format";
    }

    if($password != $c_password) {
        $errors[] = "Passwords do not match";
    }

    $_SESSION['errors'] = $errors;

    // if everything is checked. Create user Object and write to database
    if($errors==[]) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($username, $email, $passwordHash);
        $status = $dao->create($user);
        var_dump($passwordHash);
    } else {
        header("Location: signuppage.php?email={$email}&username={$username}");
    }

if ($status) {
    // success; redirect page
    $_SESSION["login_page"] = $username;
    header("Location: loginpage.php?username={$username}");
    exit();
}
    
?>

