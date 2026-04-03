import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Default as Layout } from "layouts";
import { Home, Login, Rooms, CreateRoom, Err404 } from "pages";

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="rooms" element={<Rooms />} />
					<Route path="game/new" element={<CreateRoom />} />

					<Route path="*" element={<Err404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
