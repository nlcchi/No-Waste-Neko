<?php

require_once 'common.php';

// Get the data from form processing
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$username = $data['username'];
$productName = $data['productName'];
$productCat = $data['productCat'];
$expiryDate = $data['expiryDate'];

$dao = new FridgeDAO();
$fridge = new Fridge($username, $productName, $productCat, $expiryDate);

$status = $dao->create($fridge);

if($status){
    echo json_encode(
        array("message" => "Item added successfully.")
    );
} else {
    echo json_encode(
        array("message" => "Oops! Something went wrong.")
    );
}
?>
