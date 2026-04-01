import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "components/Layout.jsx";

import Home from "pages/Home.jsx";
import Login from "pages/Login.jsx";
import Rooms from "pages/Rooms.jsx";

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="rooms" element={<Rooms />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
