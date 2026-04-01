import Header from "components/Header";

export default function Login() {
	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const { name, password } = Object.fromEntries(formData.entries());
		console.log("Formulaire soumis - | Name:", name, "| Password:", password);
		const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, password }),
		});
		const data = await response.json();
		console.log("Réponse du serveur:", response);
		if (!response.ok) {
			alert("Erreur: " + data.error);
		} else {
			localStorage.setItem("token", data.token);
			window.location.href = "/";
		}
	}

	return (
		<>
			<div className="page-bg" aria-hidden="true"></div>

			<Header />

			<main className="main-content">
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
			</main>
		</>
	);
}
