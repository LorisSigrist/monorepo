<script context="module">
	import { getContext, setContext } from 'svelte';
	import { id } from '$lib/utils';

    /**
     * @typedef {{ id: string }} FieldContext
     */

	export const FieldContext = {};


    const NULL_FIELD_CONTEXT = { id: '' };

    /**
     * @returns {FieldContext}
     */
	export const getFieldContext = () => {
		const ctx = getContext(FieldContext);
        return ctx ?? NULL_FIELD_CONTEXT;
	};

    /**
     * @param {FieldContext} context
     */
	export const setFieldContext = (context) => {
		setContext(FieldContext, context);
	};
</script>

<script>
	setFieldContext({ id: id() });
</script>

<div class="grid gap-2">
	<slot />
</div>
