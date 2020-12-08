<?php

$dirname = "images/PagePerso/";
$images = glob($dirname."*.jpg");

foreach ($images as $image) {
    echo '<div class="photo-grid-photo">' .
        '<img class="draggable" draggable="true" src="' . $image . '">' .
    '</div>';
}

printf("hello");

$target_folder = "public/photos/";
$photo_id = sha1_file($_FILES["file"]["tmp_name"]);
$new_path = $target_folder . $photo_id . $extension;
move_uploaded_file($_FILES["file"]["tmp_name"], $new_path);


?>

