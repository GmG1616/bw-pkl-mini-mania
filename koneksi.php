<?php
$host = "localhost";
$user = "root";
$password = ""; // kosongkan jika pakai XAMPP default
$database = "mini_mania";

$mysqli = new mysqli($host, $user, $password, $database);

if ($mysqli->connect_errno) {
  die("Gagal koneksi ke database: " . $mysqli->connect_error);
}
?>
