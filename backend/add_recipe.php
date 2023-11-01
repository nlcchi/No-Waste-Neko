<?php

require_once 'common.php';
header('Content-Type: application/json');
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Get the data from form processing
$username = $data["username"];
$recipeName = $data["recipeName"];
$recipeURL = $data["recipeURL"];

if (isset($data["imgURL"])) {
    $imgURL = $data["imgURL"];
} else {
    $imgURL = "";
}

if (isset($data["servingSize"])){
    $servingSize = (int) $data["servingSize"];
} else {
    $servingSize = null;
}

if (isset($data["estCookingTime"])){
    $estCookingTime = (int) $data["estCookingTime"];
} else {
    $estCookingTime = null;
}

$dao = new RecipeDAO();
$recipe = new Recipe($username, $imgURL, $recipeName, $servingSize, $estCookingTime, $recipeURL);

$status = $dao->create($recipe);

if($status){
    echo json_encode(array("message" => "Recipe added successfully."));
} else {
    echo json_encode(array("message" => "Oops! Something went wrong."));
}

?>
