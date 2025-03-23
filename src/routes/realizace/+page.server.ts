import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { CategoryData, ProjectData } from "$lib/types";

export const load = (async ({ url }) => {
  const category = url.searchParams.get("category");

  const projects: ProjectData[] = await prisma.project.findMany({
    where: category
      ? {
          categories: {
            some: {
              name: category,
            },
          },
        }
      : {},
    include: {
      images: true,
      categories: true,
    },
  });

  const categories: CategoryData[] = await prisma.category.findMany();

  return { projects, categories };
}) satisfies PageServerLoad;

export const actions = {
  addProject: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const slug = data.get("slug") as string;
    const categories = data.getAll("categories") as string[];

    await prisma.project.create({
      data: {
        name,
        slug,
        description: "",
        published: false,
        categories: {
          connect: categories.map((id) => ({ id: parseInt(id) })),
        },
      },
    });
  },

  addCategory: async ({ request }) => {
    try {
      const data = await request.formData();
      const name = data.get("name") as string;

      if (!name) {
        return fail(400, { error: "Název kategorie je povinný" });
      }

      const existingCategory = await prisma.category.findFirst({
        where: { name },
      });

      if (existingCategory) {
        return fail(400, { error: "Kategorie s tímto názvem již existuje" });
      }

      await prisma.category.create({
        data: { name },
      });

      return { success: true };
    } catch (error) {
      console.error("Error creating category:", error);
      return fail(500, { error: "Chyba při vytváření kategorie" });
    }
  },

  deleteCategory: async ({ request }) => {
    try {
      const data = await request.formData();
      const categoryId = parseInt(data.get("categoryId") as string);

      if (!categoryId) {
        return fail(400, { error: "ID kategorie je povinné" });
      }

      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return fail(404, { error: "Kategorie nebyla nalezena" });
      }

      // Odstranění kategorie
      await prisma.category.delete({
        where: { id: categoryId }
      });

      return { success: true };
    } catch (error) {
      console.error("Error deleting category:", error);
      return fail(500, { error: "Chyba při odstraňování kategorie" });
    }
  },
} satisfies Actions;
