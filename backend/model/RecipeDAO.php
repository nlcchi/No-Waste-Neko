<?php

class RecipeDAO {
       
    function get( $username ) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare select
        $sql = "SELECT * FROM userrecipes WHERE username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            
        if ($stmt->execute() ) {
            $recipe_list = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                $recipe = new Recipe($row["username"], $row["imgURL"], $row["recipeName"], $row["servingSize"], $row["estCookingTime"], $row["recipeURL"]);
                $recipe_list[] = $recipe;
            }
        }
        else {
            $connMgr->handleError( $stmt, $sql );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $recipe_list;
    }
    
    function create($recipe) {
        $result = true;

        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare insert
        $sql = "INSERT INTO userrecipes (username, imgURL, recipeName, servingSize, estCookingTime, recipeURL) VALUES (:username, :imgURL, :recipeName, :servingSize, :estCookingTime, :recipeURL)";
        $stmt = $conn->prepare($sql);
        
        $username = $recipe->getUsername();
        $imgURL = $recipe->getImgURL();
        $recipeName = $recipe->getRecipeName();
        $servingSize = $recipe->getServingSize();
        $estCookingTime = $recipe->getEstCookingTime();
        $recipeURL = $recipe->getRecipeURL();

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->bindParam(":imgURL", $imgURL, PDO::PARAM_STR);
        $stmt->bindParam(":recipeName", $recipeName, PDO::PARAM_STR);
        $stmt->bindParam(":servingSize", $servingSize, PDO::PARAM_STR);
        $stmt->bindParam(":estCookingTime", $estCookingTime, PDO::PARAM_STR);
        $stmt->bindParam(":recipeURL", $recipeURL, PDO::PARAM_STR);
        

        $result = $stmt->execute();
        if (! $result ){ // encountered error
            $parameters = [ "recipe" => $recipe, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }

    function delete($username, $recipeName, $recipeURL) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // prepare insert
        $sql = "DELETE FROM userrecipes WHERE username = :username AND recipeName = :recipeName AND recipeURL = :recipeURL";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->bindParam(":recipeName", $recipeName, PDO::PARAM_STR);
        $stmt->bindParam(":recipeURL", $recipeURL, PDO::PARAM_STR);        

        $result = $stmt->execute();
        
        if (! $result ){ // encountered error
            $parameters = [ "user" => $user, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }
}

?>