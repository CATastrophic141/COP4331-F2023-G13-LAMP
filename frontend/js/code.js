const urlBase = 'http://contactmanager4331.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

/* We can use the first and last name of the user to add a personalized greeting */
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

function showRegister(element) {

	if (element.innerHTML == "Sign Up") {
		document.getElementById("nameFields").style.display = 'flex';
		document.getElementById("registerPhone").style.display = 'block';
		document.getElementById("registerEmail").style.display = 'block';
		document.getElementById("registerButton").style.display = 'block';
		document.getElementById("loginButton").style.display = 'none';
		document.getElementById("inner-title").innerHTML = "Fill out the fields below, then click \"Create Account\".";
		document.getElementById("registerText").innerHTML = "Already have an Account?";
		document.getElementById("signUpButton").innerHTML = "Log In";
	} else {
		document.getElementById("nameFields").style.display = 'none';
		document.getElementById("registerPhone").style.display = 'none';
		document.getElementById("registerEmail").style.display = 'none';
		document.getElementById("registerButton").style.display = 'none';
		document.getElementById("loginButton").style.display = 'block';
		document.getElementById("inner-title").innerHTML = "LOG IN";
		document.getElementById("registerText").innerHTML = "Not registered yet?";
		document.getElementById("signUpButton").innerHTML = "Sign Up";
	}
}

function showRegister(element) {

	if (element.innerHTML == "Sign Up") {
		document.getElementById("nameFields").style.display = 'flex';
		document.getElementById("registerPhone").style.display = 'block';
		document.getElementById("registerEmail").style.display = 'block';
		document.getElementById("registerButton").style.display = 'block';
		document.getElementById("loginButton").style.display = 'none';
		document.getElementById("inner-title").innerHTML = "Fill out the fields below, then click \"Create Account\".";
		document.getElementById("registerText").innerHTML = "Already have an Account?";
		document.getElementById("signUpButton").innerHTML = "Log In";
	} else {
		document.getElementById("nameFields").style.display = 'none';
		document.getElementById("registerPhone").style.display = 'none';
		document.getElementById("registerEmail").style.display = 'none';
		document.getElementById("registerButton").style.display = 'none';
		document.getElementById("loginButton").style.display = 'block';
		document.getElementById("inner-title").innerHTML = "LOG IN";
		document.getElementById("registerText").innerHTML = "Not registered yet?";
		document.getElementById("signUpButton").innerHTML = "Sign Up";
	}
}

function register(){
	let newUserFirstName = document.getElementById("registerFirstName").value;
	let newUserLastName = document.getElementById("registerLastName").value;
	let newPassword = document.getElementById("registerPassword").value;
	let newUsername = document.getElementById("registerUsername").value;
	let newUserPhone = document.getElementById("registerPhone").value;
	let newUserEmail = document.getElementById("registerEmail").value;

	firstName = newUserFirstName;
	lastName = newUserLastName;

	const nameRegex = new RegExp(/^[a-zA-z]+$/);
	const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
	const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

	if (newLogin != "" && newPassword != "" && nameRegex.test(newUserFirstName) && nameRegex.test(newUserLastName) && (emailRegex.test(newUserEmail)) && phone.test(newUserPhone) ){ //Basic check
		
		//I Don't think we need to go too deep into the entry errors right now. We just care about there being something in there.
		//First and last name information is *not* used, so it doesn't matter

		/*if (nameRegex.test(newUserFirstName) === false) {
			var firstNameErrMsg = document.getElementById("registerInstruction");
			firstNameErrMsg.textContent = "Please enter a valid first name";
			firstNameErrMsg.style.color = "red";
		}
		else if (nameRegex.test(newUserLastName) === false) {
			var lastNameErrMsg = document.getElementById("registerInstruction");
			lastNameErrMsg.textContent = "Please enter a valid last name";
			lastNameErrMsg.style.color = "red";
		}
		else if (phoneRegex.test(newUser) === false) {
			var phoneErrMsg = document.getElementById("registerInstruction");
			phoneErrMsg.textContent = "Please enter a valid phone number. It should be of the format XXX-XXX-XXXX where the X's are 1-digit numbers";
			phoneErrMsg.style.color = "red";
		}
		else if (emailRegex.test(newUserEmail) === false) {
			var emailErrMsg = document.getElementById("registerInstruction");
			emailErrMsg.textContent = "Please enter a valid email. It should be of the format something@someEmail.com";
			emailErrMsg.style.color = "red";
		}*/

		///CALL REGISTER PHP
		let newUserJSON = {firstName:newUserFirstName,lastName:newUserLastName,phone:newUserPhone,email:newUserEmail,login:newUsername,password:newPassword};
		let jsonPayload = JSON.stringify( newUserJSON );
		let url = urlBase + '/Register.' + extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			//No return necessary. Move on
			xhr.send(jsonPayload);
			window.location.href = "./search.html";
		}
		catch(err)
		{
			document.getElementById("registerInstruction").innerHTML = err.message;
		}
	}
	else {
		var msg = document.getElementById("registerInstruction");
		msg.textContent = "Please enter valid credentials";
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

	let newContactJSON = {userId:userId,name:newName,phone:newPhone,email:newEmail};
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
	let newRow = table.insertRow(-1);
    let contactID = contactJSON["contact ID"]; // Access contact ID property directly

    // Add Name
    let nameCell = newRow.insertCell(0);
    nameCell.setAttribute('data-id', contactID);
    nameCell.innerText = contactJSON["Name"];

    // Add Phone
    let phoneCell = newRow.insertCell(1);
    phoneCell.setAttribute('data-id', contactID);
    phoneCell.innerText = contactJSON["Phone"];

    // Add Email
    let emailCell = newRow.insertCell(2);
    emailCell.setAttribute('data-id', contactID);
    emailCell.innerText = contactJSON["Email"];
	
	addEditButtonToRow(newRow, userId, contactJSON["name"]);
	addDeleteButtonToRow(newRow, table);
}

function makeFakeContact() // for testing adding table rows REMOVE FOR PRODUCTION
{
	let fakeData = "{\n" +
		"  \"results\": [\n" +
		"    {\n" +
		"      \"contactID\": 51,\n" +
		"      \"Name\": \"Kelley Wiegand\",\n" +
		"      \"Phone\": \"948-506-7645\",\n" +
		"      \"Email\": \"Kelley.Wiegand9@gmail.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 52,\n" +
		"      \"Name\": \"Amelie Mills\",\n" +
		"      \"Phone\": \"160-862-5831\",\n" +
		"      \"Email\": \"Amelie.Mills@yahoo.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 53,\n" +
		"      \"Name\": \"Josephine Ruecker\",\n" +
		"      \"Phone\": \"345-049-2473\",\n" +
		"      \"Email\": \"Josephine_Ruecker@yahoo.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 54,\n" +
		"      \"Name\": \"Claud Schumm\",\n" +
		"      \"Phone\": \"051-460-7174\",\n" +
		"      \"Email\": \"Claud42@gmail.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 55,\n" +
		"      \"Name\": \"Lura Wisoky\",\n" +
		"      \"Phone\": \"212-812-1159\",\n" +
		"      \"Email\": \"Lura.Wisoky@yahoo.com\"\n" +
		"    }\n" +
		"  ],\n" +
		"  \"error\": \"\"\n" +
		"}"

	let testContacts = JSON.parse(fakeData);
	console.log(testContacts);
	let table = document.getElementById("contactTable");

	if (testContacts.results) {
		for (let i = 0; i < testContacts.results.length; i++) {
			makeTableRow(table, testContacts.results[i]);
		}
	}
}

function makeFakeContact() // for testing adding table rows REMOVE FOR PRODUCTION
{
	let fakeData = "{\n" +
		"  \"results\": [\n" +
		"    {\n" +
		"      \"contactID\": 51,\n" +
		"      \"Name\": \"Kelley Wiegand\",\n" +
		"      \"Phone\": \"948-506-7645\",\n" +
		"      \"Email\": \"Kelley.Wiegand9@gmail.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 52,\n" +
		"      \"Name\": \"Amelie Mills\",\n" +
		"      \"Phone\": \"160-862-5831\",\n" +
		"      \"Email\": \"Amelie.Mills@yahoo.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 53,\n" +
		"      \"Name\": \"Josephine Ruecker\",\n" +
		"      \"Phone\": \"345-049-2473\",\n" +
		"      \"Email\": \"Josephine_Ruecker@yahoo.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 54,\n" +
		"      \"Name\": \"Claud Schumm\",\n" +
		"      \"Phone\": \"051-460-7174\",\n" +
		"      \"Email\": \"Claud42@gmail.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 55,\n" +
		"      \"Name\": \"Lura Wisoky\",\n" +
		"      \"Phone\": \"212-812-1159\",\n" +
		"      \"Email\": \"Lura.Wisoky@yahoo.com\"\n" +
		"    }\n" +
		"  ],\n" +
		"  \"error\": \"\"\n" +
		"}"

	let testContacts = JSON.parse(fakeData);
	console.log(testContacts);
	let table = document.getElementById("contactTable");

	if (testContacts.results) {
		for (let i = 0; i < testContacts.results.length; i++) {
			makeTableRow(table, testContacts.results[i]);
		}
	}
}

function addContactTest() 
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
					let jsonObject = JSON.parse( xhr.responseText );
					let tableRow = {contactID:jsonObject.contactID,name:newName,phone:newPhone,email:newEmail}
					document.getElementById("contactAddResult").innerHTML = "Color has been added";
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("contactAddResult").innerHTML = err.message;
		}
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
}

function deleteContactTest(element)
{
	const currRow = element.parentNode.parentNode.rowIndex;
	const contactTable = document.getElementByID("contactTable");

	const rowData = contactTable.rows(currRow).cells;

	let delID = rowData[0].getAttribute("data-id");

	let deleteContactJSON = {contactID:delID};
	let jsonPayload = JSON.stringify( deleteContactJSON );

	console.log(deleteContactJSON);

	// Todo: Update either DeleteContact.php or the JSON object passed to it, as right now DeleteContact.php deletes based on contact ID
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
		deleteContactDBEntry(row, rowNumber);
		table.removeChild(row);///////////////////DELETE DATA VIA API
		table.removeChild(row);///////////////////DELETE DATA VIA API
	});

    const cell = row.insertCell();
    cell.appendChild(button);
}

function addEditButtonToRow(row, userId) {
    const button = document.createElement("button");
    button.textContent = "Edit";

	let name = row.cells[0].innerHTML;
	let phone = row.cells[1].innerHTML;
	let email = row.cells[2].innerHTML;

	// Assign the function to the button's onclick event
    button.onclick = function () {	
		addEditButtonFunctionality(userId, name, phone, email);
    };

    const cell = row.insertCell();
    cell.appendChild(button);
}

// Todo: figure out why this doesn't work! Field values on edit_contact_... .html are not altered on entry.
function addEditButtonFunctionality(userId, name, phone, email) {
	location.href = './edit_contact_refactored.html?userId='+
					userId.toString()+'&name='+name+'&phone='+
					phone+'&email='+email;
}


function populateEditPage() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());

	//console.log("In Edit Window");	//Debug

	let userIdField = document.getElementById("userIdField");
	userIdField.value = params.userId;
	console.log("userIdField value is " + params.userId);	//Debug <---THIS NOT BEING CALLED FOR SOME REASON!!!

	let nameField = document.getElementById("nameField");
	nameField.value = params.name;
	console.log("nameField value is " + params.name);	//Debug <---THIS NOT BEING CALLED!!!

	let phoneField = document.getElementById("phoneField");
	phoneField.value = params.phone;

	let emailField = document.getElementById("emailField");
	emailField.value = params.email;

	let contactToEdit = {searchName:params.name, searchNumber:params.phone, searchEmail:params.email, userId:params.userId};
	var jsonPayload = JSON.stringify( contactToEdit );

	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				
				var contactId = jsonObject["contactId"];
				console.log("contactId = " + contactId.toString() +"\n");

				/** Add the correct Contact ID field to the hidden contact ID field in the document. **/
				var contactIdField = document.getElementById("contactIdField");
				contactIdField.value = contactId.toString();
			}
		};
		xhr.send(jsonPayload);
		console.log("JSON Payload sent");
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err;
	}
}

/* Caleb, would you mind adding documentation to this function? It is fairly obtuse and I am having trouble folowing some parts of it */
/* Sure thing! I'll try. */
/** Update (Su. 9/3/2023): I commented out this function so that the refactored version above can work properly. However,
 *  it seems like we may end up needing to use this version of the function, since the above function does not seem to accept 
 *  arguments from the previous page. Perhaps that could be solved with a cookie?
 */
/* <-----------------------Block comment begins
function addEditButtonFunctionality(userId, name, phone, email) {
	var editContactWindow = window.self;	// Another way of referring to the current window

	// Delete anything that is currently on the page so that it can be repopulated with the appropriate elements.
	if (editContactWindow.document !== null || editContactWindow.document.getElementsByTagName('head') !== null) {
		editContactWindow.document.documentElement.remove();	// Remove everything in the HTML document
		/* NOTE: this may remove too much; I may have to replace it with document.querySelector.remove()
		/* NOTE: this may remove too much; I may have to replace it with document.querySelector.remove()
		   (which might have a similar effect) or document.head.innerHTML = null */
		/* NOTE: this may remove too much; I may have to replace it with document.querySelector.remove() 
		   (which might have a similar effect) or document.head.innerHTML = null */ /* <--------------------Block comment begins
	}
	var editWindowHTMLString = "";

	//console.log("Created editContactWindow. It is " + editContactWindow.nodeName + "\n");	//Debug

	// Create 'edit_contact.html' head section, and the start of its 'body' section.
	editWindowHTMLString += "<head>\n" +
							"<title>Squire Contact Repository</title>\n" +
							"<script type='text/javascript' src='../js/code.js'></script>\n" +
							"<link href='../css/styles_searchPage.css' rel='stylesheet'>\n" +
							"<link href='../css/styles_searchPage.css' rel='stylesheet'>\n" +
							"<link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet'>\n" +
							"\n" +
							"<script type='text/javascript'>\n" +
							"document.addEventListener('DOMContentLoaded', function() \n" +
							"{\n"+
								"//readCookie();\n"+
							"}, false);\n" +
							"</script>\n" +
							"</head>\n"+
							"<body id='editContactBody'>\n"+
							"<h1 id='editWindowTitle'>Edit Contact</h1><br/>\n"+
							"<p id='contactSearchResult'>Contact Search Result: N/a</p>\n"+
							"<p id='contactAddResult'>Contact Add Result: N/a</p>\n"+
							"<p id='contactDeleteResult'>Contact Delete Result: N/a</p>\n"+
							"\n";
	/** This should now give us the start of the HTML document that we need to have a custom 'EDIT CONTACT' page. **/

	/** Add the hidden User ID field to the super-string that will be used to populate the custom 
	 * 'EDIT CONTACTS' HTML document. **/ /* <----------------------------------------Block comment begins
	let userIdField = "<input id='userIdField' type='hidden' value='" + toString(userId) + "'><br/>\n";

	/** Get the contact's Contact ID using a SearchContacts API call **/
	// ------------------------------------------------------------------------------------------------
	/* <------------------------------------------------------------------------------Block comment begins
	let contactToEdit = {searchName:name, searchNumber:phone, searchEmail:email, userId:userId};
	var jsonPayload = JSON.stringify( contactToEdit );

	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				editWindowHTMLString.replace("<p id='contactSearchResult'>Contact Search Result: N/a</p>",
												"<p id='contactSearchResult'>Contact has been retrieved</p>");

				let jsonObject = JSON.parse( xhr.responseText );
				
				var contactId = jsonObject["contactId"];
				console.log("contactId = " + contactId +"\n");
				let currName = jsonObject["name"];
				console.log("currName = " + currName +"\n");
				let currPhone = jsonObject["phone"];
				console.log("currPhone = " + currPhone +"\n");
				let currEmail = jsonObject["email"];
				console.log("contactId = " + currEmail +"\n");

				
				/** Add the hidden Contact ID field to the document. **/
				/* <-------------------------------------------------------------------Block comment begins
				var contIdField = "<input id='contIdField' type='hidden' value='" + toString(contId) + "'><br/>\n";

				/** Now, add the two hidden fields (User ID and Contact ID) to the document! **/
				/* <-------------------------------------------------------------------Block comment begins
				editWindowHTMLString += userIdField + contIdField;
			}
		};
		xhr.send(jsonPayload);
		console.log("JSON Payload sent");
	}
	catch(err)
	{
		editWindowHTMLString.replace("<p id='contactSearchResult'>Contact Search Result: N/a</p>",
												toString(err.message));
	}
	// ^^ End getting contact's Contact ID using SearchContacts API call ^^
	// -------------------------------------------------------------------------------------------------

	/** Add the Name, Phone Number, and Email fields, below the hidden User ID and 
	 * Contact ID fields on the HTML 'EDIT CONTACTS' page. **/
	/* <-------------------------------------------------------------------------------Block comment begins
	let editName = "<input id='editName' type='text' value='" + currName + "'><br/>\n";
	let editPhone = "<input id='editPhone' type='text' value='" + currPhone + "'><br/>\n";
	let editEmail = "<input id='editEmail' type='text' value='" + currEmail + "'><br/>\n";
	let editSubmit = "<button id='editSubmit' type='submit'" +
						"onclick='submitEdits();'>Submit Edits</button></br>\n";

	editWindowHTMLString += editName + editPhone + editEmail + editSubmit + "<br />";

	/** Add a button to allow RETURNING TO THE SEARCH PAGE below the 'SUBMIT EDITS' button. **/
	/* <-------------------------------------------------------------------------------Block comment begins
	let returnToSearchPage = "<button id='returnToSearchPage' type='button'" +
								" onclick='goToSearchPage()'>Return to Search Page</button>\n";
	editWindowHTMLString += returnToSearchPage;
	editWindowHTMLString += "\n\n"
	let endOfHTMLPage = "</body>\n</html>\n";


	editWindowHTMLString += endOfHTMLPage;

	/** WRITE ALL THE CONTENTS OF THE PAGE TO THE ACTUAL HTML PAGE ('edit_contact.html')!!! **/
	/* <-------------------------------------------------------------------------------Block comment begins
	editContactWindow.document.write(editWindowHTMLString);

	/** Close the document-writing process to allow the buttons on the page to do what
	 * what they're actually supposed to do (run their scripts). **/
	/* <-------------------------------------------------------------------------------Block comment begins
	editContactWindow.document.close();	
}
*/

function goToSearchPage() { //Lol //Lol
	location.href = "./search.html";
}

/** Caleb: I could probably edit this function to just use the UpdateContact API call, and I plan on doing that in 
 * my next commit. 
 * --------------------------------------------------------------------------------------------------------------- **/
function submitEdits() {
	var contId = document.getElementById('contIdField');
	var userId = document.getElementById('userIdField');
	var editName = document.getElementById('editName');
	var editPhone = document.getElementById('editPhone');
	var editEmail = document.getElementById('editEmail');

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

function deleteContactDBEntry(row) {
	/* Get the Contact ID of the Contact to be deleted from the hidden input field of 
	the current table row. */
	// TODO: FIND A LEGIT WAY TO GET THE CONTACT ID, OR UPDATE DELETE.PHP TO ALLOW DELETING BY NAME/PHONE/EMAIL */
	let contactIdToDelete = row.item(0).value;
	
	let urlDel = urlBase + "/DeleteContact." + extension;

	let delContactJSON = {contactId:contactIdToDelete};
	let jsonDelPayload = JSON.stringify( delContactJSON );

	/*API CALL HERE*/
	let xhrDel = new XMLHttpRequest();
	xhrDel.open("POST", urlDel, true);
	xhrDel.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhrDel.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("Contact has been deleted");
			}
		};
		xhrDel.send(jsonDelPayload);
	}
	catch(err)
	{
		console.log(err.message);
	}
}

function searchContactTest()
{
	let nameSearch = document.getElementById("nameSearch").value;
	let numberSearch = document.getElementById("numberSearch").value;
	let emailSearch = document.getElementById("emailSearch").value;
	document.getElementById("contactSearchResult").innerHTML = "";


	let searchContactJSON = {searchName:nameSearch,searchPhone:numberSearch,searchEmail:emailSearch,userId:userId};
	let jsonPayload = JSON.stringify( searchContactJSON );

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
				let jsonObject = JSON.parse( xhr.responseText );

				if (jsonObject.error === "")
				{
					document.getElementById("contactSearchResult").innerHTML = "Contact (s) has been retrieved";
					let results = jsonObject.results;
					var table = document.getElementById("contactTable");

					// loop through results
					for (let i = 0; i < results.length; i++)
					{
						makeTableRow(table, results[i]);
					}

				}
				else
				{
					console.log(jsonObject.error)
					document.getElementById("contactSearchResult").innerHTML = jsonObject.error;
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}
