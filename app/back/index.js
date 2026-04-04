import http from "node:http";
import express from "express";
import cors from "cors";

import { socketio } from "#services";
import { router, session } from "#middlewares";

const app = express();
const port = process.env.SERVER_PORT;
const server = http.createServer(app);

// Socket.io :
socketio.init(server);
const io = socketio.io();
io.engine.use(session);

app.use(cors());
app.use(express.json());
app.use(session);

app.use(express.static(process.env.SERVER_PATH_BUILT_FRONT));
app.use("/api", router);
app.use((req, res) => {
	res.status(200).sendFile("index.html", { root: process.env.SERVER_PATH_BUILT_FRONT });
});

server.listen(port, () => {
	console.log("backend disponible à l'adresse : http://localhost:" + port);
});
