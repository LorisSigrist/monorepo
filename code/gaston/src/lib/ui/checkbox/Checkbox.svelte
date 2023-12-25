<script>
   import { getFieldContext } from '$lib/utils/field-context';

    /** @type {string | undefined} */
    export let name = undefined;

    /** @type {string | undefined} */
	export let id = undefined;

    const field = getFieldContext();
</script>

<input 
    id={id ?? field.id}  
        name={name}
        type="checkbox" 
        class="h-4 w-4 m-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" 
        aria-describedby={field.descriptionID}
        {...$$restProps}
    >