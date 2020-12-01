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
        <button id="replaceimage">Reset Image</button>
        <button id="save">Save</button>
        <button id="destroyall">Destroy all croppers</button>
        <button id="reload">Reload save</button>

        <div id="controls">
            <a id="frwd">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path fill="none" d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z"></path>
                </svg>
            </a>
            <a id="bckwd">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path fill="none" d="M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z M13.388,9.624H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h6.775c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z"></path>
                </svg>
            </a>
        </div>

        <div class="espace-travail-single-page-main-container">
            <div class="espace-travail-single-page-content-container">
                <div class="single-page-container">
                    <div class="single-page-photo-container">
                        <div class="draggable-zone">
                            <canvas id="canvas1" width="600" height="600">

                            </canvas>
                            <div class="canvas-container droppable" id="p1-container">

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
