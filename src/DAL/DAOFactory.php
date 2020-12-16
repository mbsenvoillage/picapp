<?php


namespace App\DAL;


abstract class DAOFactory
{

    /**
     * @return CustomizedProductDAO interface giving access to CustomizedProduct
     * CRUD methods
     */
    public static function getCustomizedProductDAO(): CustomizedProductDAO
    {
        return new CustomizedProductDAOImpl();
    }
}