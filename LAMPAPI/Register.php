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
		$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, PhoneNumber, Email, Login, Password) VALUES (?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssss", $inData["firstName"], $inData["lastName"], $inData["phone"], $inData["email"], $inData["login"], $inData["password"]);

		if ($stmt->execute()) {
			$newUserId = $stmt->insert_id;

			returnWithInfo( $inData["firstName"], $inData["lastName"], $newUserId );
		} else {
			returnWithError("That login is already in use.");
		}

		$stmt->close();
		$conn->close();
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

	function returnWithError( $err )
	{
		$retValue = '{"userId":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $userId )
	{
		$retValue = '{"userId":' . $userId . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
