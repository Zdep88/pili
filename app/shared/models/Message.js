export default class Message {
	title;
	payload;
	createdAt;

	static receive(encodedMessage) {
		const { title, payload } = JSON.parse(encodedMessage);
		return new this(title, payload);
	}

	constructor(title, payload) {
		if (this.constructor === Message) {
			throw new Error("Message is an abstract class, and therefore cannot be instantiated.");
		}

		this.title = title;
		this.payload = payload;
		this.createdAt = new Date().toUTCString();
	}
}
