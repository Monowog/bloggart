import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandle: Handle = async ({ event, resolve }) => {
    return svelteKitHandler({ event, resolve, auth, building });
};

const sessionHandle: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });

  event.locals.user = session?.user;

  const response = await resolve(event);

  return response;
}

export const handle: Handle = sequence(Sentry.sentryHandle(), sequence(authHandle, sessionHandle));
export const handleError = Sentry.handleErrorWithSentry();