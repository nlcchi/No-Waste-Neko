<?php
    require_once '../../backend/common.php';

    // WRITE YOUR CODES HERE
    if(isset($_GET['username'])) {
        $username = $_GET['username'];
    // } elseif(isset($_SESSION['login_page'])) {
    //     $username = $_SESSION['login_page'];
    } else {
        $username = '';
    }
?>

<html>

<head>
    <title>Login Page</title>
    <link rel="stylesheet" type="text/css" href="../styling/loginpage.css">
</head>

<body>
    <div class="login-container">
        <h2>Login</h2>
        <form action="../../backend/process_login.php" method="post">
            <div class="input-group">
                <label for="username">Username/Email:</label>
                <input type="text" id="username" name="username" value = '<?php echo $username ?>' required>
            </div>
            <div class="input-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn-login">Login</button>
        </form>
        <div class="signup-login-buttons">
            <a class="btn-signup" href="signuppage.php">Sign Up</a>

        </div>
    </div>

    <?php printErrors(); ?>

</body>

</html>