
<?php

/*use App\DAL\ConnectionWizard;*/

/*$wizard = new App\DAL\ConnectionWizard;

$connection = $wizard->getConnection();

if ($result = $connection->query("SELECT * FROM user_account_original_pictures")) {
    printf("Select returned %d rows.\n", $result->num_rows);
    $result->close();
} else {
    printf("error");
}

*/

require 'ConnectionWizard.php';


$wizard = (new App\DAL\ConnectionWizard);
$connection = $wizard->getConnection();
if ($result = $connection->query("SELECT * FROM user_account_original_pictures")) {
    printf("Select returned %d rows.\n", $result->num_rows);
    while($row = mysqli_fetch_row($result)) {
        echo $row['column_name']; // Print a single column data
        echo print_r($row);
    }
    $result->close();
} else {
    printf("error");
}


require '../src/DAL/ConnectionWizard.php';

$wizard = (new App\DAL\ConnectionWizard);
$pic = [];
//var_dump($wizard);
$connection = $wizard->getConnection();
if ($result = $connection->query("SELECT * FROM user_account_original_pictures")) {
    var_dump("Select returned %d rows.\n", $result->num_rows);
    while ($row = mysqli_fetch_row($result)) {
        array_push($pic, $row[3]); // Print a single column data
        //echo print_r($row);
    }
    $result->close();
} else {
    printf("error");
}

echo "this is how many pics i have :" . count($pic);

echo '<img src="data:image/jpg;base64,' . bas

?>
