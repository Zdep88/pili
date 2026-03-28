import 'dotenv/config';
import express from 'express';
import socketio from "socket.io";
// fichiers locaux :
import routerBack from './back/router.js';
import websocket from './back/websocket.js';

const app = express();

// Socket.io :
// const io = new socketio.Server(app);
// io.on('connection', websocket);

app.use('/api', routerBack);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('http://localhost:' + port);
});