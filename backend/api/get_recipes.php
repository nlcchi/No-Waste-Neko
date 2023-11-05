<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];

// Check if username is already taken
$dao = new RecipeDAO();

$status = $dao->get($username);

if($status){

    echo json_encode(
        array("data" => $status)
    );

} else {

    echo json_encode(
        array("message" => "Oops! Something went wrong.")
    );

}

?>