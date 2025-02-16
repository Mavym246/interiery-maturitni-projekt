import { prisma } from "$lib/server/prisma";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const uploadDirBase = process.env.UPLOAD_DIR || "static/realizace";
const isProduction = process.env.NODE_ENV === "production";
const maxFileSize = process.env.BODY_SIZE_LIMIT || 50000000;
const basePath = isProduction ? "/api/realizace" : "/realizace";

export const load = (async ({ params }) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: { images: true },
    });

    if (!project) {
      throw error(404, "Projekt nenalezen");
    }

    return { project };
  } catch (error) {
    console.error(error);
    return fail(500, { error: "Nastala chyba" });
  }
}) satisfies PageServerLoad;

export const actions = {
  imgUpload: async ({ request }) => {
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

      const uploadedFiles: { name: string; url: string }[] = [];
      await Promise.all(
        images.map(async (image) => {
          if (!(image instanceof File)) return;

          // Kontrola velikosti souboru
          if (image.size > Number(maxFileSize)) {
            return fail(400, {
              error: `Soubor ${image.name} je příliš velký. Maximální velikost je ${maxFileSize} bytes.`,
            });
          }

          const fileName = image.name.split(".")[0];
          const webpFileName = `${fileName}.webp`;
          const filePath = path.join(uploadDir, webpFileName);

          const fileBuffer = Buffer.from(await image.arrayBuffer());
          await sharp(fileBuffer).webp({ quality: 80 }).toFile(filePath);

          uploadedFiles.push({
            name: webpFileName,
            url: path.join(basePath, slug, webpFileName),
          });
        })
      );

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
      console.error("Upload error:", error);
      return fail(500, { error: "Chyba při nahrávání" });
    }
  },

  imgDelete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const images = formData.getAll("images") as string[];
      const slug = formData.get("slug") as string;

      if (!slug || !images.length) {
        return fail(400, { error: "Chybějící data" });
      }

      // Kontrola, zda cesta nevede mimo povolený adresář
      const normalizedUploadDir = path.normalize(uploadDirBase);
      const targetPath = path.normalize(path.join(uploadDirBase, slug));
      if (!targetPath.startsWith(normalizedUploadDir)) {
        return fail(400, { error: "Neplatná cesta" });
      }

      await prisma.image.deleteMany({
        where: {
          name: { in: images },
        },
      });

      // Mazat jen konkrétní soubor, ne celý adresář
      for (const image of images) {
        const filePath = path.join(uploadDirBase, slug, image);
        await fs.unlink(filePath).catch(() => {
          console.warn(`Soubor ${filePath} nelze smazat nebo neexistuje`);
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Delete error:", error);
      return fail(500, { error: "Chyba při mazání" });
    }
  },

  projectUpdate: async ({ request }) => {
    try {
      const formData = await request.formData();
      const oldSlug = formData.get("oldSlug") as string;
      const newName = formData.get("name") as string;
      if (!oldSlug || !newName) {
        return fail(400, { error: "Chybějící údaje" });
      }
      const newSlug = formData.get("newSlug") as string;
      const oldPath = path.join(uploadDirBase, oldSlug);
      const newPath = path.join(uploadDirBase, newSlug);

      console.log(newPath + "    nový path");
      console.log(oldPath + "    starý path");

      try {
        await fs.access(oldPath);
        await fs.rename(oldPath, newPath);
      } catch {
        console.warn(`Folder ${oldSlug} not found or cannot be renamed.`);
      }

      // Update DB in a transaction
      await prisma.$transaction(async (tx) => {
        const project = await tx.project.update({
          where: { slug: oldSlug },
          data: { slug: newSlug, name: newName },
          include: { images: true },
        });

        // Update image URLs
        await Promise.all(
          project.images.map(async (img) => {
            const updatedUrl = path.join(basePath, newSlug, img.name);

            await tx.image.update({
              where: { id: img.id },
              data: { url: updatedUrl },
            });
          })
        );
      });

      return { success: true };
    } catch (err) {
      console.error("Project rename error:", err);
      return fail(500, { error: "Chyba při přejmenování projektu" });
    }
  },

  projectDelete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const slug = formData.get("slug") as string;
      const images = formData.getAll("images") as string[];

      if (!slug) {
        return fail(400, { error: "Chybí slug projektu" });
      }

      await prisma.$transaction(async (tx) => {
        const project = await tx.project.findUnique({
          where: { slug },
          include: { images: true },
        });

        if (!project) {
          throw new Error("Projekt nenalezen");
        }

        if (images.length) {
          await tx.image.deleteMany({
            where: { name: { in: images } },
          });
        }

        await tx.project.delete({
          where: { slug },
        });
      });

      // Mazání souborů až po úspěšné DB operaci
      const uploadDir = path.join(uploadDirBase, slug);
      await fs.rm(uploadDir, { recursive: true }).catch(console.error);

      return { success: true };
    } catch (error) {
      console.error("Delete error:", error);
      return fail(500, { error: "Chyba při mazání projektu" });
    }
  },

  editorSave: async ({ request }) => {
    try {
      const formData = await request.formData();
      const content = formData.get("description") as string;
      const slug = formData.get("slug") as string;

      if (!slug) {
        return fail(400, { error: "Chybí slug projektu" });
      }

      if (!content) {
        return fail(400, { error: "Chybí obsah" });
      }

      if (content.length > 50000) {
        return fail(400, { error: "Obsah je příliš dlouhý" });
      }

      const project = await prisma.project.findUnique({
        where: { slug },
      });

      if (!project) {
        return fail(404, { error: "Projekt nenalezen" });
      }

      await prisma.project.update({
        where: { slug },
        data: { description: content },
      });

      return { success: true };
    } catch (error) {
      console.error("Editor error:", error);
      return fail(500, { error: "Chyba při ukládání" });
    }
  },
} satisfies Actions;
