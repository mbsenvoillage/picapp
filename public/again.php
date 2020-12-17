
<?php
require dirname(__DIR__) . '/vendor/autoload.php';
    use App\BLL\CustomizedProductManager;
    use App\DAL\CustomizedProductDAOImpl;
    use App\BLL\FileUploader;

    $ctlr = new CustomizedProductManager();
    $impl =  new CustomizedProductDAOImpl();

    //$ctlr->saveAlbum(1, json_encode([1 => "velue"]));

    /*header("Access-Control_Allow-Origin: *");
    //$file = $_FILES["uploadedimage"];



    $destination = '../public/user_pictures/';
    try {
        $loader = new FileUploader($destination);
        $loader->upload('uploadedimage');
        $msg = $loader->getMessages();
    }
    catch (Throwable $t)
    {
        echo $t->getMessage();
    }

    echo json_encode($msg);*/

    $ctlr->addPicture( "tester", 1);

?>


