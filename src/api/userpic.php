<?php
require dirname(dirname(__DIR__)) . '/vendor/autoload.php';

use App\DAL\ConnectionWizard;

$db = new \App\DAL\ConnectionWizard();
$connection = $db->getConnection();
$userId = 1;
$picDir = "user_pictures/";
$productId = 1;

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
elseif($_GET['album'])
{
    $sql = "select * from customized_products where customized_product_id = :productId ";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':productId', $productId);
    $stmt->execute();

    $result =  array();

    while ($res = $stmt->fetch(\PDO::FETCH_ASSOC))
    {
        array_push($result, $res['cust_p_data']);
    }

    header('Content-Type: application/json');
    echo json_encode($result);

    return false;
}
else
{
    $sql = "select picture_code_and_ext from user_account_original_pictures where account_id = :id";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':id', $userId);
    $stmt->execute();



    $picArr = array();

    while ($pic = $stmt->fetch(\PDO::FETCH_ASSOC)) {
        array_push($picArr,$picDir . $pic['picture_code_and_ext']);
    }

    header('Content-Type: application/json');
    echo json_encode($picArr);
}

