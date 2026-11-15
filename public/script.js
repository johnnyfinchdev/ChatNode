const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const messagesBox = document.getElementById('messages-box');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function (data) {
    const item = document.createElement('li');
    console.log(data)
    item.textContent = data.name + ': ' + data.msg;
    messages.appendChild(item);
    messagesBox.scrollTo(0, messagesBox.scrollHeight);
});