import { Suspense, use } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "hooks";

export default function () {
	function RoomList({ rooms }) {
		return (
			<>
				{use(rooms).map((room) => (
					<Link key={room.id} to={`/game/${room.id}`}>
						<div className={`room ${room.private ? "private" : ""}`}>
							<span>{room.name !== undefined ? room.name : `Room #${room.id}`}</span>
							<span>
								{room.players}/{room.max}
							</span>
						</div>
					</Link>
				))}
			</>
		);
	}

	return (
		<>
			<div className="rooms">
				<Suspense fallback={<div>Loading...</div>}>
					<RoomList rooms={useFetch("GET", "rooms")} />
				</Suspense>
			</div>

			<style>{`
                .rooms {
                    display: flex;
                    gap: 2rem;
                }

                .room {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 0.8em;
                    height: 200px;
                    width: 200px;
                    border-radius: 5px;
                    color: white;
                    transition: scale 0.25s;
                    background-color: rgba(2, 170, 227, 0.8);

                    &:hover {
                        scale: 1.1;
                    }

                    &.private {
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                }
            `}</style>
		</>
	);
}
