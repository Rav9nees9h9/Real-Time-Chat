/*const { emit } = require("nodemon");
const { message } = require("prompt");
*/
const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ding-36029.mp3');

const append = (message, position) => 
{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
const nameVal = prompt ("Please enter your name to join the chat");
    

socket.emit("new-user-joined", nameVal);
socket.on("user-joined", nameVal=>
 {
    append(`${nameVal} joined the chat`, 'right');

})
socket.on('receive', data =>
 {
    append(`${data.nameVal}: ${data.massage}`, 'left')

})
socket.on('left', nam =>
 {
    append(`${data.nameVal} left the chat`, 'right')

})