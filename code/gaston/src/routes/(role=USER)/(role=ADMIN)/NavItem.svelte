<script>
	/** @type {string} */
	export let href;

	/** @type {string} */
	export let title;

	export let current = false;

	/** @type {import("svelte").SvelteComponent<import("svelte/elements").SvelteHTMLElements['svg']> & any}*/
	export let icon;

	const styles = {
		current: 'bg-gray-800 text-white',
		default: 'text-gray-400 hover:text-white hover:bg-gray-800'
	};
</script>

<li>
	<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
	<a
		{href}
		class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 {styles[
			current ? 'current' : 'default'
		]}"
	>
		<svelte:component this={icon} class="w-6 h-6" />
		<span>{title}</span>
	</a>
</li>
