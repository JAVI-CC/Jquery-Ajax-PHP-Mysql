<?php require_once('../conectar.php'); 

$producto=$_POST['producto'];
$precio=$_POST['precio'];

if ($producto != "" && $precio != "" && is_numeric($precio) && !($producto == NULL) && !($precio == NULL)) {
    
	$sql="INSERT into productos (producto, precio)
			values ('$producto','$precio')";
    echo mysqli_query($conexion,$sql);

}
    
?>