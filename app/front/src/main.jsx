import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { WSClient, Router } from "components";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<WSClient />
		<Router />
	</StrictMode>,
);
