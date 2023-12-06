<script>
	export let data;
</script>

<h1>Users</h1>

<ul>
	{#each data.users as user}
		<li>{user.username}</li>
	{:else}
		<li>No users present</li>
	{/each}
</ul>
