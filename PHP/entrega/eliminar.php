<?php require_once('../conectar.php'); 

$id=$_POST['id'];

if ($id != "" && is_numeric($id) && !($id == NULL)) {

    $sql="DELETE FROM entrega WHERE id='$id'";
    echo mysqli_query($conexion,$sql);
}

?>