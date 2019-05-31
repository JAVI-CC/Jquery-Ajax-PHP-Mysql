<?php require_once('../conectar.php');

$producto=$_POST['producto'];
$unidades=$_POST['unidades'];

if ($producto != "" && $unidades != "" && is_numeric($unidades) && !($producto == NULL) && !($unidades == NULL)) {

    $sql="UPDATE stock SET unidades='$unidades' WHERE producto='$producto'";
    echo mysqli_query($conexion,$sql);
}

?>