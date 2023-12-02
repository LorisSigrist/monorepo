import { describe, it, expect } from 'vitest';
import { hh_mm, hh_mm_ss } from './timestrings.js';

describe('timestrings', () => {
	describe('hh_mm', () => {
		it("should accept '00:00'", () => {
			expect(hh_mm().safeParse('00:00').success).toBe(true);
		});

		it("should accept '23:59'", () => {
			expect(hh_mm().safeParse('23:59').success).toBe(true);
		});

		it('should reject a string where the minutes are over 59', () => {
			expect(hh_mm().safeParse('23:60').success).toBe(false);
		});

		it('should reject a string where the hours are over 23', () => {
			expect(hh_mm().safeParse('24:00').success).toBe(false);
		});

		it('should reject a string where the hours are negative', () => {
			expect(hh_mm().safeParse('-1:00').success).toBe(false);
		});

		it('should reject a string where the minutes are negative', () => {
			expect(hh_mm().safeParse('00:-1').success).toBe(false);
		});

		it('should fail if the string is not in the correct format', () => {
			expect(hh_mm().safeParse('0000').success).toBe(false);
		});
	});

	describe('hh_mm_ss', () => {
		it("should accept '00:00:00'", () => {
			expect(hh_mm_ss().safeParse('00:00:00').success).toBe(true);
		});

		it("should accept '23:59:59'", () => {
			expect(hh_mm_ss().safeParse('23:59:59').success).toBe(true);
		});

		it('should reject a string where the seconds are over 59', () => {
			expect(hh_mm_ss().safeParse('23:59:60').success).toBe(false);
		});

		it('should reject a string where the minutes are over 59', () => {
			expect(hh_mm_ss().safeParse('23:60:00').success).toBe(false);
		});

		it('should reject a string where the hours are over 23', () => {
			expect(hh_mm_ss().safeParse('24:00:00').success).toBe(false);
		});

		it('should reject a string where the hours are negative', () => {
			expect(hh_mm_ss().safeParse('-1:00:00').success).toBe(false);
		});

		it('should reject a string where the minutes are negative', () => {
			expect(hh_mm_ss().safeParse('00:-1:00').success).toBe(false);
		});

		it('should reject a string where the seconds are negative', () => {
			expect(hh_mm_ss().safeParse('00:00:-1').success).toBe(false);
		});

		it('should fail if the string is not in the correct format', () => {
			expect(hh_mm_ss().safeParse('00-00-00').success).toBe(false);
		});

		it('should fail if the string does not contain seconds', () => {
			expect(hh_mm_ss().safeParse('00:00').success).toBe(false);
		});
	});
});
