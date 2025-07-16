import { createFileRoute } from "@tanstack/solid-router";
import { obtain_component } from "~/obtain_component.js";

const Counter = obtain_component(async ({ self, ...props }) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const count = self.create_signal(0);

	return () => <>
		<h1> Count: {count()} </h1>
		<button className="bg-green-300 hover:bg-green-400" onClick={() => count.set(count() + 1)}>Increment</button>
	</>;
});

const RouteComponent = () => {
	return <>
		<h1 class="text-2xl text-blue-700"> Welcome to SolidStart 😀 </h1>
		<Counter />
	</>;
};

export const Route = createFileRoute("/")({
	component: RouteComponent
});
