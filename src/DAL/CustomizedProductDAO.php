<?php


namespace App\DAL;


interface CustomizedProductDAO
{
    /**
     * @return string[] to be encoded in json, then fetched from api
     * @param $themeId
     */
    public function getTheme($themeId): array;

    /**
     * @return string[] to be encoded in json, then fetched from api
     * @param $albumid
     * @param $userid
     * @param $getList
     */
    public function getUserCustomizedAlbum($userid, $getList, $albumid): array;

    /**
     * @return string[] to be encoded in json, then fetched from api
     * @param $userid
     */
    public function getUserPictures($userid): array;

    /**
     * insert Cropper data in customized_products table
     */
    public function saveCustomizedAlbum($albumId, $json, $title, $userid, $productid, $themeid): string;

    /**
     * insert user picture url, after file upload
     */
    public function insertUserPictures($filename, $userid): void;

}