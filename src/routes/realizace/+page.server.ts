import { prisma } from '$lib/server/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const data = await prisma.project.findMany(
        {
            include: {
                images: true
            }
        }
    );
    return { data };
}) satisfies PageServerLoad;

export const actions = {
    addProject: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const slug = data.get('slug') as string;


        await prisma.project.create({
            data: {
                name,
                slug,
                description: '',
                published: false
            }
        });

    }
} satisfies Actions;