import { createFileRoute } from "@tanstack/solid-router";
import { api } from "~/api";
import { obtain_component } from "~/obtain_component";

const Counter = obtain_component(async ({ self, ...props }) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const count = self.create_signal(0);

	return () => <>
		<h1> Count: {count()} </h1>
		<button className="bg-green-300 hover:bg-green-400 px-2 border border-blue-700 rounded-md" onClick={() => count.set(count() + 1)}>Increment</button>
	</>;
});

const Ping = obtain_component(async ({ self, ...props }) => {
	const response = await api.ping.query();

	return () => <>
		<p> Ping: {response}! </p>
	</>;
});

const RouteComponent = () => {
	return <>
		<h1 class="text-2xl text-blue-700"> Welcome to SolidStart 😀 </h1>
		<Counter />
		<Ping />
	</>;
};

export const Route = createFileRoute("/")({
	component: RouteComponent
});
