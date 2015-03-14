function run() {
 
    var promptBackground = document.getElementsByClassName("promt")[0];
    promptBackground.style.background = "rgba(0, 0, 0, 0.5)";
    var login;
    
    while (!login) {
     
        login = prompt("Enter username");
    }
    
    addLogin(login);
    promptBackground.style.display = "none";
    
    var chatWindow = document.getElementsByClassName("chatWindow")[0];
    chatWindow.addEventListener("click", delegateEvent);
    var textBox = document.getElementById("textBox");
    textBox.addEventListener("keydown", delegateEvent);
}

function delegateEvent(eventObj) {
 
    if (eventObj.target.getAttribute("id") === "sendButton") {

        onSendButtonClickOrEnter(eventObj);
    }
    
    if (eventObj.keyCode === 13) {
        
        onSendButtonClickOrEnter(eventObj);
    }
}

function onSendButtonClickOrEnter() {
 
    var messageText = document.getElementById("textBox");
	addMessage(messageText.innerHTML);
    messageText.innerHTML = "";
}

function onConfirmLoginButtonClick() { //Shit 
 
    var login = document.getElementById("login");
    var username = document.getElementById("username");
    
    if (username.innerHTML)
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
}