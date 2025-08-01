<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "mini_mania";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM kom ORDER BY waktu DESC");
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Komentar Pengunjung - Mini Mania</title>
  <link rel="stylesheet" href="komentar.css">

</head>
<body>
  <div class="container">
    <h2>Komentar Pengunjung</h2>
    <?php while($row = $result->fetch_assoc()): ?>
      <div class="komentar-box">
        <strong><?php echo htmlspecialchars($row['nama']); ?></strong><br />
        <small><?php echo $row['waktu']; ?></small>
        <p><?php echo nl2br(htmlspecialchars($row['komentar'])); ?></p>
      </div>
    <?php endwhile; ?>
  </div>
</body>
</html>

<?php $conn->close(); ?>
