<?php

    //use App\DAL\ConnectionWizard;
use App\DAL\ConnectionWizard;

//include('../src/DAL/ConnectionWizard.php');
    $CW = new ConnectionWizard();
    $connec = $CW->getConnection();

    $query = "select * from users";
    $result = $connec->query($query);

    $Numrows = $result->num_rows;

    for ($i = 0; $i < $Numrows; $i++) {
        $row = $result->fetch_assoc();
        $data[] = $row;
    }

    foreach ($data as $d) {
        echo $d['first_name'];
        echo $d['last_name'];
    }

echo 'hello';
?>

