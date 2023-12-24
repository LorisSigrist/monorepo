<script>
	/** @type {string[] | undefined} */
	export let errors;
</script>

{#if errors}
	<div class="grid gap-1">
		{#each errors as error}
			<p class="text-sm text-red-600">{error}</p>
		{/each}
	</div>
{/if}
