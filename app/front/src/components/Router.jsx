import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Default as Layout } from "layouts";
import { Home, Login, Games, NewGame, Lobby, Err404 } from "pages";

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />

					<Route path="login" element={<Login />} />

					<Route path="games">
						<Route index element={<Games />} />
						<Route path="new" element={<NewGame />} />
						<Route path=":roomId" element={<Lobby />} />
					</Route>

					<Route path="*" element={<Err404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
