<?php

class PreferenceDAO {
       
    function get( $username ) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare select
        $sql = "SELECT username, diet, intolerance  FROM userpreference WHERE username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            
        $preference = null;
        if ($stmt->execute() ) {
            $diet = [];
            $intolerance = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                if ($row["diet"] != "") {
                    $diet[] = $row["diet"];
                }

                if ($row["intolerance"] != ""){
                    $intolerance[] = $row["intolerance"];
                }                
            }

            $preference = array (
                "diet" => $diet,
                "intolerance" => $intolerance,
            );
            
        }
        else {
            $connMgr->handleError( $stmt, $sql );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $preference;
    }
    
    function createDiet($username, $diet) {
            
            // connect to database
            $connMgr = new ConnectionManager();
            $conn = $connMgr->connect();
    
            // prepare insert
            $sql = "INSERT INTO userpreference (username, diet, intolerance) VALUES (:username, :diet, '')";
            $stmt = $conn->prepare($sql);
    
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);  
            $stmt->bindParam(":diet", $diet, PDO::PARAM_STR);  
            $result = $stmt->execute();
            
            if (! $result ){ // encountered error
                $parameters = [ "username" => $username, "diet" => $diet, ];
                $connMgr->handleError( $stmt, $sql, $parameters );
            }
            
            // close connections
            $stmt = null;
            $conn = null;        
            
            return $result;
    }

    function createIntolerance($username, $intolerance) {
            
            // connect to database
            $connMgr = new ConnectionManager();
            $conn = $connMgr->connect();
    
            // prepare insert
            $sql = "INSERT INTO userpreference (username, diet, intolerance) VALUES (:username, '', :intolerance)";
            $stmt = $conn->prepare($sql);
    
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);  
            $stmt->bindParam(":intolerance", $intolerance, PDO::PARAM_STR);  
            $result = $stmt->execute();
            
            if (! $result ){ // encountered error
                $parameters = [ "username" => $username, "intolerance" => $intolerance, ];
                $connMgr->handleError( $stmt, $sql, $parameters );
            }
            
            // close connections
            $stmt = null;
            $conn = null;        
            
            return $result;
    }

    function deleteIntolerance($username, $intolerance) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // prepare insert
        $sql = "DELETE FROM userpreference WHERE username = :username and intolerance = :intolerance";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);  
        $stmt->bindParam(":intolerance", $intolerance, PDO::PARAM_STR);  
        $result = $stmt->execute();
        
        if (! $result ){ // encountered error
            $parameters = [ "username" => $username, "intolerance" => $intolerance, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }

    function deleteDiet($username, $diet) {
            
            // connect to database
            $connMgr = new ConnectionManager();
            $conn = $connMgr->connect();
    
            // prepare insert
            $sql = "DELETE FROM userpreference WHERE username = :username and diet = :diet";
            $stmt = $conn->prepare($sql);
    
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);  
            $stmt->bindParam(":diet", $diet, PDO::PARAM_STR);  
            $result = $stmt->execute();
            
            if (! $result ){ // encountered error
                $parameters = [ "username" => $username, "diet" => $diet, ];
                $connMgr->handleError( $stmt, $sql, $parameters );
            }
            
            // close connections
            $stmt = null;
            $conn = null;        
            
            return $result;
    }
}

?>
