<?php require_once('../conectar.php'); 

$producto=$_POST['producto'];

if ($producto != "" && !($producto == NULL)) {

    $sql="DELETE FROM productos WHERE producto='$producto'";
    echo mysqli_query($conexion,$sql);
}

?>

