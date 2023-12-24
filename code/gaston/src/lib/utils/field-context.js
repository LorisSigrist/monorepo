import { getContext, setContext } from 'svelte';
import { id } from '$lib/utils/id.js';

/** @typedef {{ id: string; descriptionID: string }} FieldContext */
export const FieldContext = {};

const NULL_FIELD_CONTEXT = {
	id: '',
	descriptionID: ''
};

/** @returns {FieldContext} */
export const getFieldContext = () => {
	const ctx = getContext(FieldContext);
	return ctx ?? NULL_FIELD_CONTEXT;
};

/** @param {FieldContext} context */
export const setFieldContext = (context) => {
	setContext(FieldContext, context);
};

export const createFieldContext = () => {
	const context = { id: id(), descriptionID: id() };
	setFieldContext(context);
	return context;
};
