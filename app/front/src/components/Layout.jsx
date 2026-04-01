import { Outlet } from "react-router-dom";

import Header from "components/Header.jsx";

import "../index.css";

export default function () {
	return (
		<>
			<div className="page-bg" aria-hidden="true"></div>
			<Header />
			<main className="main-content">
				<Outlet />
			</main>
		</>
	);
}
