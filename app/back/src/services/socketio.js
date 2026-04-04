import { Server } from "socket.io";

import { game } from "#controllers";

let io;

export default {
	init: (server) => {
		if (io !== undefined) {
			throw new Error("Socketio must only be initialized once.");
		}

		io = new Server(server, {
			cors: { origin: "*" },
			connectionStateRecovery: {},
		});
		io.on("connection", onConnection);
		io.of("/").adapter.on("join-room", (room, id) => {
			console.log(`socket ${id} has joined room ${room}`);
		});
		io.of("/").adapter.on("leave-room", (room, id) => {
			console.log(`socket ${id} has left room ${room}`);

			const username = id;

			if (room !== "hall") {
				io.to(room).emit("user_leave", { username });
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

		socket.emit("games_list", { games });

		return;
	}

	async function onEnterRoom({ room }) {
		socket.leave("hall");
		socket.join(room);

		const username = socket.id;

		io.to(room).emit("user_join", { username });

		let test = await io.in(room).fetchSockets();
		console.log(
			"all players present:",
			test.map((soc) => soc.id),
		);

		return;
	}

	async function onLeaveRoom({ room }) {
		socket.leave(room);

		const username = socket.id; //! à changer
		io.to(room).emit("user_leave", { username });

		return;
	}
}
