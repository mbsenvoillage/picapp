<?php
require dirname(__DIR__) . '/vendor/autoload.php';

use App\DAL\ConnectionWizard;

$db = new \App\DAL\ConnectionWizard();
$connection = $db->getConnection();
$results = $connection->query("select t.name, v.theme_view_url, v.page_num, v.width as vW, v.height as vH, f.frame_position, f.width, f.height, f.top_offset, f.left_offset, f.angle
       from product_themes as t
join product_theme_views v on t.theme_id = v.theme_id
join product_theme_view_inner_frames f on v.product_theme_views_id = f.theme_view_id
where t.theme_id = 1
order by v.page_num");

/*while ($row = $results->fetchAll(PDO::FETCH_CLASS)) {
    $data[] = $row;
}
$lastItemId = -1;
$aJson = array();
while ($row = GetNextRow()) {    // Depends on your class
    $itemID = $row['item_id'];
    if (!isset($aJson[$itemID])) {
        $aJson[$itemID] = array('item_id'=$itemID, 'item_name'=$row['item_name'], images=>array());
    }
    $aJson[$itemID]['images'] = array('image_id'=>$row['image_id'], 'image_url'=>$row['image_url']);

}
echo json_encode($aJson);
*/

//$results->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, \App\BO\ThemeView::class);

/*$Json = array();
while ($view = $results->fetch(PDO::FETCH_ASSOC)) {
    $themeName = $view['name'];
    $pagenum = $view['page_num'];
    $position = $view['frame_position'];
    if(!isset($Json[$themeName])) {
        $Json[$themeName] = array();
    }
    if(!isset($Json[$themeName]['page'.$pagenum])) {
        $Json[$themeName]['page'.$pagenum] = array('width' => $view['vW'], 'height' => $view['vH'], 'url' => dirname(__DIR__) . '/' . $view['theme_view_url']);
    }
    if(!isset($Json[$themeName]['page'.$pagenum][$position])) {
        $Json[$themeName]['page'.$pagenum][$position] = array('w' => $view['width'], 'h' => $view['height'], 'top' => $view['top_offset'], 'left' => $view['left_offset'], 'angle' => $view['angle']);
    }

};*/

//$j = json_encode($Json);

/*var_dump($views);*/
/*'http://' . $_SERVER['HTTP_HOST'] . '/' . $view->theme_view_url ;*/

/*echo json_encode($data);*/
/*var_dump($results->fetchAll());*/


//var_dump($j);

$view = $results->fetchAll(PDO::FETCH_ASSOC);
var_dump(json_encode($view));

?>

<?php /*var_dump($j[1]); */?>

<?php /*foreach ($views as $view) :*/?><!--

<?php /*/*var_dump($view);*/?>
            <h2>
                <a href="<?/*= $view->theme_view_url */?>"><?/*= $view->theme_view_url */?> <?/*= $view->page_num; */?></a>
            </h2>

            <p><?php /* */?></p>


        --><?php /*endforeach;*/?>


