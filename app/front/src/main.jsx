import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WSClient from "./components/WSClient.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<WSClient />
		<Router>
			<Routes>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
			</Routes>
		</Router>
	</StrictMode>,
);
