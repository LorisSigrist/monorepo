<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { CreateUserSchema } from './schema';
	import { VALID_ROLES } from '$lib/auth/roles';
	import Field from '$lib/ui/fieldset/Field.svelte';
	import Label from '$lib/ui/fieldset/Label.svelte';
	import Input from '$lib/ui/fieldset/Input.svelte';
	import Errors from '$lib/ui/fieldset/Errors.svelte';

	export let data;

	const { form, errors, enhance, constraints, submitting } = superForm(data.form, {
		validators: CreateUserSchema
	});
</script>

<form class="grid gap-4" use:enhance method="POST">
	<Field>
		<Label>Username</Label>
		<Input 
			type="text"
			name="username" 
			bind:value={$form.username} 
			constraints={$constraints.username}
			aria-invalid={!!$errors.username?.length}
			placeholder="Username"
		/>
		<Errors errors={$errors.username} />
	</Field>

	<Field>
		<Label>Password</Label>
		<Input 
			type="password"
			name="password" 
			bind:value={$form.password} 
			constraints={$constraints.password}
			aria-invalid={!!$errors.password?.length}
			placeholder="Password"
		/>
		<Errors errors={$errors.password} />
	</Field>

	{#each VALID_ROLES as role}
		<label>
			<span>{role}</span>
			<input type="checkbox" name="roles" value={role} bind:group={$form.roles} />
		</label>
	{/each}

	<button type="submit" disabled={$submitting}>Create</button>
</form>
