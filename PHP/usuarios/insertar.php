<?php require_once('../conectar.php'); 

$id=$_POST['id'];
$email=$_POST['email'];
$password=$_POST['password'];

if ($email != "" && $id !="" && $password != "" && is_numeric($id) && !($email == NULL) && !($password == NULL) && !($id == NULL)) {
    
	$sql="INSERT into usuarios (id, email, password)
			values ('$id', '$email', '$password')";
    echo mysqli_query($conexion,$sql);

}
    
?>