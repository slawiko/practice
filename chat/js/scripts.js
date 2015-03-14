function run() {
 
    var chatWindow = document.getElementsByClassName("chatWindow")[0];
    
    chatWindow.addEventListener("click", delegateEvent);
}

function delegateEvent(eventObj) {
 
    if ((eventObj.type === "click") && (eventObj.target.getAttribute("id") == "sendButton")) {

        onSendButtonClick(eventObj);
    }
    if ((eventObj.type === "click") && (eventObj.target.getAttribute("id") == "confirmLoginButton")) {

        onConfirmLoginButtonClick(eventObj);
    }
}

function onSendButtonClick() {
 
    var messageText = document.getElementById("textBox");
	addMessage(messageText.innerHTML);
    messageText.innerHTML = "";
}

function onConfirmLoginButtonClick() {
 
    var login = document.getElementById("login");
    addLogin(login.innerHTML);
    login.innerHTML = "";
}

function addMessage(value) {
 
    if(!value){

		return;
	}
    
	var newMessage = document.createElement("div");
    var content = document.createTextNode(value);
    
    newMessage.appendChild(content);
    
	var messages = document.getElementsByClassName("messageBox")[0];

	messages.appendChild(newMessage);
}

function addLogin(value) {
 
    if(!value){

		return;
	}
    
    var username = document.getElementById("username");
    username.innerHTML = value;
    username.style.display = "block";
    /*var content = document.createTextNode(value);
    
    username.appendChild(content);
    
    var userBox = document.getElementsByClassName("userBox")[0];
    
    userBox.appendChild(username);*/
}