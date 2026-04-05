import { Server } from "socket.io";

import { game as gameController, player as playerController } from "#controllers";

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
		io.of("/").adapter.on("join-room", onJoinRoom);
		io.of("/").adapter.on("leave-room", onLeaveRoom);

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

	if (process.env.NODE_ENV === "development") {
		socket.onAny((event, ...args) => {
			console.log("event received:", event, args, socket.id);
		});
	}

	socket.on("enter_hall", onEnterHall);
	socket.on("leave_hall", onLeaveHall);
	socket.on("create_game", onCreateGame);
	socket.on("enter_game", onEnterGame);
	socket.on("player_status_change", onPlayerStatusChange);
	socket.on("leave_game", onLeaveGame);
	socket.on("disconnect", onDisconnect);

	async function onEnterHall() {
		if (!isInHall(socket)) {
			socket.join("hall");

			const gameList = await gameController.getAll();
			socket.emit("game_list_update", gameList);
		}

		return;
	}

	async function onLeaveHall() {
		if (isInHall(socket)) {
			socket.leave("hall");
		}

		return;
	}

	async function onCreateGame() {
		if (!isInAnyGame(socket)) {
			const gameId = await gameController.create();

			socket.emit("game_created", gameId);
		}

		return;
	}

	async function onEnterGame(gameId) {
		if (!isInGame(socket, gameId)) {
			if (isInHall(socket)) {
				socket.leave("hall");
			}

			socket.join(`game-${gameId}`);
			await playerController.join(socket.id, gameId);

			const { players } = await gameController.getOne(gameId);
			io.to(`game-${gameId}`).emit("players_update", players);
		}

		return;
	}

	async function onPlayerStatusChange(isReady) {
		//! change isReady in database
	}

	async function onLeaveGame(gameId) {
		if (isInGame(socket, gameId)) {
			socket.leave(`game-${gameId}`);

			await playerController.leave(socket.id, gameId);

			const { players } = await gameController.getOne(gameId);
			io.to(`game-${gameId}`).emit("players_update", players);
		}

		return;
	}

	async function onDisconnect(reason) {
		console.log(`socket ${socket.id} disconnected: ${reason}`);

		return;
	}
}

async function onJoinRoom(roomId, socketId) {
	// console.log(`socket ${socketId} has joined room ${roomId}`);

	return;
}

async function onLeaveRoom(roomId, socketId) {
	// console.log(`socket ${socketId} has left room ${roomId}`);

	if (roomId.startsWith("game-")) {
		const gameId = roomId.slice(5);
		const playerId = socketId;

		await playerController.leave(playerId, gameId);

		const { players } = await gameController.getOne(gameId);
		io.to(`game-${gameId}`).emit("players_update", players);
	}

	return;
}

function isInHall(socket) {
	return socket.rooms.has("hall");
}
function isInAnyGame(socket) {
	return [...socket.rooms].find((r) => r.startsWith("game-")) !== undefined;
}
function isInGame(socket, gameId) {
	return socket.rooms.has(`game-${gameId}`);
}
