<?php

class Fridge {
    public $username;
    public $productName;
    public $productCat;
    public $expiryDate;

    function __construct($username, $productName, $productCat, $expiryDate) {
        $this->username = $username;
        $this->productName = $productName;
        $this->productCat = $productCat;
        $this->expiryDate = $expiryDate;
    }

    public function getUsername(){
        return $this->username;
    }

    public function getProductName(){
        return $this->productName;
    }

    public function getProductCat(){
        return $this->productCat;
    }

    public function getExpiryDate(){
        return $this->expiryDate;
    }

}

?>