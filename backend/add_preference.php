<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];

if (isset($_GET['diet'])) {
    $diet = $_GET['diet'];
} else {
    $diet = "";
}

if (isset($_GET['preference'])){
    $intolerence = $_GET['intolerence'];
} else {
    $intolerence = "";
}

if ($diet == "" && $intolerence == "") {
    echo json_encode(
        array("message" => "No input.")
    );
    
    exit();
}

// Check if username is already taken
$dao = new PreferenceDAO();
$preference = new Preference($username, $diet, $intolerence);

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