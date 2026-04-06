import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Default as Layout } from "layouts";
import { Home, Login, Hall, GameLobby, Err404 } from "pages";

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />

					<Route path="login" element={<Login />} />

					<Route path="games">
						<Route index element={<Hall />} />
						<Route path=":roomId" element={<GameLobby />} />
					</Route>

					<Route path="*" element={<Err404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
