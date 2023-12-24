<script>
	import { enhance } from '$app/forms';
</script>

<h1>User</h1>

<form use:enhance method="POST" action="?/delete">
	<button type="submit">Delete</button>
</form>
