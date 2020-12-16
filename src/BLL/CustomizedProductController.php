<?php


namespace App\BLL;


use App\DAL\DAOFactory;

class CustomizedProductController
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

}