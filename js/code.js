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

	let hash = CryptoJS.SHA512(password).toString();
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:hash};
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

				//saveCookie();
	
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
		let hash = CryptoJS.SHA512(newPassword).toString();
		let newUserJSON = {firstName:newUserFirstName,lastName:newUserLastName,phone:newUserPhone,email:newUserEmail,login:newUsername,password:hash};
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

/*function doLoginTest()
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
}*/

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
	window.location.href = "./index.html";
}

function makeTableRow(table, contactJSON){
	let newRow = table.insertRow(-1);
    let contactID = contactJSON["contactId"]; // Access contact ID property directly

    // Add Name
    let nameCell = newRow.insertCell(0);
    nameCell.setAttribute('data-id', contactID);
    nameCell.innerText = contactJSON["name"];

    // Add Phone
    let phoneCell = newRow.insertCell(1);
    phoneCell.setAttribute('data-id', contactID);
    phoneCell.innerText = contactJSON["phone"];

    // Add Email
    let emailCell = newRow.insertCell(2);
    emailCell.setAttribute('data-id', contactID);
    emailCell.innerText = contactJSON["email"];
	
	addEditButtonToRow(newRow, userId);
	addDeleteButtonToRow(newRow);
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

function addContact() 
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

function deleteContact(element)
{
	const currRow = element.parentNode.parentNode.rowIndex;
	const contactTable = document.getElementByID("contactTable");

	const rowData = contactTable.rows(currRow).cells;

	let delID = rowData[0].getAttribute("data-id");

	let deleteContactJSON = {contactID:delID};
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

function addDeleteButtonToRow(row) {
    const button = document.createElement("button");
    button.textContent = "Delete";

	button.addEventListener("click", function() {
		deleteContact(button);
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

function addEditButtonFunctionality(userId, name, phone, email) {
	location.href = './edit_contact.html?userId='+userId.toString()+
					'&name='+name+'&phone='+phone+'&email='+email;
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

function goToSearchPage() { //Lol //Lol
	location.href = "./search.html";
}

function submitEdits() {
	var contId = document.getElementById('contactIdField').value;
	var editName = document.getElementById('nameField').value;
	var editPhone = document.getElementById('phoneField').value;
	var editEmail = document.getElementById('emailField').value;

	let newContactJSON = {contactName:editName,contactPhone:editPhone,contactEmail:editEmail,contactId:contId};
	let jsonPayload = JSON.stringify( newContactJSON );

	let urlUpdate = urlBase + '/UpdateContact.' + extension;
	
	let xhrUpdate = new XMLHttpRequest();
	xhrUpdate.open("POST", urlUpdate, true);
	xhrUpdate.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhrUpdate.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact Update Result: updated";
				console.log("Contact has been updated");
			}
		};
		xhrUpdate.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = "Contact Update Result: " + err.message;
	}
}


/** I don't think we need this function anymore, deleteContact() does all the work */
function deleteContactDBEntry(row) {
	/* Get the Contact ID of the Contact to be deleted from the hidden input field of 
	the current table row. */
	// TODO: FIND A LEGIT WAY TO GET THE CONTACT ID, OR UPDATE DELETE.PHP TO ALLOW DELETING BY NAME/PHONE/EMAIL */
	let contactIdToDelete = row.cells[0].getAttribute("data-id");
	
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

function searchContact()
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
		document.getElementById("contactSearchResult").style = "color:red;";
	}
}
