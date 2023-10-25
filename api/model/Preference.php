<?php

class Preference {
    private $username;
    private $diet;
    private $intolerence;


    function __construct($username, $diet, $intolerence) {
        $this->username = $username;
        $this->diet = $diet;
        $this->intolerence = $intolerence;
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

    public function getIntolerence(){
        return $this->intolerence;
    }

    public function setIntolerence($intolerence){
        $this->intolerence = $intolerence;
    }
}
