<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];

if (!isset($_GET['recipeName']) || !isset($_GET['recipeURL'])) {
    echo json_encode(
        array("message" => "Need recipe name and URL.")
    );
    
    exit();
}

$recipeName = $_GET['recipeName'];
$recipeURL = $_GET['recipeURL'];

if (isset($_GET['imgURL'])) {
    $imgURL = $_GET['imgURL'];
} else {
    $imgURL = "";
}

if (isset($_GET['servingSize'])){
    $servingSize = $_GET['servingSize'];
} else {
    $servingSize = "";
}

if (isset($_GET['estCookingTime'])){
    $estCookingTime = $_GET['estCookingTime'];
} else {
    $estCookingTime = "";
}

$dao = new RecipeDAO();
$recipe = new Recipe($username, $imgURL, $recipeName, $servingSize, $estCookingTime, $recipeURL);

$status = $dao->create($recipe);

if($status){

    echo json_encode(
        array("message" => "Recipe added successfully.")
    );

} else {

    echo json_encode(
        array("message" => "Oops! Something went wrong.")
    );

}

?>