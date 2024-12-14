import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event: ServerLoadEvent) => { 
    const data = await prisma.page.findMany();

    const loggedIn = event.locals.session;


        return { data, loggedIn };
};
