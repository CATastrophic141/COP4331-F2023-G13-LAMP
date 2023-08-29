const urlBase = 'http://contactmanager4331.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
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
	
				window.location.href = "./search.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function register(){
	let newLogin = document.getElementById("loginName").value;
	let newPassword = document.getElementById("loginPassword").value;
	if (newLogin != "" && newPassword != ""){ //Basic check
	/////////////CALL REGISTER PHP
	window.location.href = "./search.html";
	}
	else {
		var msg = document.getElementById("registerInstruction");
		msg.textContent = "Please enter a valid username and password in the login text fields"
		msg.style.color = "red";
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
			window.location.href = "./search.html";
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

function addContact()   //////Update or replace test with new implementaitons
{
	let newName = document.getElementById("contactNameText").value;
	let newPhone = document.getElementById("contactPhoneText").value;
	let newEmail = document.getElementById("contactEmailText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var table = document.getElementById("contactTable");

	let newContactJSON = {userId,userId,name:newName,phone:newPhone,email:newEmail};
	let jsonPayload = JSON.stringify( newContactJSON );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function makeTableRow(table, contactJSON){
	var newRow = document.createElement("tr");
	var isFirstProperty = true
	// Loop through the properties of the JSON object
	for (var prop in contactJSON) {
		if (isFirstProperty){
			isFirstProperty = false;
		} else {
		if (contactJSON.hasOwnProperty(prop)) {
			var newCell = document.createElement("td");
			newCell.textContent = contactJSON[prop];
			newRow.appendChild(newCell);
		}}
		}
	
	// Append the new row to the table body
	table.appendChild(newRow);
	
	addEditButtonToRow(newRow, userId, contactJSON["name"]);
	addDeleteButtonToRow(newRow, table);
}

function addContactTest() ///////MODIFY THIS FUNCTION TO TAKE OVER ACUTAL WHEN API CALL IS READY
{
	let newName = document.getElementById("contactNameText").value;
	let newPhone = document.getElementById("contactNumberText").value;
	let newEmail = document.getElementById("contactEmailText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var table = document.getElementById("contactTable");
	const whiteSpace = new RegExp(/^\s*$/);
	const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
	const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
	var errMsg = ""; //Err message builder
	var nameErr = false
	var phoneErr = false;
	var emailErr = false;

	if (whiteSpace.test(newName) || newName == ""){
		nameErr = true;
		errMsg = "Contact entry must have a name<br>"
	}
	if (!(phoneRegex.test(newPhone) || newPhone == "")) {
		phoneErr = true;
		errMsg = errMsg + " Phone number must match the following format: XXX-XXX-XXXX<br>";
	}
	if (!(emailRegex.test(newEmail) || newEmail == "")) {
		emailErr = true;
		errMsg = errMsg + " Email must match the following format: NAME@DOMAIN.XYZ<br>";
	}

	if (!nameErr && !phoneErr && !emailErr){
	let newContactJSON = {userId:userId,name:newName,phone:newPhone,email:newEmail};
	let jsonPayload = JSON.stringify( newContactJSON );
	//console.log(newContactJSON); //Debug
	makeTableRow(table, newContactJSON);
	}
	else {
		document.getElementById("addMsg").innerHTML = errMsg;
		if (nameErr){ 
			let Ename = document.getElementById("contactNameText");
			Ename.value = "";
		}
		if (phoneErr){
			let Ephone = document.getElementById("contactNumberText");
			Ephone.value = "";
		}
		if (emailErr) {
			let Eemail = document.getElementById("contactEmailText");
			Eemail.value = "";
		}
	}

	///////////////////////////* --- ADD CODE FOR ADDING JSON OBJ TO TABLE --- */
 
	///RESUSE AS SAMPLE OR REMOVE

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

function addDeleteButtonToRow(row, table) {
    const button = document.createElement("button");
    button.textContent = "Delete";
    
    // Get the row number
    const rowNumber = row.rowIndex;

	button.addEventListener("click", function() {
		table.removeChild(row);
		deleteContactDBEntry();///////////////////DELETE DATA VIA API ////
	});

    const cell = row.insertCell();
    cell.appendChild(button);
}

function addEditButtonToRow(row, userId, name) {
    const button = document.createElement("button");
    button.textContent = "Edit";
    
    // Get the row number
    const rowNumber = row.rowIndex;

	// Assign the function to the button's onclick event
    button.onclick = function () {
		addEditButtonFunctionality(userId, name);
    };

    const cell = row.insertCell();
    cell.appendChild(button);
}

function addEditButtonFunctionality(userId, name) {
	var editContactWindow = window.open("./edit_contact_window.html");

	var contactSearchResult = editContactWindow.document.createElement("span");
	contactSearchResult.id = "contactSearchResult";
	contactSearchResult.innerHTML = "";

	var contactAddResult = editContactWindow.document.createElement("span");
	contactAddResult.id = "contactAddResult";
	contactAddResult.innerHTML = "";

	var contactDeleteResult = editContactWindow.document.createElement("span");
	contactDeleteResult.id = "contactDeleteResult";
	contactDeleteResult.innerHTML = "";

	var editForm = editContactWindow.document.createElement("form");
	editForm.id = "editForm";

	let tmp = {userId:userId,search:name};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				editContactWindow.document.getElementById("contactSearchResult").innerHTML = "Contact has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				let contactId = jsonObject.results[0][0];
				let currName = jsonObject.results[0][1];
				let currPhone = jsonObject.results[0][2];
				let currEmail = jsonObject.results[0][3];

				var contIdField = editContactWindow.document.createElement("input");
				var editName = editContactWindow.document.createElement("input");
				editContactWindow.document.createElement("br");
				var editPhone = editContactWindow.document.createElement("input");
				editContactWindow.document.createElement("br");
				var editEmail = editContactWindow.document.createElement("input");
				editContactWindow.document.createElement("br");
				var editSubmit = editContactWindow.document.createElement("button");
				editContactWindow.document.createElement("br");

				contIdField.id = "contIdField";
				contIdField.type = "hidden";
				contIdField.value = contactId;

				editName.id = "editName";
				editName.type = "text";
				editName.value = currName;
				editName.placeholder = currName;

				editPhone.id = "editPhone";
				editPhone.type = "text";
				editPhone.value = currPhone;
				editPhone.placeholder = currPhone;

				editEmail.id = "editEmail";
				editEmail.type = "text";
				editEmail.value = currEmail;
				editEmail.placeholder = currEmail;

				editSubmit.id = "editSubmit";
				editSubmit.type = "submit";
				editSubmit.textContent = "Submit Edits";
				editSubmit.addEventListener( "click", submitEdits( 
					contactId, userId, editName.value, editPhone.value, editEmail.value 
					) 
				);

				editForm.appendChild(contIdField);
				editForm.appendChild(editName);
				editForm.appendChild(editPhone);
				editForm.appendChild(editEmail);
				editForm.appendChild(editSubmit);

				contactSearchResult.appendChild(editForm);

				editContactWindow.document.getElementById("editContactBody").appendChild(contactSearchResult);
				editContactWindow.document.getElementById("editContactBody").appendChild(contactAddResult);
				editContactWindow.document.getElementById("editContactBody").appendChild(contactDeleteResult);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

	editContactWindow.document.createElement("br");
	var returnToSearchPage = editContactWindow.document.createElement("button");
	returnToSearchPage.id = "returnToSearchPage";
	returnToSearchPage.type = "button";
	returnToSearchPage.textContent = "Return to Search Page";
	returnToSearchPage.addEventListener("click", function() {
		window.location.href = "./search.html";
	})
}

function submitEdits(contId, userId, editName, editPhone, editEmail) {
	let newContactJSON = {userId:userId,name:editName,phone:editPhone,email:editEmail};
	let jsonPayload = JSON.stringify( newContactJSON );

	let urlAdd = urlBase + '/AddContact.' + extension;
	let urlDel = urlBase + '/DeleteContact.' + extension;
	
	let xhrAdd = new XMLHttpRequest();
	xhrAdd.open("POST", urlAdd, true);
	xhrAdd.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhrAdd.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				console.log("Contact had been added");
			}
		};
		xhrAdd.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}


	let oldContactJSON = {contId:contId};
	let jsonDelPayload = JSON.stringify( oldContactJSON );

	let xhrDel = new XMLHttpRequest();
	xhrDel.open("POST", urlDel, true);
	xhrDel.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhrDel.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhrDel.send(jsonDelPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
}

/* function submitEdits(contId, userId, editName, editPhone, editEmail) {
	let newContactJSON = {userId:userId,name:editName,phone:editPhone,email:editEmail};
	let jsonPayload = JSON.stringify( newContactJSON );

	let urlAdd = urlBase + '/AddContact.' + extension;
	let urlDel = urlBase + '/DeletContact.' + extension;
	
	let xhrAdd = new XMLHttpRequest();
	xhrAdd.open("POST", urlAdd, true);
	xhrAdd.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhrAdd.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhrAdd.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}


	let oldContactJSON = {contId:contId};
	let jsonDelPayload = JSON.stringify( oldContactJSON );

	let xhrDel = new XMLHttpRequest();
	xhrDel.open("POST", urlDel, true);
	xhrDel.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhrDel.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhrDel.send(jsonDelPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
} */

function deleteContactDBEntry() {
	/*API CALL HERE*/
}

function searchColor() ///REPLACE OR REMOVE
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
