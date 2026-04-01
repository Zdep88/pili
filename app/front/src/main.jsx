import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import WSClient from "./components/WSClient.jsx";
import Router from "./components/Router.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<WSClient />
		<Router />
	</StrictMode>,
);
