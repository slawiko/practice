"use strict";

var uniqueId = function () {
    
	var date = Date.now(),
        random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};

var theMessage = function (text, username) {
    
	return {
		textMessage: text,
		user: username,
		id: uniqueId()
	};
};

var messageList = [];

function addLogin(value) {
 
    if (!value) {

		return;
	}
    
    var username = document.getElementById("username");
    username.innerHTML = value;
    username.style.display = "block";
    
    return;
}

function logIn(username) {
 
    var hiddenUserBox = document.getElementsByClassName("hiddenUserBox")[0],
        hiddenMessageBox = document.getElementsByClassName("hiddenMessageBox")[0],
        promptBackground = document.getElementsByClassName("promt")[0],
        login;
    
    hiddenUserBox.style.display = "block";
    hiddenMessageBox.style.display =  "block";
    promptBackground.style.display = "block";
    
    while (!login) {
     
        login = prompt("Enter username", username);
    }
    
    addLogin(login);
    
    promptBackground.style.display = "none";
    hiddenUserBox.style.display = "none";
    hiddenMessageBox.style.display =  "none";
    
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

function delegateEvent(eventObj) {
 
    if ((eventObj.target.getAttribute("id") === "sendButton") || (eventObj.keyCode === 13)) {

        onSendButtonClickOrEnter();
    }
    else if (eventObj.target.getAttribute("id") === "editLoginButton") {
     
        onEditLoginButtonClick();
    }
    else if (eventObj.target.getAttribute("id") === "logoutButton") {
        
        onLogoutButtonClick();   
    }
    else if (eventObj.target.getAttribute("id") === "editMessageButton") {
    
        onEditMessageButtonClick(eventObj);
    }
    else if (eventObj.target.getAttribute("id") === "deleteMessageButton") {
    
        onDeleteMessageButtonClick(eventObj);
    }
}

function run() {
 
    logIn();
    
    var chatWindow = document.getElementsByClassName("chatWindow")[0],
        allMessages = restore("messages list"),
        textBox = document.getElementById("textBox");
    
    chatWindow.addEventListener("click", delegateEvent);
    createAllMessages(allMessages);
    textBox.addEventListener("keydown", delegateEvent);
}

function createAllMessages(allMessages) {
    
    var i;
    
    if (allMessages.length) {
        for (i = 0; i < allMessages.length; i++) {

            addMessage(allMessages[i]);
        }
    }
    
    return;
}

function onSendButtonClickOrEnter(value) {
 
    var messageText = document.getElementById("textBox"),
        username = document.getElementById("username");
    
    if (value) {
    
        addMessage(theMessage(value, username.innerText + ": "));
        messageText.innerHTML = "";
    }
    else {
    
        addMessage(theMessage(messageText.innerText, username.innerText + ": "));
        messageText.innerHTML = "";
    }
    
    store(messageList);
    
    return;
}

function onLogoutButtonClick() {
 
    logIn();
    
    return;
}

function onEditLoginButtonClick() {
    
    var username = document.getElementById("username"),
        value = username.innerText;
    
    logIn(value);
    
    return;
}

function updateMessageList(newMessage, messageList) {

    messageList.textMessage = newMessage;
    
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
            newMessage = prompt("Edit message", oldMessage.innerHTML);

        while (!newMessage) {

            newMessage = prompt("Your message is empty! Please, edit message", oldMessage.innerHTML);
        }

        oldMessage.innerText = newMessage;
        
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

function createMessage(username, textMessage) {
    
    var newMessage = document.createElement("div"),
        user = document.createElement("span"),
        text = document.createElement("span"),
        editMessageButton = document.createElement("img"),
        deleteMessageButton = document.createElement("img"),
        contentUsername = document.createTextNode(username),
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
    
    var newMessage = createMessage(message.user, message.textMessage),
        messages = document.getElementsByClassName("messageBox")[0];

    newMessage.id = message.id;
    
	messages.appendChild(newMessage);
    messageList.push(message);
    
    return;
}