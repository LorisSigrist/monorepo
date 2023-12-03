<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { CreateUserSchema } from './schema';
	import { VALID_ROLES } from '$lib/auth/roles';

	export let data;

	const { form, errors, enhance, constraints, submitting } = superForm(data.form, {
		validators: CreateUserSchema
	});
</script>

<form use:enhance method="POST">
	<label>
		<span>Username</span>
		<input type="text" name="username" {...$constraints.username} bind:value={$form.username} />
	</label>
	{#if $errors.username}
		{#each $errors.username as error}
			<p>{error}</p>
		{/each}
	{/if}

	<label>
		<span>Password</span>
		<input type="password" name="password" {...$constraints.password} bind:value={$form.password} />
	</label>
	{#if $errors.password}
		{#each $errors.password as error}
			<p>{error}</p>
		{/each}
	{/if}

	{#each VALID_ROLES as role}
		<label>
			<span>{role}</span>
			<input type="checkbox" name="roles" value={role} bind:group={$form.roles} />
		</label>
	{/each}

	<button type="submit" disabled={$submitting}>Create</button>
</form>
