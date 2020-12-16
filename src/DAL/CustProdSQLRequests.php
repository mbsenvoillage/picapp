<?php


namespace App\DAL;


abstract class CustProdSQLRequests
{
    public static $selectTheme = "select t.name, v.theme_view_url, v.page_num, v.width as vW, v.height as vH, f.frame_position, f.width, f.height, f.top_offset, f.left_offset, f.angle
       from product_themes as t
join product_theme_views v on t.theme_id = v.theme_id
join product_theme_view_inner_frames f on v.product_theme_views_id = f.theme_view_id
where t.theme_id = ?
order by v.page_num";

}