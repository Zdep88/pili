import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],

	envDir: "../..", // folder for .env files

	build: {
		outDir: "./dist",
		emptyOutDir: true,
	},
});
