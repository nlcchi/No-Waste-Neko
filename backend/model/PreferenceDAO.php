<?php

class PreferenceDAO {
       
    function get( $username ) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare select
        $sql = "SELECT username, diet, intolerence  FROM userpreference WHERE username = :username";
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

                if ($row["intolerence"] != ""){
                    $intolerance[] = $row["intolerence"];
                }                
            }

            $preference = array (
                "diet" => $diet,
                "intolerence" => $intolerance,
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
    
    function create($preference) {
        $result = true;

        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare insert
        $sql = "INSERT INTO userpreference (username, diet, intolerence) VALUES (:username, :diet, :intolerence)";
        $stmt = $conn->prepare($sql);
        
        $username = $preference->getUsername();
        $diet = $preference->getDiet();
        $intolerance = $preference->getIntolerence();

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->bindParam(":diet", $diet, PDO::PARAM_STR);
        $stmt->bindParam(":intolerence", $intolerance, PDO::PARAM_STR);
        

        $result = $stmt->execute();
        if (! $result ){ // encountered error
            $parameters = [ "prefrence" => $preference, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }

    function delete($preference) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // prepare insert
        $sql = "DELETE FROM userpreference WHERE username = :username AND diet = :diet AND intolerence = :intolerence";
        $stmt = $conn->prepare($sql);
        
        $username = $preference->getUsername();
        $diet = $preference->getDiet();
        $intolerance = $preference->getIntolerence();

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->bindParam(":diet", $diet, PDO::PARAM_STR);
        $stmt->bindParam(":intolerence", $intolerance, PDO::PARAM_STR);        

        $result = $stmt->execute();
        
        if (! $result ){ // encountered error
            $parameters = [ "prefrence" => $preference, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }
}

?>