import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

import { useSocket } from "hooks";

import Message from "@shared/models/Message.js";

export default function () {
	const socket = useSocket();
	const [isConnected, setIsConnected] = useState(socket.connected);

	class ClientMessage extends Message {
		send() {
			socket.send(JSON.stringify(this));
		}

		constructor(title, payload) {
			super(title, payload);
		}
	}

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

	function onConnect() {
		setIsConnected(true);
		console.warn("socket connected");
	}

	function onDisconnect() {
		setIsConnected(false);
		console.warn("socket disconnected");
	}

	function onMessage(encodedMessage) {
		const { title, payload } = ClientMessage.receive(encodedMessage);

		switch (title) {
			case "conn_accepted":
				break;

			case "pong":
				alert("pong !");
				break;

			default:
				throw new Error("Unhandled message:", title);
		}
	}

	function connect() {
		socket.connect();
	}

	function disconnect() {
		socket.disconnect();
	}

	function ping() {
		new ClientMessage("ping").send();
	}

	return (
		<>
			{isConnected ? (
				<>
					<p>Connecté</p>
					<button onClick={disconnect}>Disconnect</button>
					<br />
					<button onClick={ping}>Send message</button>
				</>
			) : (
				<>
					<p>Déconnecté</p>
					<button onClick={connect}>Connect</button>
				</>
			)}
		</>
	);
}
