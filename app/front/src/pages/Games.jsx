import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useWebsocket } from "hooks";

import "styles/games.css";

export default function () {
	const [rooms, setRooms] = useState([]);

	const socket = useWebsocket();
	useEffect(() => {
		function onGameListUpdate(gameList) {
			setRooms(gameList);
		}

		socket.on("game_list_update", onGameListUpdate);

		socket.emit("enter_hall");

		return () => {
			socket.off("game_list_update", onGameListUpdate);

			socket.emit("leave_hall");
		};
	}, [socket]);

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
		<div className="rooms">
			<Suspense fallback={<div>Loading...</div>}>
				<Link to="/games/new">
					<div className="room new">
						<span>Créer un salon</span>
					</div>
				</Link>

				{rooms.map((room) => {
					const url = `/games/${room.id}`;
					const name = `Partie de ${room.owner.username}`;
					const players = `${room.players.length}/${room.max}`;

					return <Room key={room.id} url={url} name={name} players={players} />;
				})}
			</Suspense>
		</div>
	);
}
