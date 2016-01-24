

<?php

if ($_POST['par']== 'b') {
	$file = 'EmpDB.json';
	$json_data = file_get_contents($file);
	$json = json_decode($json_data);
	foreach ($json as $key) {
		if ($key['txt1']==$_POST['json']) {
			unset ($json[$key]);
		}
		file_put_contents($file, json_encode($json));
	}
	//$json = json_encode($json);
}

if ($_POST['par']== 'del') {
	$file = fopen('EmpDB.json', 'w') ;

	$str=file_get_contents('EmpDB.json');
	$str=str_replace("]]", "]",$str);
	$str=str_replace("[[", "[",$str);
	file_put_contents('EmpDB.json', $str);
	$json =$_POST['json'];

	fwrite($file, $json);
	fclose($file);	
}
if ($_POST['par']== 'edit') {
	$file = fopen('EmpDB.json', 'w') ;

	$str=file_get_contents('EmpDB.json');
	$str=str_replace("]]", "]",$str);
	$str=str_replace("[[", "[",$str);
	file_put_contents('EmpDB.json', $str);
	$json =$_POST['json'];

	fwrite($file, $json);
	fclose($file);	
}
else
{	
	$file = fopen('EmpDB.json', 'a') ;
	if (filesize('EmpDB.json') == 0){
		$json ="[" . $_POST['json'] ."]" ;
	}
	else
	{
		$str=file_get_contents('EmpDB.json');
		$str=str_replace("]", ",",$str);
		file_put_contents('EmpDB.json', $str);
		$json =$_POST['json'] ."]" ;
	}
	fwrite($file, $json);
	fclose($file);
}

?>
