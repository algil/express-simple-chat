(function(io) {
    'use strict';

    var io = io();
    var chatForm = document.querySelector('#chat-form');
    var messageText = document.querySelector('#message-text');
    var chat = document.querySelector('#chat');

    chatForm.onsubmit = function(event) {
        event.preventDefault();
        io.emit('new message', messageText.value);
        messageText.value = null;
        return false;
    }

    io.on('new user', function(newUser) {
        console.log(newUser);
    });

    io.on('user disconnected', function(data) {
        //alert(data.message);
    });

    io.on('new message', function (message) {
        chat.insertAdjacentHTML('beforeend', '<li>' + message + '</li>');
    });
})(io);
