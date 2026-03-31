import Header from "../components/Header";

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
			<div class="page-bg" aria-hidden="true"></div>

			<Header />

			<main class="main-content">
				<section class="login-card" aria-labelledby="login-title">
					<p class="eyebrow">Bienvenue</p>
					<h1 id="login-title">Connexion</h1>
					<p class="subtitle">Retrouve ton espace personnel Pili-Pili.</p>

					<form class="login-form" method="post" onSubmit={handleSubmit}>
						<div class="form-group">
							<label for="name">Nom</label>
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								placeholder="Ton nom"
								required
							></input>
						</div>

						<div class="form-group">
							<label for="password">Mot de passe</label>
							<input
								id="password"
								name="password"
								type="password"
								autocomplete="current-password"
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
