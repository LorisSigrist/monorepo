<script>
	import { page } from '$app/stores';
	import AdminShell from './AdminShell.svelte';
	import NavItem from './NavItem.svelte';
	import UserIcon from '~icons/heroicons/user';
	import HomeIcon from '~icons/heroicons/home';
</script>

<AdminShell>
	<svelte:fragment slot="items">
		<NavItem href="/admin" title="Dashboard" icon={HomeIcon} />
		<NavItem
			title="Users"
			href="/admin/users"
			icon={UserIcon}
			current={$page.url.pathname.endsWith('/admin/users')}
		/>
	</svelte:fragment>

	<slot />
</AdminShell>
