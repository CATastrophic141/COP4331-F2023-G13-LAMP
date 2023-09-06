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
		$stmt = $conn->prepare(
		"SELECT ID,Name,Phone,Email FROM Contacts WHERE Name LIKE ? AND Phone LIKE ? AND Email LIKE ? AND UserID=?"
		);
		$contactName = "%" . $inData["searchName"] . "%";
		$contactPhone = "%" . $inData["searchPhone"] . "%";
		$contactEmail = "%" . $inData["searchEmail"] . "%";
		$stmt->bind_param("ssss", $contactName, $contactPhone, $contactEmail, $inData["userId"]);
		$stmt->execute();

		$result = $stmt->get_result();

		$searchResults = "";
		$searchCount = 0;

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"contactId":' . $row["ID"] . ',"name":"' . $row["Name"] . '","phone":"' . $row["Phone"] . '","email":"' . $row["Email"] . '"}';
		}

		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
		$retValue = '{"results":[],"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
