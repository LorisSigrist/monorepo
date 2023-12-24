<script>
   import { getFieldContext } from '$lib/utils/field-context';

    /** @type {string} */
    export let name;

    	/** @type {string | undefined} */
	export let id;

    const field = getFieldContext();
</script>

<div class="flex h-6 items-center">
    <input 
        id={id ?? field.id}  
        name={name}
        type="checkbox" 
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" 
        aria-describedby={field.descriptionID}
        {...$$restProps}
    >
</div>