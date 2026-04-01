export default function () {
	return (
		<>
			<section className="home-card" aria-labelledby="home-title">
				<p className="eyebrow">Univers Pili-Pili</p>
				<h1 id="home-title">Bienvenue sur la page d'accueil</h1>
				<p className="random-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non velit vitae
					nunc convallis placerat. Donec ac lorem at dui varius viverra. Sed ut mauris sed
					arcu maximus luctus in nec mi. Vivamus aliquet, sapien non fermentum porta,
					augue risus interdum massa, a volutpat justo nunc non risus.
				</p>

				<figure className="hero-media">
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
		</>
	);
}
