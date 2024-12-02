import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const data = await prisma.page.findMany();

    return { data };
}) satisfies PageServerLoad;