const int_regex = /^\d+$/;

/**
 * @param {any} param
 * @returns {param is `${bigint}`}
 */
export const match = (param) => {
	return int_regex.test(param);
};
