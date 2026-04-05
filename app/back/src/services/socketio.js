import { Server } from "socket.io";

import { game } from "#controllers";

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

		io.on("connection", onConnection);

		io.of("/").adapter.on("join-room", (roomId, socketId) => {
			console.log(`socket ${socketId} has joined room ${roomId}`);
		});
		io.of("/").adapter.on("leave-room", async (roomId, socketId) => {
			console.log(`socket ${socketId} has left room ${roomId}`);

			if (roomId !== "hall") {
				const players = (await io.in(roomId).fetchSockets()).map((s) => s.id);

				io.to(roomId).emit("players_update", { players });
			}
		});

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
	socket.join(socket.request.session.id);
	//? on inscrit le socket dans un salon nommé d'après son sessionId, pour pouvoir le déconnecter plus tard même sans le socket
	console.log("a user connected:", socket.id);

	socket.on("ping", onPing);
	socket.on("enter_hall", onEnterHall);
	socket.on("enter_room", onEnterRoom);
	socket.on("leave_room", onLeaveRoom);

	socket.on("disconnect", () => {
		console.log("a user disconnected:", socket.id);
	});

	function onPing() {
		console.log("ping !");
		socket.emit("pong");

		return;
	}

	async function onEnterHall() {
		socket.join("hall");

		const games = await game.getAll();

		socket.emit("game_list_update", { games });

		return;
	}

	async function onEnterRoom({ roomId }) {
		socket.leave("hall");
		socket.join(roomId);

		const players = (await io.in(roomId).fetchSockets()).map((s) => s.id);

		io.to(roomId).emit("players_update", { players });

		return;
	}

	async function onLeaveRoom({ roomId }) {
		socket.leave(roomId);

		const players = (await io.in(roomId).fetchSockets()).map((s) => s.id);

		io.to(roomId).emit("players_update", { players });

		return;
	}
}
