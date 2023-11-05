<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];
$recipeName = $_GET['recipeName'];
$recipeURL = $_GET['recipeURL'];

$dao = new RecipeDAO();
$status = $dao->delete($username, $recipeName, $recipeURL);

if($status){

    echo json_encode(
        array("message" => "Recipe deleted successfully.")
    );

} else {

    echo json_encode(
        array("message" => "Oops! Something went wrong.")
    );

}

?>