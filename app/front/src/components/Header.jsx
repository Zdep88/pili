import { useState, useEffect } from "react";
import { NavLink } from "react-router";

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
				<NavLink to="/" className="brand" aria-label="Accueil Pili-Pili">
					<span class="brand-mark" aria-hidden="true"></span>
					<span class="brand-text">Pili-Pili</span>
				</NavLink>
				<nav aria-label="Navigation principale">
					<ul class="nav-links">
						<li>
							<NavLink to="/">Accueil</NavLink>
						</li>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default Header;
