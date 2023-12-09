const int_regex = /^\d+$/;
export const match = (param) => {
	return int_regex.test(param);
};
