import WSClient from "../components/WSClient";

export default function Home() {
	return (
		<>
			<div className="app">
				<h1>Pili-Pili</h1>
			</div>

			<WSClient />

			<div class="page-bg" aria-hidden="true"></div>

			<header class="top-nav">
				<a class="brand" href="#" aria-label="Accueil Pili-Pili">
					<span class="brand-mark" aria-hidden="true">
						P
					</span>
					<span class="brand-text">Pili-Pili</span>
				</a>
				<nav aria-label="Navigation principale">
					<ul class="nav-links">
						<li>
							<a href="#">Accueil</a>
						</li>
						<li>
							<a href="#">Carte</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</nav>
			</header>

			<main class="main-content">
				<section class="home-card" aria-labelledby="home-title">
					<p class="eyebrow">Univers Pili-Pili</p>
					<h1 id="home-title">Bienvenue sur la page d'accueil</h1>
					<p class="random-text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non velit
						vitae nunc convallis placerat. Donec ac lorem at dui varius viverra. Sed ut
						mauris sed arcu maximus luctus in nec mi. Vivamus aliquet, sapien non
						fermentum porta, augue risus interdum massa, a volutpat justo nunc non
						risus.
					</p>

					<figure class="hero-media">
						<img
							src="/assets/home-hero.jpg"
							alt="Illustration ambiance Pili-Pili"
							loading="lazy"
						></img>
						<figcaption>
							Ajoute ton image dans le depot pour personnaliser cette section.
						</figcaption>
					</figure>
				</section>
			</main>
		</>
	);
}
