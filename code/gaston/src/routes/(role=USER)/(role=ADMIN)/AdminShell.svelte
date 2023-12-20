<script>
	import { afterNavigate } from '$app/navigation';
	import { linear } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	let sidebarOpen = false;

	export let destinations = [];


	afterNavigate(() => {
		sidebarOpen = false;
	});
</script>

{#if sidebarOpen}
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
		<div
			class="fixed inset-0 bg-gray-900/80"
			transition:fade={{ duration: 300, easing: linear }}
		></div>

		<div class="fixed inset-0 flex">
			<div
				transition:fly={{ duration: 300, x: -300 }}
				class="relative mr-16 flex w-full max-w-xs flex-1"
			>
				<!-- Close Button -->
				<div
					in:fade={{ duration: 200 }}
					class="absolute left-full top-0 flex w-16 justify-center pt-5"
				>
					<button type="button" class="-m-2.5 p-2.5" on:click={() => (sidebarOpen = false)}>
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Sidebar component -->
				<div
					class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
				>
					<div class="flex h-16 shrink-0 items-center">
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt="Your Company"
						/>
					</div>
					<nav class="flex flex-1 flex-col">
						<ul role="list" class="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" class="-mx-2 space-y-1">
									<slot name="items" />
								</ul>
							</li>
							<li>
								<div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
								<ul role="list" class="-mx-2 mt-2 space-y-1">
									<li>
										<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
										<a
											href="#"
											class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
										>
											<span
												class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
												>H</span
											>
											<span class="truncate">Heroicons</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
										>
											<span
												class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
												>T</span
											>
											<span class="truncate">Tailwind Labs</span>
										</a>
									</li>
									<li>
										<a
											href="#"
											class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
										>
											<span
												class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
												>W</span
											>
											<span class="truncate">Workcation</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Static sidebar for desktop -->
<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
	<!-- Sidebar component, swap this element with another sidebar if you like -->
	<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
		<div class="flex h-16 shrink-0 items-center">
			<img
				class="h-8 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
				alt="Your Company"
			/>
		</div>
		<nav class="flex flex-1 flex-col">
			<ul role="list" class="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" class="-mx-2 space-y-1">
<slot name="items" />
					</ul>
				</li>
				<li>
					<div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
					<ul role="list" class="-mx-2 mt-2 space-y-1">
						<li>
							<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
							<a
								href="#"
								class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
							>
								<span
									class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
									>H</span
								>
								<span class="truncate">Heroicons</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
							>
								<span
									class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
									>T</span
								>
								<span class="truncate">Tailwind Labs</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
							>
								<span
									class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
									>W</span
								>
								<span class="truncate">Workcation</span>
							</a>
						</li>
					</ul>
				</li>
				<li class="-mx-6 mt-auto">
					<a
						href="#"
						class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
					>
						<img
							class="h-8 w-8 rounded-full bg-gray-800"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
						<span class="sr-only">Your profile</span>
						<span aria-hidden="true">Tom Cook</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>

<!-- Static top for mobile -->
<div
	class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
>
	<button
		type="button"
		class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
		on:click={() => (sidebarOpen = true)}
	>
		<span class="sr-only">Open sidebar</span>
		<svg
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	</button>
	<div class="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
	<a href="#">
		<span class="sr-only">Your profile</span>
		<img
			class="h-8 w-8 rounded-full bg-gray-800"
			src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			alt=""
		/>
	</a>
</div>

<main class="py-10 lg:pl-72">

	<slot name="test" />
	<slot name="test" />

	<div class="px-4 sm:px-6 lg:px-8">
		<slot />
	</div>
</main>
