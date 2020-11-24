<?php

namespace App\DAL;

use mysqli;

class ConnectionWizard {

    private $host = "localhost";
    private $user = "root";
    private $pwd = "root";
    private $dbName = "honore";

    public $conn = null;

    public function getConnection() {
        $this->conn = new mysqli($this->host, $this->user, $this->pwd, $this->dbName);
        if($this->conn->connect_error) {
            die("Connection failed : " . $this->conn->connect_error);
        }
        echo "yay ";
        return $this->conn;
    }

}
