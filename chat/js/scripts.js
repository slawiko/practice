function run() {
 
    var appContainer = document.getElementById("textAndButton");
    
    appContainer.addEventListener('click', delegateEvent); //тут ошибка
}

function delegateEvent(eventObj) {
 
    if (eventObj.type === 'click' && eventObj.target.classList.contains('sendButton')) {
        
        onAddButtonClick(eventObj);
    }
}

function onAddButtonClick() {
 
    var messageText = document.getElementById('textBox');

	addMessage(textBox.value);
	textBox.value = ''; 
}

function addMessage(value) {
 
    if(!value){
        
		return;
	}
    
	var message = createItem(value);
	var messages = document.getElementsByClassName('messageBox')[0];

	messages.appendChild(message);
}