<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Homepage</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <script defer src="https://use.fontawesome.com/releases/v5.15.1/js/all.js" integrity="sha384-9/D4ECZvKMVEJ9Bhr3ZnUAF+Ahlagp1cyPC7h5yDlZdXs4DQ/vRftzfd+2uFUuqS" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="dist/cropper.css">



</head>
<body class="page-perso">


<div class="page-perso-zone-edition-main-container">
    <div class="page-perso-barre-latérale">
        <div class="page-perso-barre-latérale-photo-container">
            <div class="page-perso-barre-latérale-photo-container-theme-selection">
                <div class="page-perso-barre-latérale-theme-selection-title">
                    <p class="step-num">1.</p>
                    <p>Je sélectionne mon thème</p>
                </div>
                <div class="page-perso-barre-latérale-theme-selection-photo-container">
                    <div class="theme-1">
                        <div class="theme-photo-medaillon">

                        </div>
                        <p class="theme-name-txt">Honoré</p>
                    </div>
                    <div class="theme-2">
                        <div class="theme-photo-medaillon">

                        </div>
                        <p class="theme-name-txt">Classique</p>
                    </div>
                </div>
            </div>
            <div class="page-perso-barre-latérale-photo-container-photo-selection">
                <div class="page-perso-barre-latérale-photo-selection-title">
                    <p class="step-num">2.</p>
                    <p>Je personnalise avec mes photos</p>
                </div>
                <div class="page-perso-barre-latérale-photo-selection-photo-grid-container">
                    <div class="photo-grid-photo-container">
                        <!-- Pictures displayed here will be set as css background-->
                        <?php
                        require '../src/DAL/DisplayImagesFromFolder.php';
                        ?>

                    </div>
                </div>

            </div>
        </div>
        <div class="page-perso-barre-latérale-buttons-container">
            <div class="button-wrapper">
                <button>commander</button>
            </div>
            <div class="button-wrapper">
                <button>sauvegarder</button>
            </div>
            <div class="button-wrapper">
                <button id="img-upload-btn">uploader</button>
                <input type="file" accept="image/jpeg, image/png" name="uploadedimage" id="img-upload-input" style="display: none">
            </div>
        </div>

    </div>


    <div class="page-perso-espace-travail" id="test">
        <button id="getcanvas">Get canvas data</button>
        <button id="setcanvas">Set canvas data</button>
        <button id="replaceimage">Reset Image</button>
        <button id="frwd">Zoom avant</button>
        <button id="bckwd">Zoom arrière</button>

        <div class="espace-travail-single-page-main-container">
            <div class="espace-travail-single-page-content-container">
                <div class="single-page-container">
                    <div class="single-page-photo-container">
                        <div class="draggable-zone">
                            <canvas id="canvas1" width="600" height="600">

                            </canvas>
                            <div class="canvas-container droppable">

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="espace-travail-single-page-content-container-2">
                <div class="single-page-container">
                    <div class="single-page-photo-container">
                        <div class="draggable-zone">
                            <canvas id="canvas2" width="600" height="600">

                            </canvas>
                            <div id="p13-1-container" class="droppable" >

                            </div>
                            <div id="p13-2-container"  style="width: 111px; height: 166px;" class="droppable">

                            </div>
                            <div id="p13-3-container" class="droppable">

                            </div>
                            <div id="p13-4-container" class="droppable">

                            </div>
                            <div id="p13-5-container" class="droppable">

                            </div>
                            <div id="p13-6-container" class="droppable">

                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>
</div>




<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script src="dist/cropper.js"></script>

<script src="js/app.js"></script>
<script src="js/perso.js"></script>

<script type="module"  src="js/productCustom/cust-p_ctrl.js"></script>

</body>
</html>
