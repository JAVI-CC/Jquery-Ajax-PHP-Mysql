<?php require_once('../conectar_listar.php'); 

$conexion = new Conexion();
$cnn = $conexion->getConexion();
$sql = "SELECT producto, precio FROM productos";
$statement = $cnn->prepare( $sql );
$valor = $statement->execute();

if ( $valor ) {
    while($resultado = $statement->fetch(PDO::FETCH_ASSOC)){
        $data["data"][] = $resultado;
    }
    echo json_encode( $data );
} else {
    echo "error";
}

$statement->closeCursor();
$conexion = null;

?>