<?php

$dirname = "images/PagePerso/";
$images = glob($dirname."*.jpg");

foreach ($images as $image) {
    echo '<div class="photo-grid-photo">' .
        '<img class="draggable" draggable="true" src="' . $image . '">' .
    '</div>';
}

?>

