/**
 * Verify that the param is a date with the format YYYY-MM-DD
 *
 * @param {string} param
 * @returns {param is `${number}-${number}-${number}`}
 */
export const match = (param) => {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	return regex.test(param);
};
