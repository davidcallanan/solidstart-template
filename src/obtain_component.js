import { runWithOwner, Suspense } from "solid-js";
import { create_self } from "./create_self.js";
import { Dynamic } from "solid-js/web";
import { ClientOnly } from "@tanstack/solid-router";

export const obtain_component = (render) => {
	const Component = (props) => {
		const self = create_self();

		const [get_create_instance] = self.create_resource(() => {
			console.log("got here...");
			return runWithOwner(self.owner, async () => {
				console.log("rendering");
				return await render({
					...props,
					self,
				});
			});
		});

		return <>
			<Suspense fallback={<>
				<div class="GLOBAL_loader_wrapper">
					<span class="GLOBAL_loader" />
				</div>
			</>}>
				{(() => {
					console.log("blah");
					const create_instance = get_create_instance();

					console.log(create_instance, "cri");

					if (create_instance === undefined) {
						console.warn("Invalid instance factory", create_instance);
						return <></>;
					}

					const instance = create_instance();

					return <>
						<Dynamic component={() => instance} />
					</>;
				})()}
			</Suspense >
		</>;
	};

	return <>
		<ClientOnly fallback={<>
			<div class="GLOBAL_loader_wrapper">
				<span class="GLOBAL_loader" />
			</div>
		</>}>
			<Component />
		</ClientOnly>
	</>;
};
