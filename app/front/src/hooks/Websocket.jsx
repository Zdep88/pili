import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

export default function () {
	useEffect(() => {
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, [socket]);

	function onConnect() {}
	function onDisconnect() {}

	return socket;
}
