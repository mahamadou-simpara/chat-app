const FormElement = document.getElementById('chat-form');
const socket = io();
const MessagesContainer = document.querySelector('.chat-messages');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// console.log(username, room);

socket.emit('joinRoom', {username, room})


socket.on('message', message => {

    outputMessage(message);
    // console.log(message);


    MessagesContainer.scrollTop = MessagesContainer.scrollHeight
});



function sendMessage(e) {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);


    e.target.elements.msg.value = '';
};

function outputMessage(message) {

    // console.log(message);
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class='text'>${message.message}</p>
    `

    

    MessagesContainer.appendChild(div);

  
}


FormElement.addEventListener('submit', sendMessage)