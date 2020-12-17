<?php


namespace App\BLL;


use App\DAL\DAOFactory;

class CustomizedProductManager
{

    private $custProdCtlr;

    public function __construct()
    {
        $this->custProdCtlr = DAOFactory::getCustomizedProductDAO();

    }

    public function fetchTheme($themeId)
    {
        return json_encode($this->custProdCtlr->getTheme($themeId));
    }

    public function fetchAlbums($userid, $getList = false, $albumid = null)
    {
        return json_encode($this->custProdCtlr->getUserCustomizedAlbum($userid, $getList, $albumid));
    }

    public function fetchPictures($userid)
    {
        return json_encode($this->custProdCtlr->getUserPictures($userid));
    }

    public function saveAlbum($albumId = null, $json = null, $title = null, $userid = null, $productid = null, $themeid = null)
    {
        return $this->custProdCtlr->saveCustomizedAlbum($albumId, $json, $title, $userid, $productid, $themeid);
    }

    public function addPicture($filename, $userid)
    {
        $this->custProdCtlr->insertUserPictures($filename, $userid);
    }

}