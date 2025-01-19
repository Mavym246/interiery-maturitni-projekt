<script lang="ts">
  import type { PageData } from "./$types";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import Editor from "$lib/components/Editor.svelte";
  import { toast } from "svelte-sonner";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import Loader from "$lib/components/Loader.svelte";

  let { data }: { data: PageData } = $props();

  interface Project {
    name: string;
    slug: string;
    description: string;
    published: boolean;
    images: { id: string; url: string; name: string }[];
  }

  const loggedIn = data.loggedIn;
  const project = data.project as Project;
  let deleteDialogOpen = $state(false);
  let formLoading = $state(false);
</script>

<svelte:head>
  <title>{project.name} | Interiéry CZ</title>
</svelte:head>

<br />
<div class="flex sm:mt-24 flex-col max-w-[1400px]  justify-center mx-auto">
  {#if project.images.length === 0}
    <span class="mt-24 text-5xl font-bold text-center">Zatím žádný obrázek</span
    >
  {:else}
    <Carousel.Root opts={{ loop: true }}>
      <Carousel.Content>
        {#each project.images as image}
          <Carousel.Item>
            <img
              src={image.url}
              alt={image.name}
              class="w-full h-full lg:object-contain object-cover mx-auto max-w-[1400px] max-h-[80vh]"
            />
          </Carousel.Item>
        {/each}
      </Carousel.Content>

      {#if project.images.length > 1}
      <div class="relative mx-auto self-center justify-self-end max-w-[70px]">
        <Carousel.Previous class="w-16 h-16 text-white bg-black border-black" />
        <Carousel.Next class="w-16 h-16 text-white bg-black border-black rounded-full" />
      </div>
      {/if}



    </Carousel.Root>
  {/if}

  {#if loggedIn}
    <!-- Nahrávání obrázků -->

    <div
      class="flex max-w-[400px] mx-auto flex-col items-center justify-center w-full gap-4 mt-24"
    >
      <span class="text-2xl font-semibold">Nahrát Obrázek</span>
      <form
        class="flex flex-col items-center justify-center w-full gap-4"
        method="post"
        action="?/imgUpload"
        enctype="multipart/form-data"
        use:enhance={({ formData }) => {
          formData.append("slug", project.slug);
          formLoading = true;

          return async ({ result }) => {
            if (result.type === "success") {
              toast.success("Obrázek byl úspěšně nahrán");
              await new Promise((res) => setTimeout(res, 1000));
              formLoading = false;
              window.location.reload();
            }
          };
        }}
      >
        <Input
          required
          class="hover:cursor-pointer"
          type="file"
          name="images"
          multiple
          accept="image/*"
        />

        <Button
          disabled={formLoading}
          type="submit"
          class="px-8 py-2 text-center border rounded-xl"
        >
          {#if formLoading}
            <Loader />
          {:else}
            Nahrát
          {/if}
        </Button>
      </form>
    </div>

    <div class="flex flex-col items-center w-full mt-24">
      {#if !(project.images.length === 0)}
        <!-- Odstranění obrázků -->
        <span class="text-2xl font-semibold">Odstranit obrázek</span>
        <form
          method="post"
          action="?/imgDelete"
          use:enhance={({ formData }) => {
            formData.append("slug", project.slug);
            return async ({ result }) => {
              if (result.type === "success") {
                window.location.reload();
              }
            };
          }}
        >
          <select
            class="w-48 p-2 bg-white border border-black rounded-xl"
            name="images"
          >
            {#each project.images as image}
              <option class="w-full" value={image.name}>
                {image.name}
              </option>
            {/each}
          </select>

          <Button
            class="px-8 py-2 mt-12 border border-black rounded-xl"
            type="submit">Vymazat Obrázek</Button
          >
        </form>
      {/if}
      <!-- Upravení projektu -->

      <!-- <form class="flex flex-col items-center p-8 mt-24 bg-gray-300" action="?/projectUpdate" method="post" use:enhance={({ formData }) => {
        formData.append("oldSlug", project.slug);
        const getName = formData.get("name") as string;
        formData.append("images", JSON.stringify(project.images.map((image: any) => image)));
        const slug = getName            
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
        formData.append("slug", slug);

        return async ({ result }) => {
          if (result.type === "success") {
            goto("/realizace/" + slug);
          }
        };

          }}>
        <input type="text" name="name" value={project.name} />
        <button class="px-8 py-2 mt-12 border border-black rounded-xl"
          >Upravit Projekt</button>
          <p>{project.images.map((image) => image)}</p>
      </form> -->

      <!-- Odstranění projektu -->
    </div>
  {/if}

  <section class=" flex flex-col min-h-[400px] mt-24">
    <h1 class="text-6xl font-bold">{project.name}</h1>

    <div class="mt-4 tiptap">
      {#if loggedIn}
        <Editor description={project.description} slug={project.slug} />
      {:else}
        {@html project.description}
      {/if}
    </div>
  </section>

  {#if loggedIn}
    <section class="flex justify-center mt-16">
      <Dialog.Root bind:open={deleteDialogOpen}>
        <Dialog.Trigger
          class={buttonVariants({ variant: "outline" }) +
            "w-48 border-red-600 bg-red-300"}
        >
          Odstranit projekt
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Odstranit Projekt</Dialog.Title>
            <Dialog.Description>
              Opravdu chcete tento projekt odstranit? Tato akce je nevratná.
            </Dialog.Description>
          </Dialog.Header>

          <form
            action="?/projectDelete"
            method="post"
            use:enhance={({ formData }) => {
              formData.append("slug", project.slug);
              formData.append(
                "images",
                JSON.stringify(project.images.map((image) => image.name))
              );

              return async ({ result }) => {
                if (result.type === "success") {
                  await goto("/realizace");
                  toast.success("Projekt byl úspěšně odstraněn");
                }
              };
            }}
          >
            <Button
              type="submit"
              class="px-8 py-2 text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white rounded-xl"
              >Ano</Button
            >
            <Button
              type="button"
              class="px-8 py-2 text-black bg-white border border-black hover:text-white rounded-xl"
              onclick={() => (deleteDialogOpen = false)}>Ne</Button
            >
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </section>
  {/if}
</div>

<style>
</style>
