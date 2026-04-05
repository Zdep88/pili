import { useEffect, useState } from "react";

import { useWebsocket } from "hooks";

import "styles/lobby.css";

export default function () {
	const roomId = window.location.href.split("/").at(-1);

	const [players, setPlayers] = useState([]);

	const socket = useWebsocket();

	useEffect(() => {
		socket.on("players_update", onPlayersUpdate);

		socket.emit("enter_room", { roomId });

		return () => {
			socket.off("players_update", onPlayersUpdate);

			socket.emit("leave_room", { roomId });
		};
	}, [socket]);

	function onPlayersUpdate({ players }) {
		setPlayers(players);
	}

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
					<li key={player}>{player}</li>
				))}
			</ul>
		</>
	);
}
