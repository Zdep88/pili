import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import { Server as socketio } from "socket.io";
// fichiers locaux :
import routerBack from './back/router.js';
import websocket from './back/websocket.js';

const app = express();
app.use(express.json());
app.use(express.static('app/public'));
app.use(cors({ origin: '*' }));

// Socket.io :
// const io = new socketio(app);
// io.on('connection', websocket);

app.use('/api', routerBack);
app.use((req, res) => {
    res.status(301).sendFile('index.html', { root: 'app/public' });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('http://localhost:' + port + '/api');
});