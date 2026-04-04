import { useEffect } from "react";

import { useWebsocket } from "hooks";

export default function () {
	const socket = useWebsocket();

	useEffect(() => {
		socket.on("pong", onPong);

		return () => {
			socket.off("pong", onPong);
		};
	}, [socket]);

	function onPong() {
		alert("pong");
	}

	function ping() {
		socket.emit("ping");
	}

	return <button onClick={ping}>Ping server</button>;
}
