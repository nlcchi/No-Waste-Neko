<?php

require_once 'common.php';
header('Content-Type: application/json');
$data = file_get_contents('php://input');

// Get the data from form processing
$username = $data->username;
$diet = $data->diet;
$intolerance = $data->intolerance;

if (isset($_GET['diet'])) {
    $diet = $_GET['diet'];
} else {
    $diet = "";
}

if (isset($_GET['preference'])){
    $intolerance = $_GET['intolerance'];
} else {
    $intolerance = "";
}

if ($diet == "" && $intolerance == "") {
    echo json_encode(
        array("message" => "No input.")
    );
    
    exit();
}

// Check if username is already taken
$dao = new PreferenceDAO();
$preference = new Preference($username, $diet, $intolerance);

$status = $dao->create($preference);

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
