<?php

require_once "Logger.php";

class ConnectionManager {

    function connect() {$servername = 'neko-db.mysql.database.azure.com';
        $username = 'neko';
        $password = 'A+forwad2';
        $dbname = 'user_db';
        $port = 3306;
        
        // Create connection
        $conn = new PDO(
                    "mysql:host=$servername;dbname=$dbname;port=$port"
                    , $username
                    , $password
                    ,array(
                        PDO::MYSQL_ATTR_SSL_CA => '../DigiCertGlobalRootCA.crt.pem',
                        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
                        )
                    );     
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // if fail, exception will be thrown
        return $conn;
                
        // if fail, exception will be thrown
    }
    
    function handleError($obj, $sql = null, $parameters = null) {
        $details = [
            "errno" => $obj->errorCode(),
            "errstr" => $obj->errorInfo(),

        ];
        if (! is_null($sql) ) {
            $details["sql"] = $sql;
        }
        if (! is_null($parameters) ) {
            $details["parameters"] = $parameters;
        }
        
        Logger::log( "Database Error", $details );
    }    
}