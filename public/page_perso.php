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
            <a id="save">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
                </svg>
            </a>
            <a id="replaceimage">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
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
