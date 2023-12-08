import { guard } from '$lib/auth/guardHook.server';
import { populateUser } from '$lib/auth/populateUserHook.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(populateUser, guard);
