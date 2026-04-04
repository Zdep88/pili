import { Server } from "socket.io";

import { errorHandler, game } from "#controllers";

import Message from "../../../shared/models/Message.js";

let io;

function connectionHandler(socket) {
	const controller = {
		ping: () => {
			console.log("ping !");
			socket.send(new Message("pong").pack());

			return;
		},

		enter_hall: async () => {
			socket.join("hall");

			const games = await game.getAll();

			new Message("games_list").loadWith({ games }).sendTo(socket);

			return;
		},

		enter_room: async ({ room }) => {
			socket.leave("hall");
			socket.join(room);

			const username = socket.id;
			new Message("user_join").loadWith({ username }).sendTo(io.to(room));

			let test = await io.in(room).fetchSockets();
			console.log(
				"all players present:",
				test.map((soc) => soc.id),
			);

			return;
		},
	};

	socket.join(socket.request.session.id); //? on inscrit le socket dans un salon nommé d'après son sessionId, pour pouvoir le déconnecter plus tard même sans le socket
	console.log("a user connected:", socket.id);

	socket.on("message", (encodedMessage) => {
		const { title, payload } = Message.unpack(encodedMessage);

		if (Object.keys(controller).includes(title)) {
			controller[title](payload);
		} else {
			errorHandler.throw(404, `message title not found: ${title}`);
		}
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected:", socket.id);
	});
}

export default {
	init: (server) => {
		if (io !== undefined) {
			throw new Error("Socketio must only be initialized once.");
		}

		io = new Server(server, {
			cors: { origin: "*" },
			connectionStateRecovery: {},
		});
		io.on("connection", connectionHandler);
		io.of("/").adapter.on("join-room", (room, id) => {
			console.log(`socket ${id} has joined room ${room}`);
		});
		io.of("/").adapter.on("leave-room", (room, id) => {
			console.log(`socket ${id} has left room ${room}`);

			const username = id;

			if (room !== "hall") {
				new Message("user_leave").loadWith({ username }).sendTo(io.to(room));
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
