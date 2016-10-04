<?php
error_reporting(0);
require_once("creds.php");

$limitFrom = $_GET['lf'];
$limitTo = $_GET['lt'];

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli($databaseAddress, $userN, $obviously, $userN);
$conn->set_charset("utf8");

$result = $conn->query("
   SELECT * FROM 
      simpress_audio, simpress_files, simpress_node_revisions 
   WHERE 
      simpress_audio.fid=simpress_files.fid 
      AND
      simpress_audio.nid=simpress_node_revisions.nid
   LIMIT 
   ".$limitFrom.", ".$limitTo);

$output = "";

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    
   // My Custom JSON
   if (!$output) {$output = '{"records":['; }
      $output .= "\n\t{\n";
   foreach ($rs as $key=>$value) {
      $cleanValue = str_replace(array("\r\n","\n"), "", $value);
      $cleanValue = str_replace("\"","\\\"",$cleanValue);
      
      $output .= "\t\t".'"'.$key.'":"'.$cleanValue.'"'.",\n";
   }
    
   $output = substr($output, 0, -2);
   $output .= "\n\t},\n";
}

$output = substr($output, 0, -2);

if ($output) {
      $output .= "\n]}";
}

$conn->close();

echo( $output );
?>
