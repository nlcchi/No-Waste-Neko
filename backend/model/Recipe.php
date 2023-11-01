<?php

class Recipe {
    private $username;
    private $imgURL;
    private $recipeName;

    private $servingSize;
    private $estCookingTime;
    private $recipeURL;


    function __construct($username, $imgURL, $recipeName, $servingSize, $estCookingTime, $recipeURL) {
        $this->username = $username;
        $this->imgURL = $imgURL;
        $this->recipeName = $recipeName;
        $this->servingSize = $servingSize;
        $this->estCookingTime = $estCookingTime;
        $this->recipeURL = $recipeURL;
    }

    public function getUsername(){
        return $this->username;
    }

    public function getImgURL(){
        return $this->imgURL;
    }

    public function getRecipeName(){
        return $this->recipeName;
    }

    public function getServingSize(){
        return $this->servingSize;
    }

    public function getEstCookingTime(){
        return $this->estCookingTime;
    }

    public function getRecipeURL(){
        return $this->recipeURL;
    }
}

?>