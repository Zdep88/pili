import { Navigate, useNavigate } from "react-router-dom";

import { useFetch } from "hooks";

import "styles/newGame.css";

export default function () {
	const isLogged = !undefined; //! à changer
	const navigate = useNavigate();

	async function submitForm(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const objFormData = Object.fromEntries(formData.entries());

		try {
			const data = await useFetch("POST", "games/create", objFormData);

			if (data.message === undefined) {
				console.error(data);
				throw new Error("Unexpected servor error");
			}

			navigate(`/games/${data.id}`);
		} catch (error) {
			alert("Erreur: " + error.message);
		}
	}

	return isLogged === undefined ? (
		<Navigate to="/login?next=" />
	) : (
		<form onSubmit={submitForm}>
			<h2>Créer un salon</h2>

			<div className="content">
				<fieldset>
					<label className="required" htmlFor="create-room-name">
						Nom du salon :
					</label>
					<input type="text" id="create-room-name" name="name" required />
				</fieldset>

				<fieldset>
					<label htmlFor="create-room-password">Mot de passe :</label>
					<input type="text" id="create-room-password" name="password" />
				</fieldset>

				<fieldset>
					<label htmlFor="create-room-max">Nombre de joueurs max :</label>
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

			<button type="submit">Valider</button>
		</form>
	);
}
