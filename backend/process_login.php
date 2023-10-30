<?php
    require_once 'common.php';

    $errors = [];

    // Get the data login.php
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Create the DAO object to facilitate connection to the database.
    $dao = new UserDAO();
    
    // Check if the username exists
    if($dao->get($username))
    {
        // If username exists
        // get the hashed password from the database
        // Match the hashed password with the one which user entered
        // if it does not match. -> error
        $user = $dao->get($username);
        $password_hash = $user->getPasswordHash();
        // check if the plain text password is valid
        if(password_verify($password, $password_hash))
        { 

            $_SESSION['username'] = $username;
            header("Location: ../client/view/homepage.html?username={$username}");
            exit();
        }
        else
        {
            // password not valid
            // return to login page and show error
            $errors[] = "Invalid password.";
        }

    } else {
    $errors[] = "Username does not exist in the database";
    }

    $_SESSION['errors'] = $errors;
    header("Location: ../client/view/loginpage.php?username={$username}");
?>