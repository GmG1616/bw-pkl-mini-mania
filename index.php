<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tentang Kami - Mini Mania</title>
    <link rel="stylesheet" href="stylee.css" />
  </head>
  <body>
    <!-- Bagian Tentang, Sosmed, Lokasi... (kode kamu sebelumnya tetap) -->

    <!-- Form Komentar -->
    <section class="komentar">
      <div class="container">
        <h2>Tinggalkan Komentar</h2>
        <form action="komentar.php" method="POST">
          <label for="nama">Nama:</label><br />
          <input type="text" id="nama" name="nama" required /><br />

          <label for="komentar">Komentar:</label><br />
          <textarea id="komentar" name="komentar" rows="6" required></textarea><br />

          <button type="submit">Kirim Komentar</button>
        </form>

        <h3 style="margin-top: 2rem;">Komentar Pengunjung</h3>
        <div class="list-komentar">
          <?php include 'komentar.php'; ?>
        </div>
      </div>
    </section>
  </body>
</html>
