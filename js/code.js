const urlBase = 'http://contactmanager4331.online/LAMPAPI/';

const nameRegex = new RegExp(/^[a-zA-z]+$/);
const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

var USER_INFO = {
	userId: 0,
	firstName: "",
	lastName: ""
}

function sendPostRequest(endPoint, request, onSuccess, onError) {
	let url = urlBase + endPoint + '.php';
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(xhr.responseText);

				if (response.error !== "") {
					onError({ message: response.error });
				}
				else {
					onSuccess(response);
				}
			}
		};
		xhr.send(JSON.stringify(request));
	}
	catch (err) {
		onError(err);
	}
}

function buttonSearchPage() {
	USER_INFO.userId = 1;
	USER_INFO.firstName = "Joey";
	USER_INFO.lastName = "Crown";
	saveCookie();
	goToSearchPage();
}

function makeFakeContact() // for testing adding table rows REMOVE FOR PRODUCTION
{
	let fakeData = "{\n" +
		"  \"results\": [\n" +
		"    {\n" +
		"      \"contactID\": 51,\n" +
		"      \"name\": \"Kelley Wiegand\",\n" +
		"      \"phone\": \"948-506-7645\",\n" +
		"      \"email\": \"Kelley.Wiegand9@gmail.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 52,\n" +
		"      \"name\": \"Amelie Mills\",\n" +
		"      \"phone\": \"160-862-5831\",\n" +
		"      \"email\": \"Amelie.Mills@yahoo.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 53,\n" +
		"      \"name\": \"Josephine Ruecker\",\n" +
		"      \"phone\": \"345-049-2473\",\n" +
		"      \"email\": \"Josephine_Ruecker@yahoo.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 54,\n" +
		"      \"name\": \"Claud Schumm\",\n" +
		"      \"phone\": \"051-460-7174\",\n" +
		"      \"email\": \"Claud42@gmail.com\"\n" +
		"    },\n" +
		"    {\n" +
		"      \"contactID\": 55,\n" +
		"      \"name\": \"Lura Wisoky\",\n" +
		"      \"phone\": \"212-812-1159\",\n" +
		"      \"email\": \"Lura.Wisoky@yahoo.com\"\n" +
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

function doLogin() {
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	let hash = CryptoJS.SHA512(password).toString();

	document.getElementById("loginResult").innerHTML = "";

	let request = {
		login: login,
		password: hash
	};

	sendPostRequest("Login", request, function (response) {
		USER_INFO.userId = response.userId;
		USER_INFO.firstName = response.firstName;
		USER_INFO.lastName = response.lastName;

		saveCookie();
		goToSearchPage();
	}, function (err) {
		if (err.message === "No Records Found") {
			err.message = "User/Password combination incorrect";
		}
		document.getElementById("loginResult").innerHTML = err.message;
	})
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

function register() {
	let newUserFirstName = document.getElementById("registerFirstName").value;
	let newUserLastName = document.getElementById("registerLastName").value;
	let newPassword = document.getElementById("loginPassword").value;
	let newUsername = document.getElementById("loginName").value;
	let newUserPhone = document.getElementById("registerPhone").value;
	let newUserEmail = document.getElementById("registerEmail").value;

	firstName = newUserFirstName;
	lastName = newUserLastName;

	// If fails input constraints
	if (!(newUsername != "" && newPassword != "" && nameRegex.test(newUserFirstName) && nameRegex.test(newUserLastName) && (emailRegex.test(newUserEmail)) && phoneRegex.test(newUserPhone))) {
		var msg = document.getElementById("registerInstruction");
		msg.textContent = "Please enter valid credentials";
		msg.style.color = "red";
	}

	let hash = CryptoJS.SHA512(newPassword).toString();
	let request = {
		firstName: newUserFirstName,
		lastName: newUserLastName,
		phone: newUserPhone,
		email: newUserEmail,
		login: newUsername,
		password: hash
	};

	sendPostRequest("Register", request, function (response) {
		USER_INFO.userId = response.userId;
		USER_INFO.firstName = response.firstName;
		USER_INFO.lastName = response.lastName;

		saveCookie();
		goToSearchPage();
	}, function (err) {
		document.getElementById("registerInstruction").innerHTML = err.message;
	});
}

function saveCookie() {
	let expiry_time = 20 * 60 * 1000; // 20 minutes
	let date = new Date();
	date.setTime(date.getTime() + expiry_time);
	document.cookie = "userInfo=" + JSON.stringify(USER_INFO) + ";expires=" + date.toGMTString();
	console.log("Saving cookie: " + document.cookie);
}

function readCookie() {
	if (document.cookie === "") {
		console.log("Reading cookie: NONE");
		window.location.href = "index.html";
		return;
	}

	USER_INFO = JSON.parse(document.cookie.split("=")[1]);
	console.log("Reading cookie: " + document.cookie);
}

function doLogout() {
	USER_INFO = {
		userId: 0,
		firstName: "",
		lastName: ""
	}

	saveCookie();
	window.location.href = "./index.html";
}

function makeTableRow(table, contactJSON) {
	let newRow = table.insertRow(-1);
	let contactID = contactJSON["contactId"];
	let cellData = [contactJSON["name"], contactJSON["phone"], contactJSON["email"]];

	for (let i = 0; i < 3; i++) {
		let cell = newRow.insertCell(i);
		cell.setAttribute('data-id', contactID);
		cell.innerText = cellData[i];
	}

	newRow.addEventListener("mouseover", function () {
		newRow.classList.add("active");
	});
	newRow.addEventListener("mouseout", function () {
		newRow.classList.remove("active");
	});

	addEditButtonToRow(newRow, USER_INFO.userId);
	addDeleteButtonToRow(newRow);
}

function addContact() {
	readCookie();
	let newName = document.getElementById("contactNameText").value.trim();
	let newPhone = document.getElementById("contactNumberText").value.trim();
	let newEmail = document.getElementById("contactEmailText").value.trim();

	var table = document.getElementById("contactTable");
	var errMsg = "";
	var inputErr = false;

	if (newName == "") {
		inputErr = true;
		errMsg = "Contact entry must have a name<br>"
		document.getElementById("contactNameText").value = "";
	}
	if (!phoneRegex.test(newPhone) || newPhone == "") {
		inputErr = true;
		errMsg = errMsg + " Phone number must match the following format: XXX-XXX-XXXX<br>";
		document.getElementById("contactNumberText").value = "";
	}
	if (!emailRegex.test(newEmail) || newEmail == "") {
		inputErr = true;
		errMsg = errMsg + " Email must match the following format: NAME@DOMAIN.XYZ<br>";
		document.getElementById("contactEmailText").value = "";
	}

	if (inputErr) {
		document.getElementById("addMsg").innerHTML = errMsg;
		return;
	}

	document.getElementById("addMsg").innerHTML = "";

	let request = {
		userId: USER_INFO.userId,
		contactName: newName,
		contactPhone: newPhone,
		contactEmail: newEmail
	};

	sendPostRequest("AddContact", request, function (response) {
		let tableRow = { contactID: response.contactID, name: newName, phone: newPhone, email: newEmail }
		makeTableRow(table, tableRow);
	}, function (err) {
		document.getElementById("tableMsg").style.color = "red";
		document.getElementById("tableMsg").innerHTML = err.message;
	});

	// Clear the Add Contact text fields now that the contact has been added.
	document.getElementById("contactNameText").value = "";
	document.getElementById("contactNumberText").value = "";
	document.getElementById("contactEmailText").value = "";
}

function deleteContact(element) {
	readCookie();
	const currRow = element.parentNode.parentNode.rowIndex;
	const contactTable = document.getElementById("contactTable");

	const rowData = contactTable.rows[currRow].cells;

	let delID = rowData[0].getAttribute("data-id");

	let request = { contactId: delID };

	sendPostRequest("DeleteContact", request, function (response) {
		contactTable.deleteRow(currRow);
		document.getElementById("tableMsg").style.color = "white";
		document.getElementById("tableMsg").innerHTML = "Successfully deleted contact";
	}, function (err) {
		document.getElementById("tableMsg").style.color = "red";
		document.getElementById("tableMsg").innerHTML = err.message;
	});
}

function addDeleteButtonToRow(row) {
	const button = document.createElement("button");
	button.textContent = "Delete";

	button.addEventListener("click", function () {
		if (window.confirm("Are you sure you want to delete this contact?")) {
			deleteContact(button);
		} else {
			return;
		}
	});
	button.classList.add("buttons", "tableButton");
	const cell = row.insertCell();
	cell.appendChild(button);
}

function addEditButtonToRow(row, userId) {
	const button = document.createElement("button");
	button.textContent = "Edit";
	let contactId = row.cells[0].getAttribute("data-id");
	let name = row.cells[0].innerHTML;
	let phone = row.cells[1].innerHTML;
	let email = row.cells[2].innerHTML;

	// Assign the function to the button's onclick event
	button.onclick = function () {
		//addEditButtonFunctionality(userId, contactId, name, phone, email);
		// Alternatively, can use Rahul's idea and make the Add Contact block function like an Edit Contact block;
		// below is the function call that would do that.
		altAddEditButtonFunctionality(row, contactId, name, phone, email);
	};
	
	button.classList.add("buttons", "tableButton");
	const cell = row.insertCell();
	cell.appendChild(button);
}

function altAddEditButtonFunctionality(row, contactId, name, phone, email) {
	// If the edit/add contact block is in the default "add contact" state,
	// change it to be in the "edit contact" state.
	if (document.getElementById("addContactButton") !== null) {
		// Edit the "tableMsg" span's ID to reflect that it now indicates the result of EDITING the contact.
		var contactEditResult = document.getElementById("tableMsg");
		contactEditResult.id = "contactEditResult";

		// Edit the "addContactButton" button's ID and inner text to reflect that it now 
		// is used to submit the user's edits to their existing contact.
		var editContactButton = document.getElementById("addContactButton");
		editContactButton.innerHTML = " Submit Edits ";
		editContactButton.id = "editContactButton";

		// Edit the functionality of the "addContactButton" button to be that of editing the contact, 
		// then revert its functionality back to that of adding the contact.
		editContactButton.onclick = function() {
			let editName = document.getElementById("contactNameText").value;
			let editPhone = document.getElementById("contactNumberText").value;
			let editEmail = document.getElementById("contactEmailText").value;

			//Request packet with info fields to be updated and contactID to identify contact to be updated.
			let request = {
				contactName: editName,
				contactPhone: editPhone,
				contactEmail: editEmail,
				contactId: contactId
			};

			sendPostRequest("UpdateContact", request, function(response) {
				//Indicate success!
				contactEditResult.innerHTML = "Success! Contact edited.";

				//Update the table row cell values in the table.
				row.cells[0].innerHTML = editName;
				row.cells[1].innerHTML = editPhone;
				row.cells[2].innerHTML = editEmail;
			}, function(err) {
				contactEditResult.innerHTML = "Error: " + err.message;
			});

			//Reset to the default "add contact" values.
			// First, reset the result span.
			document.getElementById("contactEditResult").innerHTML = "";
			document.getElementById("contactEditResult").id = "tableMsg";

			// Second, reset the default values in the edit/add contact fields.
			document.getElementById("contactNameText").value = "";
			document.getElementById("contactNumberText").value = "";
			document.getElementById("contactEmailText").value = "";

			// Third, reset the ID and text of the edit/add contact button.
			editContactButton.innerHTML = " Add Contact ";
			editContactButton.id = "addContactButton";

			// Fourth and finally, reset the onclick function of the edit/add contact button.
			editContactButton.setAttribute("onclick", "javascript: addContact();");
		}
	}

	//Populate the edit contact fields with the values based on what they are in the table.
	document.getElementById("contactNameText").value = name;
	document.getElementById("contactNumberText").value = phone;
	document.getElementById("contactEmailText").value = email;
}

function goToSearchPage() {
	window.location.href = "./search.html";
	readCookie();
}

function searchContact() {
	readCookie();
	let nameSearch = document.getElementById("nameSearch").value;
	let numberSearch = document.getElementById("numberSearch").value;
	let emailSearch = document.getElementById("emailSearch").value;
	document.getElementById("tableMsg").innerHTML = "";

	let request = {
		searchName: nameSearch,
		searchPhone: numberSearch,
		searchEmail: emailSearch,
		userId: USER_INFO.userId
	};

	clearTable();

	sendPostRequest("SearchContacts", request, function (response) {
		// Reset the message color if it was previously red (i.e. if it was previously a warning)
		document.getElementById("tableMsg").style.color = "white";
		document.getElementById("tableMsg").innerHTML = "Contact(s) has been retrieved";
		let results = response.results;
		var table = document.getElementById("contactTable");

		for (let i = 0; i < results.length; i++) {
			makeTableRow(table, results[i]);
		}
	}, function (err) {
		document.getElementById("tableMsg").style.color = "red";
		document.getElementById("tableMsg").innerHTML = err.message;
	});
}

function searchAllContacts() {
	readCookie();
	let nameSearch = "";
	let numberSearch = "";
	let emailSearch = "";
	document.getElementById("tableMsg").innerHTML = "";

	let request = {
		searchName: nameSearch,
		searchPhone: numberSearch,
		searchEmail: emailSearch,
		userId: USER_INFO.userId
	};

	clearTable();

	sendPostRequest("SearchContacts", request, function (response) {
		// Reset the message color if it was previously red (i.e. if it was previously a warning)
		document.getElementById("tableMsg").style.color = "white";
		document.getElementById("tableMsg").innerHTML = "Contact(s) has been retrieved";
		let results = response.results;
		var table = document.getElementById("contactTable");

		for (let i = 0; i < results.length; i++) {
			makeTableRow(table, results[i]);
		}
	}, function (err) {
		document.getElementById("tableMsg").style.color = "red";
		document.getElementById("tableMsg").innerHTML = err.message;
	});
}

function clearTable() {
	document.getElementById("contactTable").innerHTML = "<tr><th>Name</th><th>Phone</th><th>Email</th></tr>";
}