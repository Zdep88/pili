import { useState, useEffect } from "react";
import { NavLink } from "react-router";

export default function () {
	async function getData() {
		const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/`);
		const json = await data.json();
		setDataState(json);
	}

	const [dataState, setDataState] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<header className="top-nav">
				<NavLink to="/" className="brand" aria-label="Accueil Pili-Pili">
					<span className="brand-mark" aria-hidden="true"></span>
					<span className="brand-text">Pili-Pili</span>
				</NavLink>
				<nav aria-label="Navigation principale">
					<ul className="nav-links">
						<li>
							<NavLink to="/">Accueil</NavLink>
						</li>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/rooms">Rooms</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
