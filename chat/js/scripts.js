"use strict";

var uniqueId = function () {
    
	var date = Date.now(),
        random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};

var messageStruct = function (text, user) {
    
	return {
		textMessage: text,
		username: user,
		id: uniqueId()
	};
};

var messageList = [];

function updateMessageList(newMessage, messageList) {

    messageList.textMessage = newMessage;
    
    return;
}

function addLogin(value) {
 
    if (!value) {

		return;
	}
    
    var username = document.getElementById("username");
    username.innerHTML = value;
    username.style.display = "block";
    
    return;
}

function store(listToSave) {

	if (typeof(Storage) === "undefined") {
        
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("messages list", JSON.stringify(listToSave));
    
    return;
}

function restore(msName) {
    
	if (typeof(Storage) === "undefined") {
        
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem(msName);

	return item && JSON.parse(item);
}

function run() {

    var chatWindow = document.getElementsByClassName("chatWindow")[0],
        allMessages = restore("messages list"),
        textBox = document.getElementById("textBox"),
        message = document.getElementsByClassName("messageBox")[0],
        loginWindowBackground = document.getElementsByClassName("loginWindowBackground")[0],
        loginWindowInput = document.getElementById("loginWindowInput");
    
    createAllMessages(allMessages);
    chatWindow.addEventListener("click", delegateEvent);
    loginWindowBackground.addEventListener("click", delegateEvent);
    loginWindowBackground/*Input*/.addEventListener("keydown", delegateEvent); //does not work
    textBox.addEventListener("keydown", delegateEvent);
}

function delegateEvent(eventObj) {
 
    if ((eventObj.target.getAttribute("id") === "sendButton") || (eventObj.keyCode === 13)) {

        onSendButtonClick();
    }
    else if (eventObj.target.getAttribute("id") === "editMessageButton") {
    
        onEditMessageButtonClick(eventObj);
    }
    else if (eventObj.target.getAttribute("id") === "editButton") {
        
    }
    else if (eventObj.target.getAttribute("id") === "deleteMessageButton") {
    
        onDeleteMessageButtonClick(eventObj);
    }
    else if (eventObj.target.getAttribute("id") === "loginButton") {
        
        onLoginButtonClick();   
    }
    else if (eventObj.target.getAttribute("id") === "editLoginButton") {
     
        onEditLoginButtonClick();
    }
    else if (eventObj.target.getAttribute("id") === "logoutButton") {
    
        onLogoutButtonClick();
    }
    else if ((eventObj.target.getAttribute("id") === "loginWindowButton") || (eventObj.keyCode === 13)) { // does not work 13
        
        onLoginWindowButtonClick();
    }
    else if (eventObj.target.getAttribute("id") === "dismissLoginWindowButton") {
    
        onDismissLoginWindowButtonClick();
    }
}

function visibleButton(eventObj) {

    if (eventObj.target.getAttribute("class") === "message") {
        
        eventObj.target.childNodes[2].style.visibility = "visible";
        eventObj.target.childNodes[3].style.visibility = "visible";
    }
}

function hiddenButton(eventObj) {
    
    if (eventObj.target.getAttribute("class") === "message") {
        
        eventObj.target.childNodes[2].style.visibility = "hidden";
        eventObj.target.childNodes[3].style.visibility = "hidden";
    }
}

function createAllMessages(allMessages) {
    
    var i;
    
    if (allMessages && allMessages.length) {
        for (i = 0; i < allMessages.length; i++) {

            addMessage(allMessages[i]);
        }
    }
    
    return;
}

function onSendButtonClick(value) {
 
    var messageText = document.getElementById("textBox"),
        username = document.getElementById("username");
    
    if (value) {
    
        addMessage(theMessage(value, username.innerText));
        messageText.innerHTML = "";
    }
    else {
    
        addMessage(messageStruct(messageText.innerText, username.innerText));
        messageText.innerHTML = "";
    }
    
    store(messageList);
    
    return;
}

function onEditMessageButtonClick(eventObj) {

    var id = eventObj.target.parentElement.attributes["id"].value,
        i;
    
    for (i = 0; i < messageList.length; i++) {
        
        if (messageList[i].id != id) {
            
            continue;
        }
        
        var parentMessage = eventObj.target.parentNode,
            oldMessage = parentMessage.getElementsByClassName("text")[0],
            newMessage = document.getElementById("textBox");
        
        newMessage.innerText = oldMessage.innerText;
        
        contentMessage = document.createTextNode(newMessage);
        
        updateMessageList(newMessage, messageList[i]);
        store(messageList);
        
        return;
    }
}

function onDeleteMessageButtonClick(eventObj) {

    var parentMessage = eventObj.target.parentNode,
        messageBox = document.getElementsByClassName("messageBox")[0],
        id = parentMessage.attributes["id"].value,
        i;
    
    messageBox.removeChild(parentMessage);
    
    for (i = 0; i < messageList.length; i++) {
    
        if (messageList[i].id != id) {
        
            continue;
        }
    
        messageList.splice(i, 1);
        store(messageList);
        
        return;
    }
}

function onLoginButtonClick() {
 
    var hiddenUserBox = document.getElementsByClassName("hiddenUserBox")[0],
        hiddenMessageBox = document.getElementsByClassName("hiddenMessageBox")[0],
        hiddenTextBox = document.getElementsByClassName("hiddenTextBox")[0],
        loginWindowBackground = document.getElementsByClassName("loginWindowBackground")[0];
    
    hiddenUserBox.style.display = "block";
    hiddenMessageBox.style.display = "block";
    hiddenTextBox.style.display = "block";
    loginWindowBackground.style.display = "block";
  
    return;
}

function onEditLoginButtonClick() {

    var loginWindowBackground = document.getElementsByClassName("loginWindowBackground")[0],
        loginWindowButton = document.getElementById("loginWindowButton");

    loginWindowButton.innerText = "Confirm";
    loginWindowBackground.style.display = "block";
  
    return;
}

function onLogoutButtonClick() {

    var hiddenUserBox = document.getElementsByClassName("hiddenUserBox")[0],
        hiddenMessageBox = document.getElementsByClassName("hiddenMessageBox")[0],
        hiddenTextBox = document.getElementsByClassName("hiddenTextBox")[0],
        username = document.getElementById("username"),
        loginButton = document.getElementById("loginButton"),
        logoutButton = document.getElementById("logoutButton"),
        loginWindowInput = document.getElementById("loginWindowInput");
    
    username.innerText = "";
    hiddenUserBox.style.display = "block";
    hiddenMessageBox.style.display = "block";
    hiddenTextBox.style.display = "block";
    
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    loginWindowInput.innerText = "";
}

function onLoginWindowButtonClick() {
 
    var loginWindowInput = document.getElementById("loginWindowInput"),
        loginWindowAlert = document.getElementById("loginWindowAlert"),
        hiddenUserBox = document.getElementsByClassName("hiddenUserBox")[0],
        hiddenMessageBox = document.getElementsByClassName("hiddenMessageBox")[0],
        hiddenTextBox = document.getElementsByClassName("hiddenTextBox")[0],
        loginWindowBackground = document.getElementsByClassName("loginWindowBackground")[0],
        loginButton = document.getElementById("loginButton"),
        logoutButton = document.getElementById("logoutButton"),
        editLoginButton = document.getElementById("editLoginButton"),
        login;

    login = loginWindowInput.innerText;
    
    if (!login) {
     
        loginWindowAlert.style.color = "rgb(181, 64, 64)";
        onLoginWindowButtonClick();
    }
    
    addLogin(login);  
    
    loginWindowAlert.style.color = "rgb(64, 181, 176)";
    hiddenUserBox.style.display = "none";
    hiddenMessageBox.style.display = "none";
    hiddenTextBox.style.display = "none";
    loginWindowBackground.style.display = "none";
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    editLoginButton.style.display = "block";
    
    return;
}

function onDismissLoginWindowButtonClick () {

    var loginWindowBackground = document.getElementsByClassName("loginWindowBackground")[0];
    
    loginWindowBackground.style.display = "none";
    
    return;
}

function createMessage(username, textMessage) {
    
    var newMessage = document.createElement("div"),
        user = document.createElement("span"),
        text = document.createElement("span"),
        editMessageButton = document.createElement("img"),
        deleteMessageButton = document.createElement("img"),
        contentUsername = document.createTextNode(username + ": "),
        contentMessage = document.createTextNode(textMessage);
        
    newMessage.setAttribute("class", "message");
    user.setAttribute("class", "user");
    text.setAttribute("class", "text");

    editMessageButton.setAttribute("id", "editMessageButton");
    editMessageButton.setAttribute("src", "css/resources/edit.png");

    deleteMessageButton.setAttribute("id", "deleteMessageButton");
    deleteMessageButton.setAttribute("src", "css/resources/trash.png");

    user.appendChild(contentUsername);
    text.appendChild(contentMessage);

    newMessage.appendChild(user);
    newMessage.appendChild(text);
    newMessage.appendChild(editMessageButton);
    newMessage.appendChild(deleteMessageButton);
    
    return newMessage;
}

function addMessage(message) {
 
    if (!message.textMessage) {

		return;
	}
    
    var newMessage = createMessage(message.username, message.textMessage),
        messages = document.getElementsByClassName("messageBox")[0];

    newMessage.id = message.id;
    
	messages.appendChild(newMessage);
    messageList.push(message);
    
    return;
}