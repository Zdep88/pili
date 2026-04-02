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
			hooks: path.resolve(import.meta.dirname, "src/hooks"),
			layouts: path.resolve(import.meta.dirname, "src/layouts"),
			pages: path.resolve(import.meta.dirname, "src/pages"),

			images: path.resolve(import.meta.dirname, "src/assets/images"),
			styles: path.resolve(import.meta.dirname, "src/assets/styles"),
		},
	},

	build: {
		outDir: "./dist",
		emptyOutDir: true,
	},
});
