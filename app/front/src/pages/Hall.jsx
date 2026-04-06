import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useWebsocket } from "hooks";

import "styles/hall.css";

export default function () {
	const navigate = useNavigate();

	const [rooms, setRooms] = useState([]);

	const socket = useWebsocket();
	useEffect(() => {
		function onGameListUpdate(gameList) {
			setRooms(gameList);
		}
		function onGameCreated(gameId) {
			navigate(`/games/${gameId}`);
		}

		socket.on("game_list_update", onGameListUpdate);
		socket.on("game_created", onGameCreated);

		socket.emit("enter_hall");

		return () => {
			socket.off("game_list_update", onGameListUpdate);
			socket.off("game_created", onGameCreated);

			socket.emit("leave_hall");
		};
	}, [socket]);

	function createRoom() {
		socket.emit("create_game");
	}

	function Room({ url, name, players }) {
		return (
			<Link to={url}>
				<div className="room">
					<span>{name}</span>
					<span>{players}</span>
				</div>
			</Link>
		);
	}

	return (
		<>
			<title>Pili – Parties</title>

			<div className="rooms">
				<Suspense fallback={<div>Loading...</div>}>
					<button onClick={createRoom}>
						<div className="room new">
							<span>Créer un salon</span>
						</div>
					</button>

					{rooms.map((room) => {
						const url = `/games/${room.id}`;
						const name = `Partie de ${room.owner.username}`;
						const players = `${room.players.length}/${room.max}`;

						return <Room key={room.id} url={url} name={name} players={players} />;
					})}
				</Suspense>
			</div>
		</>
	);
}
