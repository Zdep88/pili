import { useEffect, useState } from "react";

import { useWebsocket } from "hooks";

import "styles/lobby.css";

export default function () {
	const [players, setPlayers] = useState([]);

	const ws = useWebsocket();

	const roomId = window.location.href.split("/").at(-1);

	useEffect(() => {
		ws.on("user_join", ({ username }) => {
			console.log(username, "joined lobby");
			setPlayers((players) => [...players, username]);
		});

		ws.on("user_leave", ({ username }) => {
			alert("ok");
		});

		ws.send("enter_room", { room: roomId });

		return () => {
			ws.socket.off("message");
		};
	}, []);

	function copyUrl(event) {
		navigator.clipboard.writeText(event.currentTarget.textContent).then(() => {
			alert("Lien copié dans le presse-papiers");
		});
	}

	return (
		<>
			<div className="share">
				<span>Lien de la partie :</span>
				<span className="link" onClick={copyUrl}>
					{window.location.href}
				</span>
			</div>

			<ul className="player-list">
				{players.map((player) => (
					<li key="player">{player}</li>
				))}
			</ul>
		</>
	);
}
