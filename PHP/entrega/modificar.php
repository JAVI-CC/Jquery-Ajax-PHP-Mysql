<?php require_once('../conectar.php');

$id=$_POST['id'];
$telefono=$_POST['telefono'];
$fecha_inicio=$_POST['fecha_inicio'];
$fecha_final=$_POST['fecha_final'];

if ($telefono != "" && $id !="" && $fecha_inicio != "" && $fecha_final != "" && is_numeric($telefono) && is_numeric($id) && strlen($telefono) == 9 && !($telefono == NULL) && !($fecha_inicio == NULL) && !($fecha_final == NULL) && !($id == NULL)) {

   $sql="UPDATE entrega SET telefono='$telefono', fecha_inicio='$fecha_inicio', fecha_final='$fecha_final' WHERE id='$id'";
   echo mysqli_query($conexion,$sql);

}

?>