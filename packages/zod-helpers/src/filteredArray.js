import { z } from 'zod';

/**
 * Creates an array schema that filters out any elements that don't match the given schema
 * If all elements are filtered out, the filtered array schema will fail (unless the original array is already empty)
 *
 * @template {import("zod").ZodSchema} S
 *
 * @param {S} Schema The schema for the elements of the array
 * @returns A schema that filters out any elements that don't match the given schema
 */
export function filteredArray(Schema) {
	return z.preprocess((raw) => {
		//We don't want to throw during preprocessing, so we return false if something goes wrong
		try {
			const ArraySchema = z.array(z.any());
			const array_parse = ArraySchema.safeParse(raw);
			if (!array_parse.success) return false;

			const data = array_parse.data;
			if (data.length === 0) return [];

			const widgets = data.filter((potential_widget) => {
				return Schema.safeParse(potential_widget).success;
			});

			if (widgets.length === 0) return false;

			return widgets;
		} catch (e) {
			return false;
		}
	}, z.array(Schema));
}
