<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];
$productName = $_GET['productName'];
$productCat = $_GET['productCat'];
$expiryDate = $_GET['expiryDate'];

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