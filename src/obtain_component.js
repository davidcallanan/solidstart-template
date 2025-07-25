import { createRoot, onCleanup, runWithOwner, Suspense } from "solid-js";
import { create_self } from "./create_self.js";
import { Dynamic } from "solid-js/web";
import { ClientOnly } from "@tanstack/solid-router";

const Error = () => <>
	<div class="GLOBAL_loader_wrapper">
		<p class="px-3 py-1 bg-red-200 border border-red-600 m-4"> Uncaught error </p>
	</div>
</>;

export const obtain_component = (render) => {
	const Component = ({ props }) => {
		const self = create_self();

		const [get_create_instance] = self.create_resource(() => {
			return runWithOwner(self.owner, async () => {
				try {
					return await render({
						...props,
						self,
					});
				} catch (e) {
					console.error("Uncaught error while rendering component", e);

					return <>
						<Error />
					</>;
				}
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

						try {
							var instance = create_instance();
						} catch (e) {
							console.error("Uncaught error while obtaining component", e);

							return <>
								<Error />
							</>;
						}

						return <>
							<Dynamic component={() => instance} />
						</>;
					});
				})()}
			</Suspense >
		</>;
	};

	return (props) => <>
		<ClientOnly fallback={<>
			<div class="GLOBAL_loader_wrapper">
				<span class="GLOBAL_loader" />
			</div>
		</>}>
			<Component props={props} />
		</ClientOnly>
	</>;
};
