'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const publicDir = express.static(`${__dirname}/public`);

app.use(publicDir);

app.get('/', (req, res) => res.sendFile(`${publicDir}/index.html`));

http.listen(port, () => console.log(`Running server on localhost:${port}`));

io.on('connection', (socket) => {
    socket.broadcast.emit('new user', {message: 'New user has been connected', nodeVersion: WEBSITE_NODE_DEFAULT_VERSION});

    socket.on('new message', message => io.emit('new message', message));

    socket.on('disconnect', () => socket.broadcast.emit('user disconnected', {message: 'An user left the chat'}));
});