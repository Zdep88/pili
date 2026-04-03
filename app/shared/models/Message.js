export default class Message {
	title;
	payload;
	createdAt;

	static receive(encodedMessage) {
		return JSON.parse(encodedMessage);
	}

	constructor(title) {
		if (this.constructor === Message) {
			throw new Error("Message is an abstract class, and therefore cannot be instantiated.");
		}

		this.title = title;
		this.createdAt = new Date().toUTCString();
	}
}
