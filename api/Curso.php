<?php
class Curso{
    private $conn;
    private $table_name = "cursos";

    public $id;
    public $nome;
    public $descricao;
    public $banner;
    public $data;

    public function __construct($db){
        $this->conn = $db;
    }
    function read(){

        $query = "SELECT * FROM cursos";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    function create(){
        $query = "INSERT INTO ".$this->table_name." (NOME, DESCRICAO, BANNER) VALUES(:nome, :description, :banner)";

        $stmt = $this->conn->prepare($query);

        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->banner = htmlspecialchars(strip_tags($this->banner));

        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":description", $this->descricao);
        $stmt->bindParam(":banner", $this->banner);

        if($stmt->execute()){
            return true;
        }
        return false;

    }
}

// leo.api 
// leo.localhost