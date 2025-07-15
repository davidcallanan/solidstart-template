import { createFileRoute } from "@tanstack/solid-router";

const RouteComponent = () => {
	return <>
		<h1 class="text-2xl text-blue-700"> Welcome to SolidStart 😀 </h1>
	</>;
};

export const Route = createFileRoute("/")({
	component: RouteComponent
});
