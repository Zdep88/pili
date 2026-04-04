import { useEffect, useState } from "react";

import { useWebsocket } from "hooks";

import "styles/lobby.css";

export default function () {
	const roomId = window.location.href.split("/").at(-1);

	const [players, setPlayers] = useState([]);

	const socket = useWebsocket();

	useEffect(() => {
		socket.on("user_join", onUserJoin);
		socket.on("user_leave", onUserLeave);

		socket.emit("enter_room", { room: roomId });

		return () => {
			socket.emit("leave_room", { room: roomId });

			socket.off("user_join", onUserJoin);
			socket.off("user_leave", onUserLeave);
		};
	}, []);

	function onUserJoin({ username }) {
		console.log(username, "joined lobby");
		setPlayers((players) => [...players, username]);
	}

	function onUserLeave({ username }) {
		console.log(username, "left lobby");
		setPlayers((players) => players.filter((player) => player !== username));
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
					<li key="player">{player}</li>
				))}
			</ul>
		</>
	);
}
