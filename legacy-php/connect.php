<?php
    $db_host = getenv('DB_HOST') ?: getenv('MYSQLHOST') ?: getenv('MYSQL_HOST') ?: '127.0.0.1';
    $db_port = getenv('DB_PORT') ?: getenv('MYSQLPORT') ?: getenv('MYSQL_PORT') ?: '3307';
    $db_name = getenv('DB_NAME') ?: getenv('MYSQLDATABASE') ?: getenv('MYSQL_DATABASE') ?: 'barbershop';
    $user = getenv('DB_USER') ?: getenv('MYSQLUSER') ?: getenv('MYSQL_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: getenv('DB_PASSWORD') ?: getenv('MYSQLPASSWORD') ?: getenv('MYSQL_PASSWORD') ?: '';
    
    $dsn = "mysql:host=$db_host;port=$db_port;dbname=$db_name";
	$option = array(
		PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
	);
	try
	{
		$con = new PDO($dsn,$user,$pass,$option);
		$con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		//echo 'Good Very Good !';
	}
	catch(PDOException $ex)
	{
		echo "Failed to connect with database ! ".$ex->getMessage();
		die();
	}
?>