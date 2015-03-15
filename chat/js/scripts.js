var uniqueId = function() {
    
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};

var theMessage = function(text, username) {
    
	return {
		textMessage: text,
		user: username,
		id: uniqueId()
	};
};

var messageList = [];

function run() {
 
    login();
    
    var chatWindow = document.getElementsByClassName("chatWindow")[0];
    chatWindow.addEventListener("click", delegateEvent);
    
    var allMessages = restore("messages list");
    createAllMessages(allMessages);
    
    var textBox = document.getElementById("textBox");
    textBox.addEventListener("keydown", delegateEvent);
}

function createAllMessages(allMessages) {
    
    if (allMessages.length) {
        for(var i = 0; i < allMessages.length; i++) {

            addMessage(allMessages[i]);
        }
    }
    
    return;
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
    
    return;
}

function onSendButtonClickOrEnter(value) {
 
    var messageText = document.getElementById("textBox");
    var username = document.getElementById("username");
    
    if (value) {
    
        addMessage(theMessage(value, username.innerHTML + ": "));
        messageText.innerHTML = "";
    }
    else {
    
        addMessage(theMessage(messageText.innerHTML, username.innerHTML + ": "));
        messageText.innerHTML = "";
    }
    
    store(messageList);
    
    return;
}

function onLogoutButtonClick() {
 
    login();
    
    return;
}

function onEditLoginButtonClick() {
    
    var username = document.getElementById("username");
    var value = username.innerHTML;
    
    login(value);
    
    return;
}

function onEditMessageButtonClick(eventObj) {

    var id = eventObj.target.parentElement.attributes["id"].value;
    
    for (var i = 0; i < messageList.length; i++) {
        
        if (messageList[i].id != id) {
            
            continue;
        }
        
        var parentMessage = eventObj.target.parentNode;
        var oldMessage = parentMessage.getElementsByClassName("text")[0];
        
        var newMessage = prompt("Edit message", oldMessage.innerHTML);

        while (!newMessage) {

            newMessage = prompt("Your message is empty! Please, edit message", oldMessage.innerHTML);
        }

        oldMessage.innerHTML = newMessage;
        
        updateMessageList(newMessage, messageList[i]);
        store(messageList);
        
        return;
    }
}

function updateMessageList(_newMessage, _messageList) {

    _messageList.textMessage = _newMessage;
    
    return;
}

function onDeleteMessageButtonClick(eventObj) {

    var parentMessage = eventObj.target.parentNode;
    var messageBox = document.getElementsByClassName("messageBox")[0];
    
    messageBox.removeChild(parentMessage);
    
    var id = parentMessage.attributes["id"].value;
    
    for (var i = 0; i < messageList.length; i++) {
    
        if (messageList[i].id != id) {
        
            continue;
        }
    
        messageList.splice(i, 1);
        store(messageList);
        
        return;
    }
}

function addMessage(message) {
 
    if(!message.textMessage){

		return;
	}
    
	var newMessage = document.createElement("div");
    newMessage.setAttribute("class", "message");
    
    var user = document.createElement("span");
    user.setAttribute("class", "user");
    
    var text = document.createElement("span");
    text.setAttribute("class", "text");
    
    var editMessageButton = document.createElement("img");
    editMessageButton.setAttribute("id", "editMessageButton");
    editMessageButton.setAttribute("src", "css/resources/edit.png");
    
    var deleteMessageButton = document.createElement("img");
    deleteMessageButton.setAttribute("id", "deleteMessageButton");
    deleteMessageButton.setAttribute("src", "css/resources/trash.png");
    
    var contentUsername = document.createTextNode(message.user);
    var contentMessage = document.createTextNode(message.textMessage);
    
    user.appendChild(contentUsername);
    text.appendChild(contentMessage);
    
    newMessage.id = message.id;

    newMessage.appendChild(user);
    newMessage.appendChild(text);
    newMessage.appendChild(editMessageButton);
    newMessage.appendChild(deleteMessageButton);
    
	var messages = document.getElementsByClassName("messageBox")[0];

	messages.appendChild(newMessage);
    messageList.push(message);
    
    return;
}

function login(username) {
 
    var hiddenUserBox = document.getElementsByClassName("hiddenUserBox")[0];
    hiddenUserBox.style.display = "block";
    var hiddenMessageBox = document.getElementsByClassName("hiddenMessageBox")[0];
    hiddenMessageBox.style.display =  "block";
    var promptBackground = document.getElementsByClassName("promt")[0];
    promptBackground.style.display = "block";
    
    var login;
    
    while (!login) {
     
        login = prompt("Enter username", username);
    }
    
    addLogin(login);
    
    promptBackground.style.display = "none";
    hiddenUserBox.style.display = "none";
    hiddenMessageBox.style.display =  "none";
    
    return;
}

function addLogin(value) {
 
    if(!value){

		return;
	}
    
    var username = document.getElementById("username");
    username.innerHTML = value;
    username.style.display = "block";
    
    return;
}

function store(listToSave) {

	if(typeof(Storage) == "undefined") {
        
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("messages list", JSON.stringify(listToSave));
    
    return;
}

function restore(msName) {
    
	if(typeof(Storage) == "undefined") {
        
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem(msName);

	return item && JSON.parse(item);
}