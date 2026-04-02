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

app.use(express.static("app/public"));
app.use("/api", APIRouter);
app.use((req, res) => {
	if (process.env.NODE_ENV === "production") {
		//! HTTP_301 n'est pas valide car le serveur sert normalement une page html. Ce n'est pas une redirection permanente d'une ressource qui existait à une précédente adresse vers une nouvelle adresse.
		//? Je laisse pour le moment, au cas où Ultra en a besoin.
		res.status(301).sendFile("index.html", { root: "../front/dist" });
	} else {
		res.set("Content-Type", "text/plain").send("Server opérationnel");
	}
});

server.listen(port, () => {
	console.log("backend disponible à l'adresse : http://localhost:" + port);
});
