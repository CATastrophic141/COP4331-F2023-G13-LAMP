<?php
	require_once("Config.php");

	$inData = getRequestInfo();
	
	$conn = new mysqli(DB_HOSTNAME, DB_USER, DB_PASSWORD, DB_NAME);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId,Name,Phone,Email) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $inData["userId"], $inData["contactName"], $inData["contactPhone"], $inData["contactEmail"]);
		if( $stmt->execute() )
		{

		};

        $last_insert_id = $stmt->insert_id;
		$stmt->close();
		$conn->close();
		returnWithInfo("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents("php://input"), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header("Content-type: application/json");
		echo $obj;
	}
	
	function returnWithInfo( $id )
	{
		$retValue = '{"id":' . $id . '"}';
		sendResultInfoAsJson( $retValue );
	}


	
?>