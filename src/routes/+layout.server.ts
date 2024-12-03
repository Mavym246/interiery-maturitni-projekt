import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    const data = await prisma.page.findMany();
    
    return { data };
}) satisfies LayoutServerLoad;