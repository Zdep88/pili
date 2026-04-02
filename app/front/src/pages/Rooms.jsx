import { Suspense, use } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "hooks";

import "styles/rooms.css";

export default function () {
	function RoomList({ rooms }) {
		return (
			<>
				{use(rooms).map((room) => {
					const url = `/game/${room.id}`;
					const name = room.name !== undefined ? room.name : `Room #${room.id}`;
					const players = `${room.players}/${room.max}`;
					const arrClass = ["room"];
					if (room.private) {
						arrClass.push("private");
					}

					return (
						<Link key={room.id} to={url}>
							<div className={arrClass.join(" ")}>
								<span>{name}</span>
								<span>{players}</span>
							</div>
						</Link>
					);
				})}
			</>
		);
	}

	return (
		<div className="rooms">
			<Suspense fallback={<div>Loading...</div>}>
				<RoomList rooms={useFetch("GET", "rooms")} />
			</Suspense>
		</div>
	);
}
