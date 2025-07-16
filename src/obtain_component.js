import { createRoot, onCleanup, runWithOwner, Suspense } from "solid-js";
import { create_self } from "./create_self.js";
import { Dynamic } from "solid-js/web";
import { ClientOnly } from "@tanstack/solid-router";

export const obtain_component = (render) => {
	const Component = (props) => {
		const self = create_self();

		const [get_create_instance] = self.create_resource(() => {
			return runWithOwner(self.owner, async () => {
				return await render({
					...props,
					self,
				});
			});
		});

		let dispose;

		onCleanup(() => dispose?.());

		return <>
			<Suspense fallback={<>
				<div class="GLOBAL_loader_wrapper">
					<span class="GLOBAL_loader" />
				</div>
			</>}>
				{(() => {
					const create_instance = get_create_instance();

					if (create_instance === undefined) {
						console.warn("Invalid instance factory", create_instance);
						return <></>;
					}

					return createRoot((_dispose) => {
						dispose?.();
						dispose = _dispose;

						const instance = create_instance();

						return <>
							<Dynamic component={() => instance} />
						</>;
					});
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
