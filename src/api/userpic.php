<?php
require dirname(dirname(__DIR__)) . '/vendor/autoload.php';

use App\DAL\ConnectionWizard;
use App\BLL;

$controller = new BLL\CustomizedProductController();

$db = new \App\DAL\ConnectionWizard();
$connection = $db->getConnection();
$userId = 1;
$picDir = "user_pictures/";
$productId = 1;

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $json = file_get_contents('php://input');
    $sql = "update customized_products set cust_p_data = :data where customized_product_id = :productId ";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':data', $json);
    $stmt->bindParam(':productId', $productId);
    $stmt->execute();

    return false;
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
    echo $controller->fetchPictures($userId);

}

