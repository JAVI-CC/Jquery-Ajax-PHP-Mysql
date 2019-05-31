<?php require_once('../conectar.php'); 

$producto=$_POST['producto'];
$unidades=$_POST['unidades'];

if ($producto != "" && $unidades != "" && is_numeric($unidades) && !($producto == NULL) && !($unidades == NULL)) {
    
	$sql="INSERT into stock (producto, unidades)
			values ('$producto','$unidades')";
    echo mysqli_query($conexion,$sql);

}
    
?>