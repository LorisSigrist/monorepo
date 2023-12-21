<script>
	import { getFieldContext } from "./Field.svelte";
	const { id } = getFieldContext();
</script>

<label for={id} class="block text-sm font-medium leading-6 text-gray-900">
	<slot />
</label>
