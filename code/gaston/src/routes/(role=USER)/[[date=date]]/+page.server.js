import { error } from 'console';

export function load({ params }) {
	const timestamp = params.date ? Date.parse(params.date) : Date.now();

	if (Number.isNaN(timestamp)) {
		error(400, 'Invalid date');
	}

	const date = new Date(timestamp);

	/**
	 * @type {{
	 * 	id: number;
	 * 	title: string;
	 * 	description: string;
	 * 	price: number;
	 * }[]}
	 */
	const items = [
		{
			id: 1,
			title: 'Moms Spaghetti',
			description: 'Spaghetti with meatballs and tomato sauce',
			price: 10.0
		},
		{
			id: 2,
			title: 'Spaghetti Carbonara',
			description: 'Spaghetti with bacon, eggs and cheese',
			price: 12.5
		},
		{
			id: 3,
			title: 'Meatballs',
			description: 'Meatballs with tomato sauce',
			price: 9.0
		}
	];

	return { items, date };
}

export const actions = {
	default: ({ request }) => {}
};
