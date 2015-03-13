function run() {
 
    var editBox = document.getElementsByClassName("editBox")[0];
    var sendButton = document.getElementById("sendButton");
    
    sendButton.addEventListener("click", delegateEvent);
}

function delegateEvent(eventObj) {
 
    if (eventObj.type === "click") {

        onAddButtonClick(eventObj);
    }
}

function onAddButtonClick() {
 
    var messageText = document.getElementById("textBox");
	addMessage(messageText.innerHTML);
    messageText.innerHTML = '';
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