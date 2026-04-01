import Message from "../../shared/models/Message.js";

export default (socket) => {
	class ServerMessage extends Message {
		constructor(title, payload) {
			super(title, payload);
		}

		send() {
			socket.send(JSON.stringify(this));
		}
	}

	console.log("a user connected:", socket.id);

	socket.on("disconnect", () => {
		console.log("a user disconnected:", socket.id);
	});

	socket.on("message", (message) => {
		const decodedMessage = JSON.parse(message);

		switch (decodedMessage.title) {
			case "ping":
				new ServerMessage("pong").send();
				break;

			default:
				throw new Error("Unhandled message:", title);
		}
	});
};
