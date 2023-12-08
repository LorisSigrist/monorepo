/** Create a Result object. */
export const Result = {
	ok(value) {
		return {
			ok: true,
			value: value
		};
	},
	bad(error, value) {
		return {
			ok: false,
			error: error,
			value: value
		};
	}
};
