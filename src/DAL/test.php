
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

?>
