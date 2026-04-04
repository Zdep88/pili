import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Message from "@shared/models/Message.js";

const socket = io(import.meta.env.VITE_SERVER_URL);

class WebsocketMessageHandler {
	handledMessages = new Map();

	on(event, listener) {
		this.handledMessages.set(event, listener);
	}

	send(title, payload) {
		new Message(title).loadWith(payload).sendTo(socket);
	}
}

export default function () {
	function onConnect() {
		// setIsConnected(true);
		console.warn("socket connected");
	}

	function onDisconnect() {
		// setIsConnected(false);
		console.warn("socket disconnected");
	}

	function onMessage(encodedMessage) {
		const { title, payload } = Message.unpack(encodedMessage);

		if (ws.handledMessages.has(title)) {
			return ws.handledMessages.get(title)(payload);
		}

		if (title === "conn_accepted") {
			return;
		}

		throw new Error("Unhandled message:", title);
	}

	// const [isConnected, setIsConnected] = useState(socket.connected);
	const ws = new WebsocketMessageHandler();

	useEffect(() => {
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("message", onMessage);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("message", onMessage);
		};
	}, []);

	return ws;
}
