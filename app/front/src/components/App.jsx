import { useState } from "react";
import "../App.css";
import { useEffect } from "react";

import WSClient from "./WSClient";

export default function App() {
	async function getData() {
		const data = await fetch("http://localhost:3004/api");
		const json = await data.json();
		setDataState(json);
	}

	const [dataState, setDataState] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="app">
				<h1>{dataState?.message}</h1>
			</div>

			<WSClient />
		</>
	);
}
