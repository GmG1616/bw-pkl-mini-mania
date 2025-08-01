<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "mini_mania";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

$nama = $_POST['nama'] ?? '';
$komentar = $_POST['komentar'] ?? '';

$sql = "INSERT INTO kom (nama, komentar) VALUES ('$nama', '$komentar')";
$conn->query($sql);

$conn->close();
header("Location: lihat_komentar.php");
exit;
?>
