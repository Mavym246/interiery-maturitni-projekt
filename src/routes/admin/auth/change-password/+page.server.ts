import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import { hash, verify } from '@node-rs/argon2';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Redirect pokud uživatel není přihlášen
	if (!event.locals.user) {
		throw redirect(302, '/admin/auth/login');
	}
	return {};
};

export const actions: Actions = {
	changePassword: async (event) => {
		// Ověřit, že uživatel je přihlášen
		if (!event.locals.user) {
			return fail(401, { 
				message: 'Pro změnu hesla musíte být přihlášeni.',
				success: false 
			});
		}
		
		const formData = await event.request.formData();
		const currentPassword = formData.get('currentPassword');
		const newPassword = formData.get('newPassword');
		const confirmPassword = formData.get('confirmPassword');
		
		// Validace
		if (!validatePassword(currentPassword) || !validatePassword(newPassword)) {
			return fail(400, { 
				message: 'Heslo musí mít 6-255 znaků.',
				success: false
			});
		}
		
		if (newPassword !== confirmPassword) {
			return fail(400, { 
				message: 'Nové heslo a jeho potvrzení se neshodují.',
				success: false
			});
		}
		
		try {
			// Získání uživatele z databáze
			const user = await prisma.user.findUnique({
				where: { id: event.locals.user.id }
			});
			
			if (!user) {
				return fail(404, { 
					message: 'Uživatel nebyl nalezen.',
					success: false
				});
			}
			
			// Ověření současného hesla pomocí argon2
			const isValidPassword = await verify(user.passwordHash, currentPassword as string, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			});
			
			if (!isValidPassword) {
				return fail(400, { 
					message: 'Současné heslo není správné.',
					success: false
				});
			}
			
			// Vytvoření nového hash hesla
			const newPasswordHash = await hash(newPassword as string, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			});
			
			// Aktualizace hesla v databázi
			await prisma.user.update({
				where: { id: user.id },
				data: { 
					passwordHash: newPasswordHash
				}
			});
			
			return { 
				message: 'Heslo bylo úspěšně změněno.',
				success: true
			};
		} catch (error) {
			console.error('Chyba při změně hesla:', error);
			return fail(500, { 
				message: 'Došlo k neočekávané chybě při změně hesla.',
				success: false
			});
		}
	}
};

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
} 