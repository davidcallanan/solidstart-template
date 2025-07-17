import {
	createTRPCProxyClient,
	httpBatchLink,
	loggerLink,
} from "@trpc/client";
import { Router } from "~/server/api/root";

const base_url = (() => {
	if (typeof window !== "undefined") {
		return "";
	}

	if (process.env.NODE_ENV === "production") {
		return "https://example.com";
	}

	return `http://localhost:${process.env.PORT ?? 3000}`;
})();

export const api = createTRPCProxyClient<Router>({
	links: [
		loggerLink(),
		httpBatchLink({ url: `${base_url}/api/trpc` })
	],
});
