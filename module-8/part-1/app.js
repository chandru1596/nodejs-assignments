import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4800;
const users = {}; 

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('nick', (nickname) => {
        users[socket.id] = nickname || 'Anonymous';
        console.log(`User ${socket.id} set nickname to: ${users[socket.id]}`);

        socket.emit('nick', { chat: true });

        io.emit('userList', Object.values(users));
    });

    socket.on('chat', (message) => {
        const nickname = users[socket.id] || 'Anonymous';
        const timestamp = moment().format("h:mm A");

        const payload = {
            name: nickname,
            message,
            time: timestamp 
        };

        io.emit('chat', payload);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        delete users[socket.id];

        io.emit('userList', Object.values(users));
    });
});

server.listen(port, () => {
    console.log('Server running on port', port);
});
