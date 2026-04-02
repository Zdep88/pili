import { Suspense, use } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "hooks";

export default function () {
	function RoomList(props) {
		const rooms = use(props.rooms);

		return (
			<>
				{rooms.map((room) => (
					<Link key={room.id} to={`/game/${room.id}`}>
						<div className="box">Room #{room.id}</div>
					</Link>
				))}
			</>
		);
	}

	const fetchRooms = useFetch("GET", "rooms");

	return (
		<>
			<style>{`
                .box {
                    height: 200px;
                    width: 200px;
                    border-radius: 5px;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                }
            `}</style>

			<Suspense fallback={<div>Loading...</div>}>
				<RoomList rooms={fetchRooms} />
			</Suspense>
		</>
	);
}
