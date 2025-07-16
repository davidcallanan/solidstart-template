import { createSignal } from "solid-js";

export const create_signal = (initial) => {
	const [signal, set_signal] = createSignal({
		retrieve: typeof initial === "function" ? initial : () => initial,
	});

	const result = () => {
		return signal().retrieve();
	};

	result.set = (value) => {
		set_signal({
			retrieve: typeof value === "function" ? value : () => value,
		});
	};

	return result;
};
