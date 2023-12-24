<script>
	import { getFieldContext } from '$lib/utils/field-context';
	import { createLabel } from '@melt-ui/svelte';

	const {
		elements: { root }
	} = createLabel();

	const { id } = getFieldContext();
</script>

<label for={id} {...$root} use:root class="block text-sm font-medium leading-6 text-gray-900">
	<slot />
</label>
