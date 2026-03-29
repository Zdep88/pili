import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

import { socket } from "../socket.js";

export default function WSClient() {
	const [isConnected, setIsConnected] = useState(socket.connected);

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

	function onMessage(data) {
		console.log("message received:", data);
	}

	function connect() {
		socket.connect();
	}

	function disconnect() {
		socket.disconnect();
	}

	function message() {
		socket.send("taraca");
	}

	return (
		<>
			{isConnected ? (
				<>
					<p>Connecté</p>
					<button onClick={disconnect}>Disconnect</button>
				</>
			) : (
				<>
					<p>Déconnecté</p>
					<button onClick={connect}>Connect</button>
				</>
			)}

			<br />

			<button onClick={message}>Message</button>
		</>
	);
}
