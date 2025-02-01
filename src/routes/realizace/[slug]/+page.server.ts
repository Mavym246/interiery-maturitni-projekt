import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const uploadDirBase = process.env.UPLOAD_DIR || "static/realizace";

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
  imgUpload: async ({ request, locals }) => {
    try {
      const formData = await request.formData();
      const images = formData.getAll("images") as File[];
      const slug = formData.get("slug") as string;

      // Ověření dat
      if (!slug || images.length === 0) {
        return fail(400, { error: "Chybějící data" });
      }

      const uploadDir = path.join(uploadDirBase, slug);
      await fs.mkdir(uploadDir, { recursive: true });

      const uploadedFiles = [];
      for (const image of images) {
        if (!(image instanceof File)) continue;

        if (!image.type.startsWith('image/')) {
          return fail(400, { error: "Neplatný typ souboru" });
        }

        const fileName = image.name.split('.')[0];
        const webpFileName = `${fileName}.webp`;
        const filePath = path.join(uploadDir, webpFileName);

        // Komprese a konverze do WebP formátu
        const fileBuffer = Buffer.from(await image.arrayBuffer());
        await sharp(fileBuffer)
          .webp({ quality: 80 })
          .toFile(filePath);

        uploadedFiles.push({
          name: webpFileName,
          url: path.join("/api/realizace", slug, webpFileName),
        });
      }

      await prisma.project.update({
        where: { slug },
        data: {
          images: {
            createMany: {
              data: uploadedFiles,
            },
          },
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Upload error:', error);
      return fail(500, { error: "Chyba při nahrávání" });
    }
  },

  imgDelete: async ({ request }) => {
    const formData = await request.formData();
    const images = formData.getAll("images") as string[];
    const slug = formData.get("slug") as string;
    const uploadDir = path.join(uploadDirBase, slug, images[0].split(",")[0]);

    await prisma.image.deleteMany({
      where: {
        name: {
          in: images,
        },
      },
    });

    await fs.rm(uploadDir, { recursive: true, force: true });
  },

  projectDelete: async ({ request }) => {
    const formData = await request.formData();
    const slug = formData.get("slug") as string;
    const images = formData.getAll("images") as string[];
    
    const img = images[0].split(",") as string[];

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

    const uploadDir = path.join(uploadDirBase, slug);
    await fs.rm(uploadDir, { recursive: true, force: true });
  },

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