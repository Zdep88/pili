import { useEffect, useState } from "react";

import { useWebsocket } from "hooks";

import "styles/lobby.css";

export default function () {
	const gameId = window.location.href.split("/").at(-1);

	const [players, setPlayers] = useState([]);
	const [ready, setReady] = useState(false);

	const socket = useWebsocket();
	useEffect(() => {
		function onPlayersUpdate(players) {
			setPlayers(players);
		}

		socket.on("players_update", onPlayersUpdate);

		socket.emit("enter_game", gameId);

		return () => {
			socket.off("players_update", onPlayersUpdate);

			socket.emit("leave_game", gameId);
		};
	}, [socket]);

	function copyUrl(event) {
		navigator.clipboard.writeText(event.currentTarget.textContent).then(() => {
			alert("Lien copié dans le presse-papiers");
		});
	}

	function toggleReady() {
		setReady(!ready);
		socket.emit("player_status_change", ready);
	}

	return (
		<>
			<div className="share">
				<span>Lien de la partie :</span>
				<span className="link" onClick={copyUrl}>
					{window.location.href}
				</span>
			</div>

			<div className="columns">
				<div>
					<h3>Joueurs</h3>
					<ul className="player-list">
						{players.map((player) => (
							<li key={player.id}>{player.username}</li>
						))}
					</ul>
				</div>

				<div>
					<button onClick={toggleReady} data-ready={ready}>
						Je {ready ? "suis" : "ne suis pas"} prêt(e)
					</button>
					<div className="options"></div>
					<button>Quitter la partie</button>
				</div>
			</div>
		</>
	);
}
