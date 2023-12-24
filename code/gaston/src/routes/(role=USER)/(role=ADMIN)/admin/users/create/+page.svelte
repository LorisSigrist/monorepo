<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { CreateUserSchema } from './schema';
	import { VALID_ROLES } from '$lib/auth/roles';
	import { Field, Label, Input, Errors, Description } from '$lib/ui/fieldset';
	import Button from '$lib/ui/buttons/Button.svelte';
	import CheckboxField from '$lib/ui/checkbox/CheckboxField.svelte';
	import Checkbox from '$lib/ui/checkbox/Checkbox.svelte';

	export let data;

	const { form, errors, enhance, constraints, submitting } = superForm(data.form, {
		validators: CreateUserSchema,
		invalidateAll: true
	});
</script>

<form class="flex flex-col gap-4" use:enhance method="POST">
	<Field>
		<Label>Username</Label>
		<Input
			type="text"
			name="username"
			bind:value={$form.username}
			constraints={$constraints.username}
			aria-invalid={!!$errors.username?.length}
			placeholder="Username"
			autocomplete="new-username"
		/>
		<Description>What should the new user be called?</Description>
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
			autocomplete="new-password"
		/>
		<Description
			>Set an initial password for the new user. They will be asked to change this</Description
		>
		<Errors errors={$errors.password} />
	</Field>

	{#each VALID_ROLES as role}
		<CheckboxField>
			<Checkbox name="roles" value={role} bind:group={$form.roles} />
			<Label>{role}</Label>
		</CheckboxField>
	{/each}

	<Button type="submit" disabled={$submitting}>Create</Button>
</form>
