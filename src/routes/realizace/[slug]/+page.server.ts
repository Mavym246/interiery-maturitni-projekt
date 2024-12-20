import { prisma } from "$lib/server/prisma";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import fs from "fs/promises";
import path from "path";

export const load = (async ({ params }) => {
  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    } as any,
    include: {
      images: true,
    },
  });

  return { project };
}) satisfies PageServerLoad;

export const actions = {
  imgUpload: async ({ request }) => {
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];
    const slug = formData.get("slug") as string;

    const uploadDir = path.join("static/realizace/", slug);
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles = [];
    for (const image of images) {
      if (!(image instanceof File)) continue;

      const fileName = image.name;
      const filePath = path.join(uploadDir, fileName);

      const fileBuffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      uploadedFiles.push({
        name: fileName,
        url: "/realizace/" + slug + "/" + fileName,
      });
    }

    await prisma.project.update({
      where: {
        slug: slug,
      },
      data: {
        images: {
          createMany: {
            data: uploadedFiles,
          },
        },
      },
    });
  },

  imgDelete: async ({ request }) => {
    const formData = await request.formData();
    const images = formData.getAll("images") as string[];

    await prisma.image.deleteMany({
      where: {
        name: {
          in: images,
        },
      },
    });
  },

  projectDelete: async ({ request }) => {
    const formData = await request.formData();
    const slug = formData.get("slug") as string;
    const images = formData.getAll("images") as string[];
    
    const img = images[0].split(",") as string[];
    
    console.log(images);

    await prisma.image.deleteMany({
      where: {
        name: {
          in: img,
        },
      },
    });

    await prisma.project.delete({
      where: {
        slug: slug,
      },
    });

    const uploadDir = path.join("static/realizace/", slug);
    await fs.rm(uploadDir, { recursive: true, force: true });
  },
/*
  projectUpdate: async ({ request }) => {
    const formData = await request.formData();
    const oldSlug = formData.get('oldSlug') as string;
    const newName = formData.get('name') as string;
    const newSlug = formData.get('slug') as string;

    const imagesJson = formData.get("images") as string;
    const imageNames = JSON.parse(imagesJson) as string[];

    const oldDir = path.join('static/realizace', oldSlug);
    const newDir = path.join('static/realizace', newSlug);

    await fs.rename(oldDir, newDir);

    await prisma.project.update({
      where: { slug: oldSlug },
      data: {
        name: newName,
        slug: newSlug,
      }
    });


    for (const imageName of imageNames) {
      await prisma.project.update({
        where: { slug: newSlug },
        data: {
          images: {
              where: { name: imageName },
              data: {
                url: "/realizace/" + newSlug + "/" + imageName,
              }
            }
          
        }
      });
    }

    return {
      success: true,
      message: 'Projekt úspěšně aktualizován a obrázky aktualizovány.'
    };
  },

  */

  editorSave: async ({ request }) => {
    const formData = await request.formData();
    const content = formData.get("description") as string;
    const slug = formData.get("slug") as string;

    await prisma.project.update({
      where: {
        slug: slug,
      },
      data: {
        description: content,
      },
    });
  }
} satisfies Actions;
