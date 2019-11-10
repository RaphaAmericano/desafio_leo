<?php 
class Database {
    //Credentials
    private $host = 'localhost';
    private $port = '8889';
    private $db = 'leo_db';
    private $user = 'root';
    private $password = 'root';
    public $conn;

    public function getConnection(){
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->db, $this->user, $this->password);    
            $this->conn->exec("set names uft8");
        } catch(PDOException $exception){
            echo "Connection error: ". $exception->getMessage();
        }
        return $this->conn;
    }

}