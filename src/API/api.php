<?php
namespace App\API;

require dirname(dirname(__DIR__)) . '/vendor/autoload.php';

use App\DAL\ConnectionWizard;
use \PDO;

$db = new \App\DAL\ConnectionWizard();
$connection = $db->getConnection();
$results = $connection->query("select t.name, v.theme_view_url, v.page_num, v.width as vW, v.height as vH, f.frame_position, f.width, f.height, f.top_offset, f.left_offset, f.angle
       from product_themes as t
join product_theme_views v on t.theme_id = v.theme_id
join product_theme_view_inner_frames f on v.product_theme_views_id = f.theme_view_id
where t.theme_id = 1
order by v.page_num");

$Json = array();
while ($view = $results->fetch(PDO::FETCH_ASSOC )) {
    $themeName = $view['name'];
    $pagenum = $view['page_num'];
    $position = $view['frame_position'];
    if(!isset($Json[$themeName])) {
        $Json[$themeName] = array();
    }
    if(!isset($Json[$themeName]['page'.$pagenum])) {
        $Json[$themeName]['page'.$pagenum] = array('width' => $view['vW'],
            'height' => $view['vH'], 'url' => dirname(dirname(__DIR__)) . '/' . $view['theme_view_url']);
    }
    if(!isset($Json[$themeName]['page'.$pagenum][$position])) {
        $Json[$themeName]['page'.$pagenum][$position] = array('width' => $view['width'],
            'height' => $view['height'], 'top' => $view['top_offset'], 'left' => $view['left_offset'], 'angle' => $view['angle']);
    }

};


header('Content-Type: application/json');
echo json_encode($Json);



