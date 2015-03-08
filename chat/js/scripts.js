function run() {
 
    var appContainer = document.getElementById("textBox");
    
    appContainer.addEventListener('click', delegateEvent);
    appContainer.addEventListener('change', delegateEvent);
    
}

function delegateEvent(eventObj) {
 
    if (eventObj.type === 'click' && eventObj.target.classList.contains('')) {
    }
    if (eventObj.type === 'change' && eventObj.target.classList.contains(''))
    
}