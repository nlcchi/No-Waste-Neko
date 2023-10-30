<?php
    require_once '../../backend/common.php';

    // WRITE YOUR CODES HERE
    if(isset($_GET['username'])) {
        $tmp_username = $_GET['username'];
    } else {
        $tmp_username = '';
    }

    if(isset($_GET['email'])) {
        $tmp_email = $_GET['email'];
    } else {
        $tmp_email = '';
    }
?>

<html>
<head>
    <title>Sign Up Page</title>
    <link rel="stylesheet" type="text/css" href="../styling/signuppage.css">
</head>
<body>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form action="../../backend/process_signup.php" method="post">
            <div class="input-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value= '<?= $tmp_username?>' required>
            </div>
            <div class="input-group">
                <label for="password">Password:</label>
                <input type="password" class="password" name="password" required>
            </div>
            <div class="input-group">
                <label for="c_password">Confirm Password:</label>
                <input type="password" class="password" name="c_password" required>
            </div>
            <button type="submit" class="btn">Sign Up</button>
        </form>
    </div>

    <?php printErrors();
    unset($_SESSION['errors']); ?>

</body>
</html>
