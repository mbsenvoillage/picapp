<?php

namespace App\API;

require dirname(dirname(__DIR__)) . '/vendor/autoload.php';

use App\BLL;
use App\BLL\FileUploader;
use Throwable;

$controller = new BLL\CustomizedProductManager();



header('Content-Type: application/json');


if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['album']))
{
    $album = $_GET['album'];

    if(strcasecmp($album, 'new') == 0)
    {
        $title = $_POST["albumtitle"];
        $controller->saveAlbum(null, null, $title, 1, 1, 1);
        header('Location: ../../public/page_perso.php');
    }
    else {
        $json = file_get_contents('php://input');
        $controller->saveAlbum($album, $json);
    }

    return false;
}
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['pic']))
{
    $pic = $_GET['pic'];
    $Uid = $_GET['uid'];

    if(strcasecmp($pic, 'new') == 0)
    {
        header("Access-Control_Allow-Origin: *");
        $destination = '../../public/user_pictures/';
        try {
            $loader = new FileUploader($destination);
            $loader->upload('uploadedimage');
            $msg = $loader->getMessages();
            $controller->addPicture($loader->getPictureFileName(), $Uid);
        }
        catch (Throwable $t)
        {
            http_response_code(500);
            echo $t->getMessage();
        }

        echo json_encode($msg);
    }

}
if(isset($_GET['album']) && isset($_GET['Uid']))
{
    $album = $_GET['album'];
    $Uid = $_GET['Uid'];

    if(strcasecmp($album, 'all') == 0)
    {
        echo $controller->fetchAlbums($Uid, true);
    }
    else
    {
        echo $controller->fetchAlbums($Uid, false, $album);
    }

    return false;
}
if (isset($_GET['theme']))
{
    $themeId = $_GET['theme'];
    echo $controller->fetchTheme($themeId);
}
if (isset($_GET['pics']))
{
    $Uid = $_GET['Uid'];
    echo $controller->fetchPictures($Uid);

}

