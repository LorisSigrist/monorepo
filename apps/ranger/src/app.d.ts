// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				/** The ID of the current user. Will be _null_ if the user is not authenticated */
				id: number | null;
				roles: string[];
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
