<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Read pdf</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <!-- drag and drop -->
    <!-- <div class="drop-zone" >
      <span class="drop-zone__prompt">Déposez votre fichier içi ou clicquez pour le téléchargé</span> -->
      <!-- <div class="drop-zone__thumb" data-label="myfile.txt">  </div> -->
      <!-- <input type="file" name="myFile" class="drop-zone__input" multiple>
    </div> -->
    <!-- Lire le pdf -->
    <div class="top-bar">
      <button class="btn" id="prev-page">
        <i class="fas fa-arrow-circle-left" ></i> Prev Page
      </button>
      <span class="page-info">
        Page <span id="page-num"></span> of <span id="page-count"></span>
      </span>
      <button class="btn" id="next-page">
        Next Page <i class="fas fa-arrow-circle-right" ></i>
      </button>
    </div>
    <canvas id="pdf-render"></canvas>
    <script  src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
    <script type="text/javascript" src="read_pdf.js"></script>
  </body>
</html>
