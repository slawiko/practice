function run() {
 
    var editBox = document.getElementsByClassName("editBox")[0];
    var sendButton = document.getElementById("sendButton");
    
    console.log(editBox);
    console.log(sendButton);
    
    sendButton.addEventListener("click", delegateEvent);
    
    console.log("runAfterListener");
}

function delegateEvent(eventObj) {
 
    console.log("delegateEvent");
    if (eventObj.type === "click") {
        console.log("delegateEventIF");
        onAddButtonClick(eventObj);
    }
}

function onAddButtonClick() {
 
    var messageText = document.getElementById("textBox");
    console.log("onAddButtonClick");
	addMessage(messageText.innerHTML);
}

function addMessage(value) {
 
    if(!value){
        console.log("!value");
		return;
	}
    console.log("value");
    
	var newMessage = document.createElement("div");
    var content = document.createTextNode(value);
    
    newMessage.appendChild(content);
    
	var messages = document.getElementsByClassName("messageBox")[0];

	messages.appendChild(newMessage);
}