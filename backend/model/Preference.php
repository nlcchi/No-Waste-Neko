<?php

class Preference {
    private $username;
    private $diet;
    private $intolerance;


    function __construct($username, $diet, $intolerance) {
        $this->username = $username;
        $this->diet = $diet;
        $this->intolerance = $intolerance;
    }

    public function getUsername(){
        return $this->username;
    }

    public function getDiet(){
        return $this->diet;
    }

    public function setDiet($diet){
        $this->diet = $diet;
    }

    public function getIntolerance(){
        return $this->intolerance;
    }

    public function setIntolerance($intolerance){
        $this->intolerance = $intolerance;
    }
}
