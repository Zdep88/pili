import { useState } from "react";
import { useEffect } from "react";

function Header() {
	async function getData() {
		const data = await fetch("http://localhost:3004/api/");
		const json = await data.json();
		setDataState(json);
	}

	const [dataState, setDataState] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<header class="top-nav">
				<a class="brand" href="/" aria-label="Accueil Pili-Pili">
					<span class="brand-mark" aria-hidden="true">
						P
					</span>
					<span class="brand-text">Pili-Pili</span>
				</a>
				<nav aria-label="Navigation principale">
					<ul class="nav-links">
						<li>
							<a href="/">Accueil</a>
						</li>
						<li>
							<a href="/login">Login</a>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default Header;
