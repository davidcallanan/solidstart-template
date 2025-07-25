import {
	createResource,
	createEffect,
	getOwner,
	runWithOwner,
} from "solid-js";

import { create_signal } from "./create_signal.js";

export const create_self = (owner) => {
	owner ??= getOwner();

	if (owner === undefined) {
		console.error("Cannot create_self outside of a component. Consider passing an owner if it cannot be inferred, such as within an asynchronous workflow, or, if possible, run create_self early on while the owner can be inferred.");
	}

	const wrap = (primitive) => {
		return (...args) => {
			return runWithOwner(owner, () => {
				return primitive(...args);
			});
		};
	};

	return {
		owner,
		create_signal: wrap(create_signal),
		create_resource: wrap(createResource),
		create_effect: wrap(createEffect),
	};
};
