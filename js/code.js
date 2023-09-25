const urlBase = 'http://contactmanager4331.online/LAMPAPI/';

const nameRegex = new RegExp(/^[a-zA-z]+$/);
const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

var USER_INFO = {
	userId: 0,
	firstName: "",
	lastName: ""
}

var advancedSearchActive = false;
var editModeActive = false;

function buttonSearchPage() {
	USER_INFO.userId = 1;
	USER_INFO.firstName = "Joey";
	USER_INFO.lastName = "Crown";
	saveCookie();
	goToSearchPage();
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
		document.getElementById("firstNameContainer").style.display = 'block';
		document.getElementById("lastNameContainer").style.display = 'block';
		document.getElementById("phoneContainer").style.display = 'block';
		document.getElementById("emailContainer").style.display = 'block';

		document.getElementById("registerButton").style.display = 'block';
		document.getElementById("loginButton").style.display = 'none';
		document.getElementById("loginResult").innerHTML = "";
		document.getElementById("inner-title").innerHTML = "Fill out the fields below, then click \"Create Account\".";
		document.getElementById("registerText").innerHTML = "Already have an Account?";
		document.getElementById("signUpButton").innerHTML = "Log In";
	} else {
		// Hide and adjust the labels for the fields in the register box as necessary
		// document.getElementById("loginName").style.fontSize = '24px';
		// document.getElementById("loginPassword").style.fontSize = '24px';
		// document.getElementById("loginNameLabel").style.fontSize = '24px';
		// document.getElementById("loginPasswordLabel").style.fontSize = '24px';
		// document.getElementById("regFirstNameLabel").style.display = 'none';
		// document.getElementById("regLastNameLabel").style.display = 'none';
		// document.getElementById("regPhoneLabel").style.display = 'none';
		// document.getElementById("regEmailLabel").style.display = 'none';
		// document.getElementById("regFirstNameLabel").innerHTML = '';
		// document.getElementById("regLastNameLabel").innerHTML = '';
		// document.getElementById("regPhoneLabel").innerHTML = '';
		// document.getElementById("regEmailLabel").innerHTML = '';

		// Hide any and all error messages
		document.getElementById("firstErrText").innerHTML = "<br/>";
		document.getElementById("lastErrText").innerHTML = "<br/>";
		document.getElementById("usernameErrText").innerHTML = "<br/>";
		document.getElementById("passwordErrText").innerHTML = "<br/>";
		document.getElementById("phoneErrText").innerHTML = "<br/>";
		document.getElementById("emailErrText").innerHTML = "<br/>";

		let formFields = document.getElementsByClassName("formFieldGroup");
		for (let item of formFields) {
			item.classList.remove("error");
		}

		// Clear the register box input fields
		document.getElementById("firstNameContainer").style.display = 'none';
		document.getElementById("lastNameContainer").style.display = 'none';
		document.getElementById("phoneContainer").style.display = 'none';
		document.getElementById("emailContainer").style.display = 'none';
		document.getElementById("loginButton").style.display = 'block';
		document.getElementById("inner-title").innerHTML = "Log in";
		document.getElementById("registerText").innerHTML = "Not registered yet?";
		document.getElementById("signUpButton").innerHTML = "Sign Up";
		document.getElementById("registerErrText").style.display = 'none';
		document.getElementById("registerButton").style.display = 'none';
	}
}

function displayRegistrationErr(id, msg) {
	const fieldContainer = document.getElementById(id).parentElement;
	fieldContainer.classList.add("error");
	document.getElementById(id).innerHTML = msg;

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
	if (!(newUsername != "" && newPassword != "" && nameRegex.test(newUserFirstName) && nameRegex.test(newUserLastName) && emailRegex.test(newUserEmail) && phoneRegex.test(newUserPhone))) {
		var msg = document.getElementById("registerErrText");
		var msgString = "";
		if (!nameRegex.test(newUserFirstName)){
			//document.getElementById("firstErrText").innerHTML = "Please enter a valid first name<br/>";
			displayRegistrationErr("firstErrText", "Please enter a valid first name<br/>");
		} else {
			document.getElementById("firstErrText").innerHTML = "<br/>";
		}
		if (!nameRegex.test(newUserLastName)){
			//document.getElementById("lastErrText").innerHTML = "Please enter a valid last name<br/>";
			displayRegistrationErr("lastErrText", "Please enter a valid last name<br/>");
		} else{
			document.getElementById("lastErrText").innerHTML = "<br/>";
		}
		if (newUsername == "") {
			//document.getElementById("usernameErrText").innerHTML = "Please enter a username<br/>";
			displayRegistrationErr("usernameErrText", "Please enter a username<br/>");
		} else {
			document.getElementById("usernameErrText").innerHTML = "<br/>";
		}
		if (newPassword == "") {
			//document.getElementById("passwordErrText").innerHTML = "Please enter a password<br/>";
			displayRegistrationErr("passwordErrText", "Please enter a password<br/>");
		} else {
			document.getElementById("passwordErrText").innerHTML = "<br/>";
		}
		if (!phoneRegex.test(newUserPhone)) {
			//document.getElementById("phoneErrText").innerHTML = "Please enter a valid phone number (XXX-XXX-XXXX)<br/>";
			displayRegistrationErr("phoneErrText", "Please enter a valid phone number (XXX-XXX-XXXX)<br/>");
		} else {
			document.getElementById("phoneErrText").innerHTML = "<br/>";
		}
		if (!emailRegex.test(newUserEmail)) {
			//document.getElementById("emailErrText").innerHTML = "Please enter a valid email (name@host.domain)<br/>";
			displayRegistrationErr("emailErrText", "Please enter a valid email (name@host.domain)<br/>");
		} else {
			document.getElementById("emailErrText").innerHTML = "<br/>";
		}
		msg.textContent = "Please correct the indicated fields";
		msg.style.color = "#be070d";
		msg.style.display = "block";
		return;
	}

	document.getElementById("registerErrText").textContent = "" //Ensure error message is wiped
	document.getElementById("firstErrText").textContent = "";
	document.getElementById("lastErrText").textContent = "";
	document.getElementById("usernameErrText").textContent = "";
	document.getElementById("passwordErrText").textContent = "";
	document.getElementById("phoneErrText").textContent = "";
	document.getElementById("emailErrText").textContent = "";

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

		document.getElementById("registerText").style.color = "smoky-black";

		goToSearchPage();
	}, function (err) {
		document.getElementById("registerText").innerHTML = err.message;
		document.getElementById("registerText").style.color = "#be070d";
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

	//newRow.setAttribute('tabindex', "0");

	['mouseover', 'focus'].forEach(function(event) {
		newRow.addEventListener(event, () => {
			newRow.classList.add("active")
		}, false);
	});

	['mouseout', 'blur'].forEach(function(event) {
		newRow.addEventListener(event, () => {
			newRow.classList.remove("active");
		}, false);
	});

	/*newRow.addEventListener("mouseover", function () {
		newRow.classList.add("active");
	});
	newRow.addEventListener("mouseout", function () {
		newRow.classList.remove("active");
	});*/

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
		document.getElementById("tableMsg").style.color = "#be070d";
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
		document.getElementById("tableMsg").style.color = "black";
		document.getElementById("tableMsg").innerHTML = "Successfully deleted contact";
	}, function (err) {
		document.getElementById("tableMsg").style.color = "#be070d";
		document.getElementById("tableMsg").innerHTML = err.message;
	});
}

function addDeleteButtonToRow(row) {
	const button = document.createElement("button");
	button.setAttribute("title", "Delete");
	button.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";

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
	button.setAttribute("title", "Edit");
	button.innerHTML = "<i class=\"fa-solid fa-pen-to-square\"></i>";
	let contactId = row.cells[0].getAttribute("data-id");

	// Assign the function to the button's onclick event
	button.onclick = function () {
		//addEditButtonFunctionality(userId, contactId, name, phone, email);
		// Alternatively, can use Rahul's idea and make the Add Contact block function like an Edit Contact block;
		// below is the function call that would do that.
		altAddEditButtonFunctionality(row, contactId);
	};
	
	button.classList.add("buttons", "tableButton");
	const cell = row.insertCell();
	cell.appendChild(button);
}

function altAddEditButtonFunctionality(row, contactId) {
	// If the edit/add contact block is in the default "add contact" state,
	// change it to be in the "edit contact" state.
	if (document.getElementById("addContactButton") !== null) {
		// Edit the "tableMsg" span's ID to reflect that it now indicates the result of EDITING the contact.
		var contactEditResult = document.getElementById("tableMsg");

		// Edit the "addContactButton" button's ID and inner text to reflect that it now 
		// is used to submit the user's edits to their existing contact.
		var editContactButton = document.getElementById("addContactButton");
		editContactButton.innerHTML = " Submit Edits ";
		editContactButton.id = "editContactButton";

		// set edit mode to active
		editModeActive = true;

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
				contactEditResult.style.color = "black";
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
			document.getElementById("tableMsg").innerHTML = "";

			// Second, reset the default values in the edit/add contact fields.
			document.getElementById("contactNameText").value = "";
			document.getElementById("contactNumberText").value = "";
			document.getElementById("contactEmailText").value = "";

			// Third, reset the ID and text of the edit/add contact button.
			editContactButton.innerHTML = " Add Contact ";
			editContactButton.id = "addContactButton";

			// Fourth and finally, reset the onclick function of the edit/add contact button.
			editContactButton.setAttribute("onclick", "javascript: addContact();");
			
			// set edit mode to false
			editModeActive = false;
		}
	}

	//Populate the edit contact fields with the values based on what they are in the table.
	document.getElementById("contactNameText").value = row.cells[0].textContent;
	document.getElementById("contactNumberText").value = row.cells[1].textContent;
	document.getElementById("contactEmailText").value = row.cells[2].textContent;
}

function goToSearchPage() {
	window.location.href = "./search.html";
	readCookie();
}

function toggleAdvancedSearch(element) {
	if (element.innerHTML == "Advanced Search") {
		document.getElementById("advancedSearchFields").style.display = 'flex';
		document.getElementById("searchOption").style.display = 'none';
		document.getElementById("simpleSearch").style.display = 'none';
		advancedSearchActive = true;
		element.innerHTML = "Simple Search";
	}
	else {
		document.getElementById("advancedSearchFields").style.display = 'none';
		document.getElementById("searchOption").style.display = 'block';
		document.getElementById("simpleSearch").style.display = 'block';
		advancedSearchActive = false;
		element.innerHTML = "Advanced Search";
	}
}

function searchContact(button) {
	readCookie();
	let nameSearch = "";
	let numberSearch = "";
	let emailSearch = "";

	// make sure edit mode isn't active
	if (editModeActive) {
		const tableMsg = document.getElementById("tableMsg");
		tableMsg.style.color = "#be070d";
		tableMsg.innerHTML = "Search disabled while in editing mode.";
		return;
	}

	// check if button is "View All"
	if (button !== "searchAllButton") {
		if (advancedSearchActive) {
			nameSearch = document.getElementById("nameSearch").value;
			numberSearch = document.getElementById("numberSearch").value;
			emailSearch = document.getElementById("emailSearch").value;
		} else {
			let searchOption = document.getElementById("searchOption").value;
			let searchStr = document.getElementById("simpleSearch").value;

			switch (searchOption) {
				case "Name":
					nameSearch = searchStr;
					break;
				case "Phone":
					numberSearch = searchStr;
					break;
				case "Email":
					emailSearch = searchStr;
					break;
				default:
					console.log("Error in switch statement");
			}
		}
	}
	document.getElementById("tableMsg").innerHTML = "";
	document.getElementById("tableMsg").style.display = "none";
	let request = {
		searchName: nameSearch,
		searchPhone: numberSearch,
		searchEmail: emailSearch,
		userId: USER_INFO.userId
	};

	clearTable();

	sendPostRequest("SearchContacts", request, function (response) {
		// Reset the message color if it was previously red (i.e. if it was previously a warning)
		document.getElementById("tableMsg").style.color = "black";
		document.getElementById("tableMsg").innerHTML = "Contact(s) has been retrieved";
		let results = response.results;
		var table = document.getElementById("contactTable");

		for (let i = 0; i < results.length; i++) {
			makeTableRow(table, results[i]);
		}
	}, function (err) {
		document.getElementById("tableMsg").style.color = "#e00000";
		document.getElementById("tableMsg").innerHTML = err.message;
	});
	document.getElementById("tableMsg").style.display = "block";
}
function clearTable() {
	var contactTable = document.getElementById("contactTable")
	for (let i = contactTable.rows.length - 1; i > 0; i--) {
		contactTable.deleteRow(i);
	}
}
