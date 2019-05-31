<?php require_once('../conectar.php');

$producto=$_POST['producto'];
$precio=$_POST['precio'];

if ($producto != "" && $precio != "" && is_numeric($precio) && !($producto == NULL) && !($precio == NULL)) {

    $sql="UPDATE productos SET precio='$precio' WHERE producto='$producto'";
    echo mysqli_query($conexion,$sql);
}

?>