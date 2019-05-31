<?php require_once('../conectar.php'); 

$id=$_POST['id'];
$telefono=$_POST['telefono'];
$fecha_inicio=$_POST['fecha_inicio'];
$fecha_final=$_POST['fecha_final'];

if ($telefono != "" && $id !="" && $fecha_inicio != "" && $fecha_final != "" && is_numeric($id) && is_numeric($telefono) && strlen($telefono) == 9 && !($telefono == NULL) && !($fecha_inicio == NULL) && !($fecha_final == NULL) && !($id == NULL)) {
    
	$sql="INSERT into entrega (id, telefono, fecha_inicio, fecha_final)
			values ('$id', '$telefono', '$fecha_inicio', '$fecha_final')";
    echo mysqli_query($conexion,$sql);

}
    
?>