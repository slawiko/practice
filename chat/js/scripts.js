function run() {
 
    var appContainer = document.getElementsByClassName("editBox")[0];
    console.log('run');
    appContainer.addEventListener('click', delegateEvent);
    console.log('runAfterListener');/*что-то не так*/
}

function delegateEvent(eventObj) {
 
    console.log('delegateEvent');
    if (eventObj.type === 'click' && eventObj.target.classList.contains('sendButton')) {
        console.log('delegateEventIF');
        onAddButtonClick(eventObj);
    }
}

function onAddButtonClick() {
 
    var messageText = document.getElementById('textBox');
    console.log('onAddButtonClick');
	addMessage(textBox.value);
	textBox.value = ''; 
}

function addMessage(value) {
 
    if(!value){
        console.log('good');
		return;
	}
    console.log('good');
    
	var message = createItem(value);
	var messages = document.getElementsByClassName('messageBox')[0];

	messages.appendChild(message);
}