import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

import { socket } from "../socket.js";

import Message from "@shared/models/Message.js";
class ClientMessage extends Message {
	constructor(title, payload) {
		super(title, payload);
	}

	send() {
		socket.send(JSON.stringify(this));
	}
}

export default function () {
	const [isConnected, setIsConnected] = useState(socket.connected);
	// const location = useLocation();

	// useEffect(() => {
	// 	console.log("Location changed");
	// }, [location]);

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
		const message = ClientMessage.receive(encodedMessage);

		switch (message.title) {
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
