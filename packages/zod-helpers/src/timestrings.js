import { z } from 'zod';

/** Verifies that the string is a valid time in the format "hh:mm" */
export function hh_mm() {
	return z
		.string()
		.regex(/^\d{2}:\d{2}$/)
		.refine(
			(time) => {
				const [hours, minutes] = time.split(':').map((n) => parseInt(n, 10));

				if (hours === undefined || minutes === undefined || isNaN(hours) || isNaN(minutes))
					return false;

				return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
			},
			{ message: 'Invalid time' }
		);
}

/** Verifies that the string is a valid time in the format "hh:mm:ss" */
export function hh_mm_ss() {
	return z
		.string()
		.regex(/^\d{2}:\d{2}:\d{2}$/)
		.refine(
			(time) => {
				const [hours, minutes, seconds] = time.split(':').map((n) => parseInt(n, 10));

				if (
					hours === undefined ||
					minutes === undefined ||
					seconds === undefined ||
					isNaN(hours) ||
					isNaN(minutes) ||
					isNaN(seconds)
				)
					return false;

				return (
					hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60
				);
			},
			{ message: 'Invalid time' }
		);
}
