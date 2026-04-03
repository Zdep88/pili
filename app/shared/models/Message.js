export default class Message {
	#socket;
	set socket(socketio) {
		this.#socket = socketio;
	}

	title;
	payload;
	createdAt;

	static receive(encodedMessage) {
		return JSON.parse(encodedMessage);
	}

	send(payload) {
		if (this.#socket === undefined) {
			throw new Error("Message.socket is not defined.");
		}

		const messageWithPayload = Object.assign(this, { payload });

		this.#socket.send(JSON.stringify(messageWithPayload));
	}

	constructor(title) {
		if (this.constructor === Message) {
			throw new Error("Message is an abstract class, and therefore cannot be instantiated.");
		}

		this.title = title;
		this.createdAt = new Date().toUTCString();
	}
}
