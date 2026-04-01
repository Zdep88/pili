import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],

	envDir: "../..", // folder for .env files

	resolve: {
		alias: {
			"@shared": path.resolve(import.meta.dirname, "../shared"),
			components: path.resolve(import.meta.dirname, "src/components"),
			assets: path.resolve(import.meta.dirname, "src/assets"),
			pages: path.resolve(import.meta.dirname, "src/pages"),
		},
	},

	build: {
		outDir: "./dist",
		emptyOutDir: true,
	},
});
