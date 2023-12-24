<script>
	import { getFieldContext } from "$lib/utils/field-context";
    const { descriptionID } = getFieldContext();
</script>

<p id={descriptionID} class="text-sm text-gray-500"><slot /></p>
