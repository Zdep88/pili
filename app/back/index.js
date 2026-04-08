import http from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import { APIRouter, websocket, session } from "#middlewares";

const app = express();
const port = process.env.SERVER_PORT;
const server = http.createServer(app);

// Socket.io :
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", websocket);
io.engine.use(session);

app.use(cors());
app.use(express.json());
app.use(session);

/* debug only */
app.use((req, res, next) => {
	console.log(req.session.id);
	next();
});
/* --- */

app.use(express.static("../front/dist"));
app.use("/api", APIRouter);
app.use((req, res) => {
	res.status(200).sendFile("index.html", { root: "../front/dist" });
});

server.listen(port, () => {
	console.log("backend disponible à l'adresse : http://localhost:" + port);
});
