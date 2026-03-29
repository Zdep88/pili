import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'node:http'
import { Server } from "socket.io";

import routerBack from './back/router.js';
import websocket from './back/websocket.js';

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

// Socket.io :
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', websocket);

app.use(express.json());
app.use(express.static('app/public'));
app.use(cors());

app.use('/api', routerBack);
app.use((req, res) => {
    res.status(301).sendFile('index.html', { root: 'app/public' });
});

server.listen(port, () => {
    console.log('http://localhost:' + port + '/api');
});