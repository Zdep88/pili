export default class Message {
	title;
	payload;

	static unpack(encodedMessage) {
		return JSON.parse(encodedMessage);
	}

	constructor(title) {
		this.title = title;
	}

	loadWith(payload) {
		this.payload = payload;

		return this;
	}

	pack() {
		return JSON.stringify({
			title: this.title,
			payload: this.payload,
			sentAt: new Date().toUTCString(),
		});
	}

	sendTo(target) {
		if (target?.emit === undefined) {
			throw new Error(`Invalid target for message: ${target}`);
		}

		target.emit("message", this.pack());
	}
}
