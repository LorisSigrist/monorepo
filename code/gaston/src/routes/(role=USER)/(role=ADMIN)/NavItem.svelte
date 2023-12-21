<script>
	/** @type {string} */
	export let href;

	/** @type {string} */
	export let title;

	export let current = false;

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
		<svg
			class="h-6 w-6 shrink-0"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
			/>
		</svg>
		<span>{title}</span>
	</a>
</li>
