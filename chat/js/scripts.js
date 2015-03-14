function run() {
 
    login();
    
    var chatWindow = document.getElementsByClassName("chatWindow")[0];
    chatWindow.addEventListener("click", delegateEvent);
    
    var textBox = document.getElementById("textBox");
    textBox.addEventListener("keydown", delegateEvent);
}

function delegateEvent(eventObj) {
 
    if ((eventObj.target.getAttribute("id") === "sendButton") || (eventObj.keyCode === 13)) {

        onSendButtonClickOrEnter();
    }
    
    if (eventObj.target.getAttribute("id") === "editLoginButton") {
     
        onEditLoginButtonClick();
    }
    
    if (eventObj.target.getAttribute("id") === "logoutButton") {
        
        onLogoutButtonClick();   
    }
}

function onSendButtonClickOrEnter() {
 
    var messageText = document.getElementById("textBox");
	addMessage(messageText.innerHTML);
    messageText.innerHTML = "";
}

function onLogoutButtonClick() {
 
    login();
}

function onEditLoginButtonClick() {
    
    var username = document.getElementById("username");
    var value = username.innerHTML;
    login(value);
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

function login(username) {
 
    var hiddenUserBox = document.getElementsByClassName("hiddenUserBox")[0];
    hiddenUserBox.style.display = "block";
    var hiddenMessageBox = document.getElementsByClassName("hiddenMessageBox")[0];
    hiddenMessageBox.style.display =  "block";
    var promptBackground = document.getElementsByClassName("promt")[0];
    promptBackground.style.display = "block";
    
    var login;
    
    while (!login) {
     
        login = prompt("Enter username", "user");
    }
    
    addLogin(login);
    promptBackground.style.display = "none";
    hiddenUserBox.style.display = "none";
    hiddenMessageBox.style.display =  "none";
}