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
	console.log("SAVING COOKIE");
	let expiry_time = 20 * 60 * 1000; // 20 minutes
	let date = new Date();
	date.setTime(date.getTime() + expiry_time);
	document.cookie = "userInfo=" + JSON.stringify(USER_INFO) + ";expires=" + date.toGMTString();
	console.log(document.cookie);
}

function readCookie() {
	if (document.cookie === "") {
		window.location.href = "index.html";
		return;
	}

	console.log("COOKIE EXISTS");

	USER_INFO = JSON.parse(document.cookie.split("=")[1]);
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

	addEditButtonToRow(newRow, USER_INFO.userId);
	addDeleteButtonToRow(newRow);
}

function addContact() {
	readCookie();
	let newName = document.getElementById("contactNameText").value.trim();
	let newPhone = document.getElementById("contactNumberText").value.trim();
	let newEmail = document.getElementById("contactEmailText").value.trim();
	document.getElementById("contactAddResult").innerHTML = "";

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
		document.getElementById("contactAddResult").innerHTML = err.message;
	});
}

function deleteContact(element) {
	readCookie();
	const currRow = element.parentNode.parentNode.rowIndex;
	const contactTable = document.getElementById("contactTable");

	const rowData = contactTable.rows[currRow].cells;

	let delID = rowData[0].getAttribute("data-id");

	let request = { contactId: delID };

	sendPostRequest("DeleteContact", request, function (response) {
		console.log("Contact successfully deleted.");
		contactTable.deleteRow(currRow);
	}, function (err) {
		console.log(err.message);
	});
}

function addDeleteButtonToRow(row) {
	const button = document.createElement("button");
	button.textContent = "Delete";

	button.addEventListener("click", function () {
		deleteContact(button);
	});

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
		addEditButtonFunctionality(userId, contactId, name, phone, email);
	};

	const cell = row.insertCell();
	cell.appendChild(button);
}

function addEditButtonFunctionality(userId, contactId, name, phone, email) {
	window.location.href = './edit_contact.html?userId=' + userId.toString() + '&contactId=' + contactId +
		'&name=' + name + '&phone=' + phone + '&email=' + email;
}

function populateEditPage() {
	readCookie();
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());

	let userIdField = document.getElementById("userIdField");
	userIdField.value = params.userId;

	let nameField = document.getElementById("nameField");
	nameField.value = params.name;

	let phoneField = document.getElementById("phoneField");
	phoneField.value = params.phone;

	let emailField = document.getElementById("emailField");
	emailField.value = params.email;

	let contactIdField = document.getElementById("contactIdField");
	contactIdField.value = params.contactId;
}

function goToSearchPage() {
	window.location.href = "./search.html";
	readCookie();
}

function submitEdits() {
	readCookie();
	var contId = document.getElementById('contactIdField').value;
	var editName = document.getElementById('nameField').value;
	var editPhone = document.getElementById('phoneField').value;
	var editEmail = document.getElementById('emailField').value;

	let request = {
		contactName: editName,
		contactPhone: editPhone,
		contactEmail: editEmail,
		contactId: contId
	};

	sendPostRequest("UpdateContact", request, function (response) {
		document.getElementById("editPageContactUpdateResult").innerHTML = "Contact Update Result: updated";
		goToSearchPage();
	}, function (err) {
		document.getElementById("editPageContactUpdateResult").innerHTML = "Contact Update Result: " + err.message;
	});
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