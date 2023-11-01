<?php

require_once 'common.php';

// Get the data from form processing
$username = $_GET['username'];

$dao = new PreferenceDAO();

$status = $dao->delete($username);

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
