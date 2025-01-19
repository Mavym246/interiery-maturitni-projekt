import { prisma } from '$lib/server/prisma';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { CategoryData, ProjectData } from '$lib/types';

export const load = (async () => {
    const data: ProjectData[] = await prisma.project.findMany(
        {
            include: {
                images: true,
                categories: true
            }
        }
    );

    const catageories: CategoryData[] = await prisma.category.findMany();

    return { data, catageories };
}) satisfies PageServerLoad;

export const actions = {
    addProject: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const slug = data.get('slug') as string;

        const categories = data.getAll('categories') as string[];


        await prisma.project.create({
            data: {
                name,
                slug,
                description: '',
                published: false,
                
                categories: {
                    connect: categories.map((id) => ({ id: parseInt(id) }))
                }
            }
        });

    }
} satisfies Actions;