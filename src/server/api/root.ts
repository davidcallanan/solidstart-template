import { t } from "./t";

export const router = t.router({
	ping: t.procedure.query(() => "pong"),
});

export type Router = typeof router;
