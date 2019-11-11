<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// header("Access-Control-Allow-Headers: *");
 
include_once 'config.php';
include_once 'Curso.php';

$database = new Database();
$db = $database->getConnection();

$curso = new Curso($db);

var_dump(json_decode(file_get_contents($_POST)));
var_dump($_POST);

//$data = json_decode(file_get_contents("php://input"));
//$image = addcslashes(file_get_contents($_FILES['banner']['tmp_name']));
$data = $_POST;
$image = $_FILES['banner']['tmp_name'];

if(!empty($data['title']) &&
    !empty($data['description']) &&
    !empty($image) ){
    
    $curso->nome = $data['title'];
    $curso->descricao = $data['description'];
    $curso->banner = $image;

    if($curso->create()){
        http_response_code(201);
        echo json_ecode(array("message" => "Curso cadastrado com sucesso!"));
    }
    else {
        http_response_code(503);

        echo json_encode(array("message" => "Não foi possivel cadastrar o curso"));
    }
} {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível cadastrar o curso. Dados incompletos."));
}
