import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			TanStackRouterVite({
				target: "solid",
			}),
		],
	},
});
