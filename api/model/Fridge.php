<?php

class User {
    private $username;
    private $productName;
    private $productCat;
    private $expiryDate;

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
        return $this->getProductName;
    }

    public function getProductCat(){
        return $this->productCat;
    }

    public function getExpiryDate(){
        return $this->expiryDate;
    }

    public function setPasswordHash($hashed){
        $this->passwordHash = $hashed;
    }
}

?>