import { Link, Outlet, createRootRoute } from "@tanstack/solid-router";

import { clientOnly } from "@solidjs/start";
import { Suspense } from "solid-js";

const Devtools = clientOnly(() => import("../components/Devtools"));

const RootComponent = () => {
	return (
		<>
			<Link to="/">Home</Link>
			<Suspense>
				<Outlet />
				<Devtools />
			</Suspense>
		</>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
