import { hash, verify } from '@node-rs/argon2';
import crypto from 'crypto';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/admin/auth');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Neplatné uživatelské jméno' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Neplatné heslo' });
		}

		const existingUser = await prisma.user.findUnique({
			where: { username: username as string },
		});

		if (!existingUser) {
			return fail(400, { message: 'Nesprávné uživatelské jméno nebo heslo' });
		}

		const validPassword = await verify(existingUser.passwordHash, password as string, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});
		if (!validPassword) {
			return fail(400, { message: 'Nesprávné uživatelské jméno nebo heslo' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		throw redirect(302, '/admin/auth');
	},
	// register: async (event) => {
	// 	const formData = await event.request.formData();
	// 	const username = formData.get('username');
	// 	const password = formData.get('password');

	// 	if (!validateUsername(username)) {
	// 		return fail(400, { message: 'Neplatné uživatelské jméno' });
	// 	}
	// 	if (!validatePassword(password)) {
	// 		return fail(400, { message: 'Neplatné heslo' });
	// 	}

	// 	const userId = generateUserId();
	// 	const passwordHash = await hash(password as string, {
	// 		memoryCost: 19456,
	// 		timeCost: 2,
	// 		outputLen: 32,
	// 		parallelism: 1,
	// 	});

	// 	try {
	// 		await prisma.user.create({
	// 			data: {
	// 				id: userId,
	// 				username: username as string,
	// 				passwordHash,
	// 			},
	// 		});

	// 		const sessionToken = auth.generateSessionToken();
	// 		const session = await auth.createSession(sessionToken, userId);
	// 		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	// 	} catch (e) {
	// 		return fail(500, { message: 'Došlo k chybě' });
	// 	}
	// 	throw redirect(302, '/admin/auth');
	// },
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.randomBytes(15);
	// Convert to base64 and make it URL-safe and resembling base32
	return bytes.toString('base64')
		.replace(/\+/g, '')
		.replace(/\//g, '')
		.replace(/=/g, '')
		.toLowerCase();
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
