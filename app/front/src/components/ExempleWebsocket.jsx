import { useEffect } from "react";

import { useWebsocket } from "hooks";

export default function () {
	const socket = useWebsocket();

	useEffect(() => {
		socket.on("conn_accepted", onConnAccepted);
		socket.on("pong", onPong);

		return () => {
			socket.off("conn_accepted", onConnAccepted);
			socket.off("pong", onPong);
		};
	}, []);

	function onPong() {
		alert("pong");
	}

	function onConnAccepted(data) {
		console.log(data);
	}

	function ping() {
		socket.emit("ping");
	}

	return <button onClick={ping}>Ping server</button>;
}
