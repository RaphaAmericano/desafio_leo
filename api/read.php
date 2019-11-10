<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';
include_once 'Curso.php';

$database = new Database();
$db = $database->getConnection();

$curso = new Curso($db);

$stmt = $curso->read();
$num = $stmt->rowCount();

if($num > 0 ){
    $cursos_arr = array();
    $cursos_arr["records"] = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        //extract($row);

        $curso_item = array(
            "id" => $row['ID_CURSOS'],
            "nome" => $row['NOME'],
            "descricao" => $row['DESCRICAO'],
            "banner" => $row['BANNER'],
            "data" => $row['DATA_INCLUDE']
        );
        array_push($cursos_arr["records"], $curso_item);
    };
    http_response_code(200);
    echo json_encode($cursos_arr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "Não foram encontrados cursos")
    );
}