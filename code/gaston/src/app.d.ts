import 'unplugin-icons/types/svelte';
// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				/** The user's unique ID. null = anonymous user */
				id: number | null;

				/** A bitfield of the user's roles. 0 = no roles = anonymous user */
				roles: number;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
