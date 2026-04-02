import Message from "../../../shared/models/Message.js";

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
	new ServerMessage("conn_accepted", { id: socket.id }).send();

	socket.on("disconnect", () => {
		console.log("a user disconnected:", socket.id);
	});

	socket.on("message", (encodedMessage) => {
		const { title, payload } = ServerMessage.receive(encodedMessage);

		switch (title) {
			case "ping":
				console.log("ping !");
				new ServerMessage("pong").send();
				break;

			default:
				throw new Error("Unhandled message:", title);
		}
	});
};
