<?php


namespace App\BO;


class Album
{
    private $themeId;
    private $productName;
    private $title;
    private $croppedPictures = [];

    /**
     * Album constructor.
     * @param $themeId
     * @param $productName
     * @param $title
     */
    public function __construct($themeId, $productName, $title)
    {
        $this->themeId = $themeId;
        $this->productName = $productName;
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getThemeId()
    {
        return $this->themeId;
    }

    /**
     * @param mixed $themeId
     */
    public function setThemeId($themeId)
    {
        $this->themeId = $themeId;
    }

    /**
     * @return mixed
     */
    public function getProductName()
    {
        return $this->productName;
    }

    /**
     * @param mixed $productName
     */
    public function setProductName($productName)
    {
        $this->productName = $productName;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }




}