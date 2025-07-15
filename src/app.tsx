import { router } from "./router";
import { RouterProvider } from "@tanstack/solid-router";

import "./global.css";

export default () => {
	return <>
		<RouterProvider router={router} />
	</>;
};
