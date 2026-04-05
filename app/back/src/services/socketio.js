import { Server } from "socket.io";

import { websocket as websocketController } from "#controllers";

let io;

export default {
	init: (httpServer) => {
		if (io !== undefined) {
			throw new Error("Socketio must only be initialized once.");
		}

		io = new Server(httpServer, {
			cors: { origin: "*" },
			connectionStateRecovery: {},
		});

		io.of("/").adapter.on("join-room", websocketController(io).joinRoom);
		io.of("/").adapter.on("leave-room", websocketController(io).leaveRoom);
		io.on("connection", onConnection);

		return io;
	},

	io: () => {
		if (io === undefined) {
			throw new Error("Socketio must first be initialized with .init().");
		}

		return io;
	},
};

function onConnection(socket) {
	console.log(`socket ${socket.id} just connected`);

	socket.join(socket.request.session.id);
	//? on inscrit le socket dans un salon nommé d'après son sessionId, pour pouvoir le déconnecter plus tard même sans le socket

	if (process.env.NODE_ENV === "development") {
		socket.onAny((event, ...args) => {
			console.log("event received:", event, args, socket.id);
		});
	}

	socket.on("enter_hall", websocketController(io, socket).enterHall);
	socket.on("leave_hall", websocketController(io, socket).leaveHall);
	socket.on("create_game", websocketController(io, socket).createGame);
	socket.on("enter_game", websocketController(io, socket).enterGame);
	socket.on("player_status_change", websocketController(io, socket).playerStatusChange);
	socket.on("leave_game", websocketController(io, socket).leaveGame);
	socket.on("disconnect", websocketController(io, socket).disconnect);
}
