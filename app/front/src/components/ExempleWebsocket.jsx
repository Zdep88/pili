import { useWebsocket } from "hooks";

export default function () {
	const ws = useWebsocket();

	ws.on("pong", () => {
		alert("pong");
	});

	function ping() {
		ws.send("ping");
	}

	return (
		<>
			<button onClick={ping}>Ping server</button>
		</>
	);
}
