import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useWebsocket } from "hooks";

import "styles/lobby.css";
import "styles/newGame.css";

export default function () {
	const gameId = window.location.href.split("/").at(-1);

	const navigate = useNavigate();

	const [players, setPlayers] = useState([]);
	const [displayPage, setDisplayPage] = useState(false);
	const [ready, setReady] = useState(false);

	const socket = useWebsocket();
	useEffect(() => {
		function onEnterError() {
			navigate("/games", { replace: true });
		}
		function onEnterSuccess() {
			setDisplayPage(true);
		}
		function onPlayersUpdate(players) {
			setPlayers(players);
		}

		socket.on("enter_game_error", onEnterError);
		socket.on("enter_game_success", onEnterSuccess);
		socket.on("players_update", onPlayersUpdate);

		socket.emit("enter_game", gameId);

		return () => {
			socket.off("enter_game_error", onEnterError);
			socket.off("enter_game_success", onEnterSuccess);
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
			<title>{`Pili – Partie #${gameId}`}</title>

			{displayPage && (
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

							<div className="options">
								<form>
									<h2>Créer un salon</h2>

									<div className="content">
										{/* <fieldset>
					<label className="required" htmlFor="create-room-name">
						Nom du salon :
					</label>
					<input type="text" id="create-room-name" name="name" required />
				</fieldset>

				<fieldset>
					<label htmlFor="create-room-password">Mot de passe :</label>
					<input type="text" id="create-room-password" name="password" />
				</fieldset> */}

										<fieldset
											style={{ display: "flex", justifyContent: "center" }}
										>
											<label htmlFor="create-room-private">
												Salon privé ?
											</label>
											<input
												type="checkbox"
												name="isPrivate"
												id="create-room-private"
												defaultChecked
												style={{ width: "auto" }}
											/>
										</fieldset>

										<fieldset>
											<label htmlFor="create-room-max">
												Nombre de joueurs max :
											</label>
											<div>
												<input
													type="range"
													id="create-room-max"
													name="max"
													list="dl-players"
													min="2"
													max="8"
													defaultValue="8"
												/>
												<datalist id="dl-players">
													<option value="2" label="2"></option>
													<option value="3" label="3"></option>
													<option value="4" label="4"></option>
													<option value="5" label="5"></option>
													<option value="6" label="6"></option>
													<option value="7" label="7"></option>
													<option value="8" label="8"></option>
												</datalist>
												<ul className="range-labels">
													<li>2</li>
													<li>3</li>
													<li>4</li>
													<li>5</li>
													<li>6</li>
													<li>7</li>
													<li>8</li>
												</ul>
											</div>
										</fieldset>
									</div>

									{/* <button type="submit">Valider</button> */}
								</form>
							</div>

							<button>Quitter la partie</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
