import { createMemo } from "solid-js";

const Actual = (props) => {
	const keyed_children = createMemo(() => {
		return props.keyed_children?.();
	});

	return <>
		{keyed_children()}
	</>;
};

export const Keyed = (props) => {
	return <>
		<For each={[props.key()]}>
			{(key) => <>
				<Actual key={key} keyed_children={() => props.children} />
			</>}
		</For>
	</>;
};
