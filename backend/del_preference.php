<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];
$diet = $_GET['diet'];
$intolerence = $_GET['intolerence'];

$dao = new PreferenceDAO();
$preference = new Preference($username, $diet, $intolerence);

$status = $dao->delete($preference);

if($status){

    echo json_encode(
        array("message" => "Item deleted successfully.")
    );

} else {

    echo json_encode(
        array("message" => "Oops! Something went wrong.")
    );

}

?>