import { useNavigate } from "react-router-dom";

import { useFetch } from "hooks";

export default function () {
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const { name, password } = Object.fromEntries(formData.entries());

		try {
			const data = await useFetch("post", "login", { name, password });

			localStorage.setItem("token", data.token);

			navigate("/rooms");
		} catch (err) {
			alert("Erreur: " + err.message);
		}
	}

	return (
		<>
			<section className="login-card" aria-labelledby="login-title">
				<p className="eyebrow">Bienvenue</p>
				<h1 id="login-title">Connexion</h1>
				<p className="subtitle">Retrouve ton espace personnel Pili-Pili.</p>

				<form className="login-form" method="post" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Nom</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							placeholder="Ton nom"
							required
						></input>
					</div>

					<div className="form-group">
						<label htmlFor="password">Mot de passe</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							placeholder="••••••••"
							required
						></input>
					</div>

					<button type="submit">Se connecter</button>
				</form>
			</section>
		</>
	);
}
