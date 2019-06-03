<?php

class Conexion{
    private $host = "localhost";
    private $dbname = "calderas";
    private $user = "admin";
    private $password = "12345678";
    private $conexion = null;
    public function getConexion(){
        try{
            $this->conexion = new PDO(
                                "mysql:host=$this->host; dbname=$this->dbname",
                                $this->user,
                                $this->password
                                );
        return $this->conexion;
        }catch(Exception $e){
            echo $e->getMessage();
        }finally{
            $this->conexion = null;
        }
    }
}

?>