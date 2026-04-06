import { Link } from "react-router-dom";

export default function () {
	return (
		<>
			<title>Pili</title>

			<h2 style={{ color: "black" }}>404 : Page introuvable</h2>

			<Link to="/">Retour à l'accueil</Link>
		</>
	);
}
