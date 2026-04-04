import { Server } from "socket.io";

import { errorHandler, game } from "#controllers";

import Message from "../../../shared/models/Message.js";

let io;

function connectionHandler(socket) {
	const controller = {
		ping: () => {
			console.log("ping !");
			socket.send(new Message("pong").pack());
		},

		join: () => {
			return;
		},

		enter_hall: async () => {
			socket.join("hall");

			const games = await game.getAll();

			new Message("games_list").loadWith({ games }).sendTo(socket);
		},
	};

	socket.join(socket.request.session.id); //? on inscrit le socket dans un salon nommé d'après son sessionId, pour pouvoir le déconnecter plus tard même sans le socket
	console.log("a user connected:", socket.request.session.id);

	socket.on("message", (encodedMessage) => {
		const { title, payload } = Message.unpack(encodedMessage);

		if (Object.keys(controller).includes(title)) {
			controller[title](payload);
		} else {
			errorHandler.throw(404, `message title not found: ${title}`);
		}
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected:", socket.request.session.id);
	});
}

export default {
	init: (server) => {
		if (io !== undefined) {
			throw new Error("Socketio must only be initialized once.");
		}

		io = new Server(server, { cors: { origin: "*" } });
		io.on("connection", connectionHandler);

		return io;
	},

	io: () => {
		if (io === undefined) {
			throw new Error("Socketio must first be initialized with .init().");
		}

		return io;
	},
};
