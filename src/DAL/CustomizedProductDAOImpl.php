<?php


namespace App\DAL;

use NilPortugues\Sql\QueryBuilder\Builder\GenericBuilder;
use PDO;

class CustomizedProductDAOImpl implements CustomizedProductDAO
{
    private $connection;
    private $builder;

    public function __construct()
    {
        $this->connection = ConnectionWizard::getConnection();
        $this->builder = new GenericBuilder();
    }

    private function prepare($sqlrequest)
    {
        return $this->connection->prepare($sqlrequest);
    }

    public function getTheme($themeId): array
    {
        $sql = CustProdSQLRequests::$selectTheme;
        $stmt = $this->prepare($sql);
        $stmt->execute([$themeId]);

        $Json = array();

        while ($view = $stmt->fetch(PDO::FETCH_ASSOC )) {
            $pagenum = $view['page_num'];
            $position = $view['frame_position'];

            /*dirname(dirname(__DIR__)) . '/' . */

            if(!isset($Json['page-'.$pagenum])) {
                $Json['page-'.$pagenum] = array('width' => $view['vW'],
                    'height' => $view['vH'], 'url' => $view['theme_view_url']);
            }
            if(!isset($Json['page-'.$pagenum][$position])) {
                $Json['page-'.$pagenum][$position] = array('width' => $view['width'],
                    'height' => $view['height'], 'top' => $view['top_offset'], 'left' => $view['left_offset'], 'angle' => $view['angle']);
            }

        };

        return $Json;

    }

    public function getUserCustomizedAlbum($userid, $getList, $albumid): array
    {
        $array = [];
        if($getList)
        {
            $query = $this->builder->select()
                ->setTable('customized_products')
                ->setColumns(['customized_product_id', 'product_id', 'theme_id', 'title'])
                ->where()
                ->equals('user_id', $userid)
            ->end();

            $stmt = $this->prepare($this->builder->write($query));
            $stmt->execute([':v1' => $userid]);
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $array = $res;
        }
        else
        {
            $query = $this->builder->select()
                ->setTable('customized_products')
                ->setColumns(['cust_p_data'])
                ->where()
                ->equals('customized_product_id', $albumid)
                ->end();

            $stmt = $this->prepare($this->builder->write($query));
            $stmt->execute([':v1' => $albumid]);
            $result =  array();

            while ($res = $stmt->fetch(\PDO::FETCH_ASSOC))
            {
                array_push($result, $res['cust_p_data']);
            }
            $array = $result;
        }

        return $array;

    }

    public function getUserPictures($userid): array
    {

        $query = $this->builder->select()
            ->setTable('user_account_original_pictures')
            ->setColumns(['picture_code_and_ext'])
            ->where()
            ->equals('account_id', $userid)
            ->end();

        $stmt = $this->prepare($this->builder->write($query));
        $stmt->execute([':v1' => $userid]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $res;

        /*$picArr = array();

        while ($pic = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            array_push($picArr,$picDir . $pic['picture_code_and_ext']);
        }*/
    }

    public function saveCustomizedAlbum($albumId, $json, $title, $userid, $productid, $themeid): string
    {

        if($albumId && $json)
        {
            $query = $this->builder->update()
                ->setTable('customized_products')
                ->setValues(['cust_p_data' => $json])
                ->where()
                ->equals('customized_product_id', $albumId)
                ->end();
            $stmt = $this->prepare($this->builder->write($query));

            $stmt->execute([':v1' => $json, ':v2' => $albumId]);

        }
        else
        {
           $query = $this->builder->insert()
           ->setTable('customized_products')
           ->setValues([
               'user_id' => $userid,
               'product_id' => $productid,
               'theme_id' => $themeid,
               'title' => $title
           ])
           ->where()
           ->equals('user_id', $userid)
           ->end();
            $stmt = $this->prepare($this->builder->write($query));
            $stmt->execute([':v1' => $userid, ':v2' => $productid, ':v3' => $themeid, ':v4' => $title]);
        }

        return 'success';

    }

    public function insertUserPictures($filename, $userid): void
    {
        $query = $this->builder->insert()
            ->setTable('user_account_original_pictures')
            ->setValues([
                'picture_code_and_ext' => $filename,
                'account_id' => $userid
            ]);
        $stmt = $this->prepare($this->builder->write($query));
        $stmt->execute([':v1' => $filename, ':v2' => $userid]);
    }

}