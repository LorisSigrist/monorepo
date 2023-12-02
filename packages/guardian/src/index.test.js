import { describe, it, expect } from 'vitest';
import { getRoles } from './index.js';

/**
 * @type {{ routeId: string, expectedRoles: string[] }[]}
 */
const FIXTURES = [
	{
		routeId: '/login',
		expectedRoles: []
	},
	{
		routeId: '/(role=ADMIN)/some-page',
		expectedRoles: ['ADMIN']
	},
	{
		routeId: '/(role=ADMIN)/(role=SUPER_ADMIN)/some-page',
		expectedRoles: ['ADMIN', 'SUPER_ADMIN']
	}
];

describe('getRoles', () => {
	FIXTURES.forEach(({ routeId, expectedRoles }) => {
		it(`should return [${expectedRoles.join(', ')}] for routeId "${routeId}"`, () => {
			expect(getRoles(routeId)).toEqual(new Set(expectedRoles));
		});
	});
});
