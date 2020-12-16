<?php

namespace App\DAL;

class ConnectionWizard {
    
    private static $pdo;
    
    public static function getConnection()
    {
        $config = require dirname(__DIR__) . '/config.php';
        if (is_null(self::$pdo) || empty(self::$pdo)) {
            try {
                self::$pdo = new \PDO(
                    $config['database_dsn'],
                    $config['database_user'],
                    $config['database_pwd']);
            } catch (\Exception $e) {
                self::$pdo = $e;
            }
        }
        return self::$pdo;
    }
}
