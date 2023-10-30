<?php
require_once "common.php";

    $errors = [];

    // Get the data from form processing
    $username = $_POST['username'];
    $password = $_POST['password'];
    $c_password = $_POST['c_password'];
    
    // Check if username is already taken
    $dao = new UserDAO();

    if($dao->get($username)) {
        $errors[] = "Username is already taken.";
        $_SESSION['errors'] = $errors;
        header("Location: signuppage.php?&username={$username}");
        exit();
    }

    if($password != $c_password) {
        $errors[] = "Passwords do not match";
    }

    $_SESSION['errors'] = $errors;

    // if everything is checked. Create user Object and write to database
    if($errors==[]) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($username, $passwordHash);
        $status = $dao->create($user);
        var_dump($passwordHash);
    } else {
        header("Location: ../client/view/signuppage.php?&username={$username}");
    }

if ($status) {
    // success; redirect page
    $_SESSION["login_page"] = $username;
    header("Location: ../client/view/loginpage.php?username={$username}");
    exit();
}
    
?>

