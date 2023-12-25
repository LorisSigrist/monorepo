/** Create a Result object. */
export const Result = {
	ok: (value) => ({
		ok: true,
		value
	}),
	bad: (error, value) => ({
		ok: false,
		error,
		value
	})
};
