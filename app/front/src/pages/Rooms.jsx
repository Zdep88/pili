import { Suspense, use } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "hooks";
import { utils } from "scripts";

import "styles/rooms.css";

export default function () {
	function askToJoin(event) {
		// event.preventDefault();
	}

	function askToCreate(event) {
		// event.preventDefault();
	}

	function Room({ url, name, players, isPrivate }) {
		return (
			<Link to={url} onClick={askToJoin}>
				<div className={utils.makeClassName("room", ["private", isPrivate])}>
					<span>{name}</span>
					<span>{players}</span>
				</div>
			</Link>
		);
	}

	function RoomList({ rooms }) {
		return (
			<>
				{use(rooms).map((room) => {
					const url = `/game/${room.id}`;
					const name = room.name !== undefined ? room.name : `Room #${room.id}`;
					const players = `${room.players}/${room.max}`;

					return (
						<Room
							key={room.id}
							url={url}
							name={name}
							players={players}
							isPrivate={room.private}
						/>
					);
				})}
			</>
		);
	}

	return (
		<div className="rooms">
			<Suspense fallback={<div>Loading...</div>}>
				<Link to="/game/new" onClick={askToCreate}>
					<div className="room new">
						<span>Créer un salon</span>
					</div>
				</Link>

				<RoomList rooms={useFetch("GET", "rooms")} />
			</Suspense>
		</div>
	);
}
