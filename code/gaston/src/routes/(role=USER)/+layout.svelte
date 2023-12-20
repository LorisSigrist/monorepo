<div class="bg-white">
	<div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<header>
			<form action="/logout" method="POST">
				<button type="submit">Logout</button>
			</form>
		</header>

		<slot />
	</div>
</div>
