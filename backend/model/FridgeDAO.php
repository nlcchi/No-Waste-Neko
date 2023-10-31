<?php

class FridgeDAO {
       
    function get( $username ) {
        
        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare select
        $sql = "SELECT * FROM userfridge WHERE username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            
        $fridge = [];
        if ($stmt->execute() ) {
            
            while ($row = $stmt->fetch() ) {
                $fridge[] = new Fridge($row["username"], $row["productName"], $row["productCat"], $row["expiryDate"]);
            }
        }
        else {
            $connMgr->handleError( $stmt, $sql );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $fridge;
    }
    
    function create($fridge) {
        $result = true;

        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare insert
        $sql = "INSERT INTO userfridge (username, productName, productCat, expiryDate) VALUES (:username, :productName, :productCat, :expiryDate)";
        $stmt = $conn->prepare($sql);
        
        $username = $fridge->getUsername();
        $productName = $fridge->getProductName();
        $productCat = $fridge->getProductCat();
        $expiryDate = $fridge->getExpiryDate();

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->bindParam(":productName", $productName, PDO::PARAM_STR);
        $stmt->bindParam(":productCat", $productCat, PDO::PARAM_STR);
        $stmt->bindParam(":expiryDate", $expiryDate, PDO::PARAM_STR);

        $result = $stmt->execute();
        if (! $result ){ // encountered error
            $parameters = [ "fridge" => $fridge, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }


    // function update($fridge) {
    //     $result = true;

    //     // connect to database
    //     $connMgr = new ConnectionManager();
    //     $conn = $connMgr->connect();
        
    //     // prepare insert
    //     $sql = "UPDATE userfridge SET "{insert}"  WHERE username = :username";
    //     $stmt = $conn->prepare($sql);
        
    //     $username = $user->getUsername();
    //     $passwordHash = $user->getPasswordHash();

    //     $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    //     $stmt->bindParam(":passwordHash", $passwordHash, PDO::PARAM_STR);
        

    //     $result = $stmt->execute();
    //     if (! $result ){ // encountered error
    //         $parameters = [ "fridge" => $fridge, ];
    //         $connMgr->handleError( $stmt, $sql, $parameters );
    //     }
        
    //     // close connections
    //     $stmt = null;
    //     $conn = null;        
        
    //     return $result;
    // }

    function delete($fridge) {
        $result = true;

        // connect to database
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // prepare insert
        $sql = "DELETE FROM userfridge WHERE username = :username AND productName = :productName AND productCat = :productCat AND expiryDate = :expiryDate";
        $stmt = $conn->prepare($sql);
        
        $username = $fridge->getUsername();
        $productName = $fridge->getProductName();
        $productCat = $fridge->getProductCat();
        $expiryDate = $fridge->getExpiryDate();

        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->bindParam(":productName", $productName, PDO::PARAM_STR);
        $stmt->bindParam(":productCat", $productCat, PDO::PARAM_STR);
        $stmt->bindParam(":expiryDate", $expiryDate, PDO::PARAM_STR);

        $result = $stmt->execute();
        if (! $result ){ // encountered error
            $parameters = [ "fridge" => $fridge, ];
            $connMgr->handleError( $stmt, $sql, $parameters );
        }
        
        // close connections
        $stmt = null;
        $conn = null;        
        
        return $result;
    }
}