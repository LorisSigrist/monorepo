<script>
	import { page } from '$app/stores';
	import AdminShell from './AdminShell.svelte';
	import NavItem from './NavItem.svelte';
</script>

<AdminShell>
	<svelte:fragment slot="items">
		<NavItem href="/admin" title="Dashboard" />
		<NavItem
			href="/admin/users"
			title="Users"
			current={$page.url.pathname.endsWith('/admin/users')}
		/>
	</svelte:fragment>

	<slot />
</AdminShell>
