"use strict";

var messageStruct = function (text, user) {
                    return {
                        textMessage: text,
                        username: user,
                        id: 0 };
                    },
    appState      = {
                    mainUrl : 'http://localhost:1555/chat',
                    token : 'TN11EN' },
	messageList   = [],
    editingMessage;

function run() {
    var chatWindow = document.getElementsByClassName("chatWindow")[0],
        loginWindow = document.getElementById("loginWindow");
	
    chatWindow.addEventListener("click", delegateEvent);
    chatWindow.addEventListener("keydown", delegateEvent);
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

function onSendButtonClick(value) {
    var messageText = document.getElementById("textBox"), 
		username = document.getElementById("username"),
		message = messageStruct(messageText.innerText, username.innerText),
        sendButton = document.getElementById("sendButton"),
        i;

    if (sendButton.innerHTML == "Send") {
        addMessage(message);
        messageText.innerHTML = "";
        return;
    }
    else {
        var id = editingMessage.attributes["id"].value,
			message;
        
        for (i = 0; i < messageList.length; i++) {
            if (messageList[i].id === id) {
                editingMessage.childNodes[0].childNodes[1].innerHTML = messageText.innerHTML;
                updateMessageList(messageText.innerHTML, messageList[i]);
                messageText.innerHTML = "";
                sendButton.innerHTML = "Send";
                return;
            }    
        }
    }
}

function onEditMessageButtonClick(eventObj) {
    var user = document.getElementById("username");
    
    if (user.innerHTML + ":&nbsp;" != eventObj.target.parentNode.childNodes[0].childNodes[0].innerHTML) {
        alert("This is not your message.")
        return;
    }
        
    var id = eventObj.target.parentElement.attributes["id"].value,
		parentMessage = eventObj.target.parentNode,
		oldMessage = parentMessage.getElementsByClassName("text")[0],
		editButton = document.getElementById("sendButton"),
		messageArea = document.getElementById("textBox"),
        i;
	
    for (i = 0; i < messageList.length; i++) {
        if (messageList[i].id === id) {
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
        user = document.getElementById("username");
    
    if (user.innerHTML + ":&nbsp;" != eventObj.target.parentNode.childNodes[0].childNodes[0].innerHTML) {
        alert("This is not your message.")
        return;
    }
    
    messageBox.removeChild(parentMessage);
    
    for (i = 0; i < messageList.length; i++) {
        if (messageList[i].id === id) {
			Delete(appState.mainUrl, JSON.stringify(messageList[i]));
			messageList.splice(i, 1);
            return;
        }
    }
}

function onLoginButtonClick() {
    var loginWindowBackground = document.getElementById("loginWindowBackground");
	
    loginWindowBackground.style.display = "block";
}

function onEditLoginButtonClick() {
    var loginWindowBackground = document.getElementById("loginWindowBackground"),
        loginWindowButton = document.getElementById("loginWindowButton");

    loginWindowButton.innerText = "Confirm";
    loginWindowBackground.style.display = "block";
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
    var loginWindowBackground = document.getElementById("loginWindowBackground");

    loginWindowBackground.style.display = "none";
}

function restoreFromServer() {
	var url = appState.mainUrl + "?token=" + appState.token;
	
    Get(url, 	function(responseText) {
					console.assert(responseText != null);
					var response = JSON.parse(responseText);
					appState.token = response.token;
					createAllMessages(response.messages);
        		});
	
	setTimeout(function() {
					restoreFromServer();
				}, 1000);
}

function createAllMessages(allMessages) {
    var i;
    if (allMessages && allMessages.length) {
        for (i = 0; i < allMessages.length; i++) {
			messageList.push(allMessages[i]);
            addMessageInternal(allMessages[i]);
        }
    }
}

function revealAll() {
	var hiddenUserBox = document.getElementById("hiddenUserBox"),
        hiddenMessageBox = document.getElementById("hiddenMessageBox"),
        hiddenTextBox = document.getElementById("hiddenTextBox"),
        loginWindowBackground = document.getElementById("loginWindowBackground"),
        loginButton = document.getElementById("loginButton"),
        logoutButton = document.getElementById("logoutButton"),
        editLoginButton = document.getElementById("editLoginButton");
	
	hiddenUserBox.style.display = "none";
	hiddenMessageBox.style.display = "none";
	hiddenTextBox.style.display = "none";
	loginWindowBackground.style.display = "none";
	loginButton.style.display = "none";
	logoutButton.style.display = "block";
	editLoginButton.style.display = "block";
}

function hideAll() {
	var hiddenUserBox = document.getElementById("hiddenUserBox"),
        hiddenMessageBox = document.getElementById("hiddenMessageBox"),
        hiddenTextBox = document.getElementById("hiddenTextBox"),
        loginButton = document.getElementById("loginButton"),
        editLoginButton = document.getElementById("editLoginButton"),
        logoutButton = document.getElementById("logoutButton"),
        loginWindowInput = document.getElementById("loginWindowInput");
	
	hiddenUserBox.style.display = "block";
    hiddenMessageBox.style.display = "block";
    hiddenTextBox.style.display = "block";
    loginButton.style.display = "block";
    editLoginButton.style.display = "none";
    logoutButton.style.display = "none";
    loginWindowInput.innerText = "";
}

function addMessage(message, continueWith) {
    if (!message.textMessage) {
		return;
	}
    
    Post(appState.mainUrl, JSON.stringify(message), function() {
														restoreFromServer();
													});
}
    
function addMessageInternal(message) {
    var newMessage = createMessage(message.username, message.textMessage),
        messages = document.getElementById("messageBox");

    newMessage.id = message.id;
	messages.appendChild(newMessage);
}

function updateMessageList(newMessage, messageList_) {
    messageList_.textMessage = newMessage;
	Put(appState.mainUrl, JSON.stringify(messageList_));
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

function addLogin(value) {
    if (!value) {
		return;
	}
	    
    restoreFromServer();
	
    var username = document.getElementById("username");
	username.style.display = "block";
    username.innerHTML = value;
    return;
}

function Get(url, continueWith, continueWithError) {
	ajax('GET', url, null, continueWith, continueWithError);
}

function Post(url, data, continueWith, continueWithError) {
	ajax('POST', url, data, continueWith, continueWithError);	
}

function Put(url, data, continueWith, continueWithError) {
	ajax('PUT', url, data, continueWith, continueWithError);	
}

function Delete(url, data, continueWith, continueWithError) {
	ajax('DELETE', url, data, continueWith, continueWithError);	
}

function ajax(method, url, data, continueWith, continueWithError) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.onload = function () {
		if (xhr.readyState !== 4) {
			indicatorOff();
			return;
		}

		if(xhr.status != 200) {
			continueWithError('Error on the server side, response ' + xhr.status);
			indicatorOff();
			return;
		}

		if(isError(xhr.responseText)) {
			continueWithError('Error on the server side, response ' + xhr.responseText);
			indicatorOff();
			return;
		}

		continueWith(xhr.responseText);
	};    

    xhr.ontimeout = function () {
		indicatorOff();
    	continueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
    	var errMsg = 'Server connection error !\n'+
    	'\n' +
    	'Check if \n'+
    	'- server is active\n'+
    	'- server sends header "Access-Control-Allow-Origin:*"';

		indicatorOff();
        continueWithError(errMsg);
    };

    xhr.send(data);
}

function indicatorOn() {
	var serverIndicator = document.getElementById("serverIndicator");
	
	serverIndicator.style.color = "#c2ffe3";
    serverIndicator.style.backgroundColor = "#58b98c";
}

function indicatorOff() {
	var serverIndicator = document.getElementById("serverIndicator");
	
	serverIndicator.style.color = "#ffc2c2";
    serverIndicator.style.backgroundColor = "#b95c58";
}

function isError(text) {
	if(text == "")
		return false;
	
	try {
		var obj = JSON.parse(text);
	} catch(ex) {
		return true;
	}

	return !!obj.error;
}