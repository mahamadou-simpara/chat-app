const FormElement = document.getElementById('chat-form');
const socket = io();


socket.on('message', message => {

    outputMessage(message);
    console.log(message);
});



function sendMessage(e) {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = '';

}

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> Mohamed <span> 10 PM </span></p>
    <p class='text'>${message}</p>
    `

    const MessagesContainer = document.querySelector('.chat-messages');

    MessagesContainer.appendChild(div);

  
}


FormElement.addEventListener('submit', sendMessage)