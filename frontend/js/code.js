const urlBase = 'http://COP4331-5.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	console.log(urlBase);
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLoginTest()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var testUserName = "testUser123";
	var testPassword = "Admin123";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	if (login == testUserName) {
		if (password == testPassword) {
			window.location.href = "search.html";
		}
		else{
			document.getElementById("loginResult").innerHTML = "Password is incorrect";
			console.log("Failed password verification");
		}
	}
	else {
		document.getElementById("loginResult").innerHTML = "Account username not found";
		console.log("Failed username verification");
	}
}

/*function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}*/

/*function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}*/

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	//document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	let newName = document.getElementById("contactNameText").value;
	let newPhone = document.getElementById("contactPhoneText").value;
	let newEmail = document.getElementById("contactEmailText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var table = document.getElementById("contactTable");

	let newContactJSON = {userId,userId,name:newName,phone:newPhone,email:newEmail};
	let jsonPayload = JSON.stringify( newContactJSON );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function addContactTest()
{
	let newName = document.getElementById("contactNameText").value;
	let newPhone = document.getElementById("contactNumberText").value;
	let newEmail = document.getElementById("contactEmailText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var table = document.getElementById("contactTable");

	let newContactJSON = {userId,userId,name:newName,phone:newPhone,email:newEmail};
	let jsonPayload = JSON.stringify( newContactJSON );

	console.log(newContactJSON);

	var newRow = document.createElement("tr");

	let isFirstProperty = true;

	 // Loop through the properties of the JSON object
	 for (var prop in newContactJSON) {
		if (isFirstProperty){
			isFirstProperty = false;
		} else {
		if (newContactJSON.hasOwnProperty(prop)) {
			var newCell = document.createElement("td");
			newCell.textContent = newContactJSON[prop];
			newRow.appendChild(newCell);
		}}
	}

	// Append the new row to the table body
	table.appendChild(newRow);

	addEditButtonToRow(newRow);
	addDeleteButtonToRow(newRow, table);

	/* --- ADD CODE FOR ADDING JSON OBJ TO TABLE --- */
 
	/*
	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	*/
}

function deleteContactTest(element)
{
	const currRow = element.parentNode.parentNode.rowIndex;
	const contactTable = document.getElementByID("contactTable");

	const rowData = contactTable.rows(currRow).cells;

	/*
	This could probably be simplified by using a global map that binds
	each loaded contact to its database ID, that way we could execute the
	DELETE query with only the contact ID and UserID
	*/
	let delName = rowData[0].innerHTML;
	let delPhone = rowData[1].innerHTML;
	let delEmail = rowData[2].innerHTML;

	let deleteContactJSON = {contactName:delName,contactPhone:delPhone,contactEmail:delEmail,userId:userId};
	let jsonPayload = JSON.stringify( deleteContactJSON );

	console.log(deleteContactJSON);

	let url = urlBase + '/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function ()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				console.log("Contact successfully deleted.");
				// Now we can delete the HTML row from the table
				contactTable.deleteRow(currRow);
			}
		};
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		// possibly add something to display error to user
		console.log(err.message);
	}
}

function editContactTest() {
	const currRow = element.parentNode.parentNode.rowIndex;
	const contactTable = document.getElementByID("contactTable");

	const rowData = contactTable.rows(currRow).cells;

	let delName = rowData[0].innerHTML;
	let delPhone = rowData[1].innerHTML;
	let delEmail = rowData[2].innerHTML;
}

function addDeleteButtonToRow(row, table) {
    const button = document.createElement("button");
    button.textContent = "Delete";
    
    // Get the row number
    const rowNumber = row.rowIndex;

	button.addEventListener("click", function() {
		table.removeChild(row);
		//DELETE DATA VIA API ////
	});

    const cell = row.insertCell();
    cell.appendChild(button);
}

function addEditButtonToRow(row) {
    const button = document.createElement("button");
    button.textContent = "Edit";
    
    // Get the row number
    const rowNumber = row.rowIndex;

	// Assign the function to the button's onclick event
    /*button.onclick = function () {
      // myButtonFunction(rowNumber); EDIT 
    };*/

    const cell = row.insertCell();
    cell.appendChild(button);
}


function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function searchContactTest()
{
	let searchStr = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	let contactList = "";

	let searchContactJSON = {search:searchStr,userId:userId};
	let jsonPayload = JSON.stringify( searchContactJSON );

	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact (s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );


				if (!jsonObject.error)
				{
					console.log(jsonObject.error)
					// TODO ADD HTML for displaying no records found error
				}
				else
				{
					let results = jsonObject.results;
					let tableRows = [];

					// loop through results
					for (let i = 0; i < results.length; i++)
					{
						let newRow = document.createElement("tr");

						// add each contact property to table row
						for (var prop in results[i])
						{
							if (prop !== "id" &&  results[i].hasOwnProperty(prop))
							{
								let newCell = document.createElement("td");
								newCell.textContent = results[i][prop];
								newRow.appendChild(newCell);
							}
						}
						// add new row to array
						tableRows.push(newRow);
					}

					// add rows to table
					for (let i = 0; i < tableRows.length; i++)
					{

					}
				}
			}
		};
	} catch (err) {

	}
}
