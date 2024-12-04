import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    setText: async ({ request }) => {
        const data = await request.formData();
        const id = parseInt(data.get('id') as string);
        const text = data.get('content') as string;

        await prisma.page.update({
            where: { id: id },
            data: { content: text },

        });

    },
}