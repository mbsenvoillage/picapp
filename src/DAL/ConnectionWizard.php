<?php

namespace App\DAL;

class ConnectionWizard {

    private $db_name;
    private $db_user;
    private $db_pass;
    private $db_host;
    private $pdo;


    /*public function __construct($db_name, $db_user = "root", $db_pass = "root", $db_host = "localhost")
    {
        $this->db_name = $db_name;
        $this->db_user = $db_user;
        $this->db_pass = $db_pass;
        $this->db_host = $db_host;
    }*/

    function getConnection()
    {
        $config = require dirname(__DIR__) . '/config.php';
        if (is_null($this->pdo) || empty($this->pdo)) {
            try {
                $this->pdo = new \PDO(
                    $config['database_dsn'],
                    $config['database_user'],
                    $config['database_pwd']);
            } catch (\Exception $e) {
                $this->conn = $e;
            }
        }
        return $this->pdo;
    }


}
