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

function updateMessageList(newMessage, messageListI) {
    messageListI.textMessage = newMessage;
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
    var allMessages = restore("messages list"), 
        chatWindow = document.getElementsByClassName("chatWindow")[0],
        textBox = document.getElementById("textBox"),
        loginWindow = document.getElementById("loginWindow");
    
    createAllMessages(allMessages);
    chatWindow.addEventListener("click", delegateEvent);
    textBox.addEventListener("keydown", delegateEvent);
    loginWindow.addEventListener("click", delegateEvent);
	loginWindow.addEventListener("keydown", delegateEvent);
}

function delegateEvent(eventObj) {
    if ((eventObj.target.getAttribute("id") === "sendButton") || 
		((eventObj.keyCode === 13) && (eventObj.target.getAttribute("id") === "textBox"))
	   ) {
    	onSendButtonClick();
    }
    else if (eventObj.target.getAttribute("class") === "editMessageButton icon") {
        onEditMessageButtonClick(eventObj);
    }
    else if (eventObj.target.getAttribute("class") === "deleteMessageButton icon") {
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
    else if ((eventObj.target.getAttribute("id") === "loginWindowButton") || 
			 ((eventObj.keyCode === 13) && (eventObj.target.getAttribute("id") === "loginWindowInput"))
			) {
			onLoginWindowButtonClick();
	}
    else if (eventObj.target.getAttribute("id") === "dismissLoginWindowButton") {
        onDismissLoginWindowButtonClick();
    }
}

function createAllMessages(allMessages) {
    var i;
    if (allMessages && allMessages.length) {
        for (i = 0; i < allMessages.length; i++) {
            addMessage(allMessages[i]);
        }
    }
}

function onSendButtonClick(value) {
    var messageText = document.getElementById("textBox"),
        sendButton = document.getElementById("sendButton"),
        i,
        username = document.getElementById("username");

    if (sendButton.innerHTML == "Send") {
        addMessage(messageStruct(messageText.innerText, username.innerText));
        messageText.innerHTML = "";
        store(messageList);
        return;
    }
    else {
        var id = editingMessage.attributes["id"].value;
        
        for (i = 0; i < messageList.length; i++) {
            if (messageList[i].id === id) {
                editingMessage.childNodes[0].childNodes[1].innerHTML = messageText.innerHTML;
                updateMessageList(messageText.innerHTML, messageList[i]);
                messageText.innerHTML = "";
                sendButton.innerHTML = "Send";
                store(messageList);
                return;
            }    
        }
    }
}

var editingMessage;

function onEditMessageButtonClick(eventObj) {
    var user = document.getElementById("username");
    
    if (user.innerHTML + ":&nbsp;" != eventObj.target.parentNode.childNodes[0].childNodes[0].innerHTML) {
        alert("This is not your message.")
        return;
    }
        
    var id = eventObj.target.parentElement.attributes["id"].value,
        i;
    
    for (i = 0; i < messageList.length; i++) {
        if (messageList[i].id === id) {
            var parentMessage = eventObj.target.parentNode,
            oldMessage = parentMessage.getElementsByClassName("text")[0],
            editButton = document.getElementById("sendButton"),
            messageArea = document.getElementById("textBox");
        
            editingMessage = parentMessage;
            messageArea.innerText = oldMessage.innerText;
            editButton.innerHTML = "Edit";
            return;
        }
    }
}

function onDeleteMessageButtonClick(eventObj) {
    var parentMessage = eventObj.target.parentNode,
        messageBox = document.getElementById("messageBox"),
        id = parentMessage.attributes["id"].value,
        i,
		sendButton = document.getElementById("sendButton"),
        user = document.getElementById("username");
    
    if (user.innerHTML + ":&nbsp;" != eventObj.target.parentNode.childNodes[0].childNodes[0].innerHTML) {
        alert("This is not your message.")
        return;
    }
	
	if (sendButton.innerHTML == "Edit") {
		return;
	}
    
    messageBox.removeChild(parentMessage);
    
    for (i = 0; i < messageList.length; i++) {
        if (messageList[i].id === id) {
            messageList.splice(i, 1);
            store(messageList);
            return;
        }
    }
}

function onLoginButtonClick() {
	$("#loginWindowBackground").fadeIn(300);
}

function onEditLoginButtonClick() {
    var loginWindowButton = document.getElementById("loginWindowButton");

    loginWindowButton.innerText = "Confirm";
    $("#loginWindowBackground").fadeIn(300);
}

function onLogoutButtonClick() {
    var username = document.getElementById("username");
    username.innerText = "";
	
	hideAll();
}

function onLoginWindowButtonClick() {
    var login = document.getElementById("loginWindowInput").innerText;

    if (login) {
        addLogin(login);
		revealAll();
    }
}

function onDismissLoginWindowButtonClick () {
    $("#loginWindowBackground").fadeOut(300);
}

function createMessage(username, textMessage) {
    var newMessage = document.createElement("div"),
        message = document.createElement("div"),
        user = document.createElement("span"),
        text = document.createElement("span"),
        editMessageButton = document.createElement("img"),
        deleteMessageButton = document.createElement("img"),
        contentUsername = document.createElement("span"),
        contentMessage = document.createElement("span");

    user.innerHTML = username + ":&nbsp";
    text.innerHTML = textMessage;
    
    newMessage.setAttribute("class", "message");
    user.setAttribute("class", "user");
    text.setAttribute("class", "text");

    editMessageButton.setAttribute  ("class", "editMessageButton icon");
    editMessageButton.setAttribute  ("src", "css/resources/edit.png");
    deleteMessageButton.setAttribute("class", "deleteMessageButton icon");
    deleteMessageButton.setAttribute("src", "css/resources/trash.png");

    message.appendChild(user);
    message.appendChild(text);
    newMessage.appendChild(message);
    newMessage.appendChild(editMessageButton);
    newMessage.appendChild(deleteMessageButton);
    
    return newMessage;
}

function revealAll() {
	var loginButton = document.getElementById("loginButton"),
        logoutButton = document.getElementById("logoutButton"),
        editLoginButton = document.getElementById("editLoginButton");
	
	$("#hiddenUserBox").fadeOut(300);
	$("#hiddenMessageBox").fadeOut(300);
	$("#hiddenTextBox").fadeOut(300);
    $("#loginWindowBackground").fadeOut(300);
	
	loginButton.style.display = "none";
	logoutButton.style.display = "block";
	editLoginButton.style.display = "block";
}

function hideAll() {
	var loginButton = document.getElementById("loginButton"),
        editLoginButton = document.getElementById("editLoginButton"),
        logoutButton = document.getElementById("logoutButton"),
        loginWindowInput = document.getElementById("loginWindowInput");
	
	$("#hiddenUserBox").fadeIn(300);
	$("#hiddenMessageBox").fadeIn(300);
	$("#hiddenTextBox").fadeIn(300);
	
    loginButton.style.display = "block";
    editLoginButton.style.display = "none";
    logoutButton.style.display = "none";
    loginWindowInput.innerText = "";
}

function addMessage(message) {
    if (!message.textMessage) {
		return;
	}
    
    var newMessage = createMessage(message.username, message.textMessage),
        messages = document.getElementById("messageBox");

    newMessage.id = message.id;
	messages.appendChild(newMessage);
    messageList.push(message);
}