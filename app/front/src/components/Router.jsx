import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Default as Layout } from "layouts";
import { Home, Login, Rooms } from "pages";

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
