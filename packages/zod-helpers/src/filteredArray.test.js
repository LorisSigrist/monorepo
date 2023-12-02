import { describe, it, expect } from 'vitest';
import { filteredArray } from './filteredArray.js';
import { z } from 'zod';

describe('filteredArray', () => {
	it('should return an unchanged array if the element schema matches all elements', () => {
		const schema = filteredArray(z.number());
		const result = schema.parse([1, 2, 3]);
		expect(result).toEqual([1, 2, 3]);
	});

	it('should return an array with only the matching elements', () => {
		const schema = filteredArray(z.number());
		const result = schema.parse([1, 2, '3']);
		expect(result).toEqual([1, 2]);
	});

	it('should fail if none of the elements match', () => {
		const schema = filteredArray(z.number());
		expect(() => schema.parse(['1', '2', '3'])).toThrow();
	});

	it('should not fail if the initial array is empty', () => {
		const schema = filteredArray(z.number());
		const result = schema.parse([]);
		expect(result).toEqual([]);
	});
});
