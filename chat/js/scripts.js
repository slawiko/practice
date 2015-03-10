function run() {
 
    var appContainer = document.getElementsByClassName("editBox")[0];
    console.log("run");
    appContainer.addEventListener("click", delegateEvent);
    console.log("runAfterListener");
}

function delegateEvent(eventObj) {
 
    console.log("delegateEvent");
    if (eventObj.type === "click" && eventObj.target.getAttribute("id") === "sendButton") {
        console.log("delegateEventIF");
        onAddButtonClick(eventObj);
    }
}

function onAddButtonClick() {
 
    var messageText = document.getElementById("message");
    console.log("onAddButtonClick");
	addMessage(message.value);
	textBox.value = ''; 
}

function addMessage(value) {
 
    if(!value){
        console.log("!value");
		return;
	}
    console.log("value");
    
	var message = createItem(value);
	var messages = document.getElementsByClassName("messageBox")[0];

	messages.appendChild(message);
}