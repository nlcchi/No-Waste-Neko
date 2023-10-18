<?php

class User {
    private $username;
    private $email;
    private $passwordHash;


    function __construct($username, $email, $passwordHash) {
        $this->username = $username;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
    }

    public function getUsername(){
        return $this->username;
    }

    public function getEmail(){
        return $this->email;
    }

    public function getPasswordHash(){
        return $this->passwordHash;
    }

    public function setPasswordHash($hashed){
        $this->passwordHash = $hashed;
    }
}