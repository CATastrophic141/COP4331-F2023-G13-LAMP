<?php
	require_once("Config.php");

	$inData = getRequestInfo();

	$conn = new mysqli(DB_HOSTNAME, DB_USER, DB_PASSWORD, DB_NAME);
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Users WHERE Login=? AND Password=?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			$stmt = $conn->prepare("UPDATE Users SET DateLastLoggedIn=CURRENT_TIMESTAMP WHERE ID=?");
			$stmt->bind_param("s", $row["ID"]);
			$stmt->execute();

			returnWithInfo( $row["FirstName"], $row["LastName"], $row["ID"] );
		}
		else
		{
			returnWithError("No Records Found");
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
