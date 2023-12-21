<script>
	import { getFieldContext } from "./Field.svelte";

    /** @type {string}*/
    export let value;
    /** @type {import("sveltekit-superforms").InputConstraint | undefined}*/
    export let constraints= undefined;
    /** @type {string | undefined}*/
    export let name = undefined;


    const { id } = getFieldContext();
</script>

<div>
    <input 
        name={name}
        bind:value
        id={id} 
        {...constraints}
        {...$$restProps}
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        >
</div>