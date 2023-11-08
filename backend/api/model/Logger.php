<?php

class Logger {
    public static function log($message, $details) {
        // Log the message and details to a file
        $logEntry = "[" . date("Y-m-d H:i:s") . "] $message: " . json_encode($details) . PHP_EOL;
        file_put_contents('error_log.txt', $logEntry, FILE_APPEND);
    }
}