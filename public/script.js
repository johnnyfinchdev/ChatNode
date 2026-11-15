const socket = io();
const formMsg = document.getElementById('form');
const inputMsg = document.getElementById('input');
const messages = document.getElementById('messages');
const messagesBox = document.getElementById('messages-box');
const editBtn = document.getElementById('editBtn')
const avatarDialog = document.getElementById("avatarDialog");
const cancelButton = document.getElementById("cancel");
const avatarForm = document.getElementById("avatarForm");

formMsg.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputMsg.value) {
        socket.emit('chat message', inputMsg.value);
        inputMsg.value = '';
    }
});

socket.on('chat message', function (data) {
    const item = document.createElement('li');
    item.textContent = data.name + ': ' + data.msg;
    messages.appendChild(item);
    messagesBox.scrollTo(0, messagesBox.scrollHeight);
});

editBtn.addEventListener('click', function (e) {
    e.preventDefault()
    avatarDialog.showModal();
})

cancelButton.addEventListener("click", function () {
    avatarDialog.close();
});

avatarForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(avatarForm);
    for (const [name, value] of data) {
        console.log(name, ":", value)
    }
    avatarDialog.close();
});