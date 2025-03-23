<script lang="ts">
  import ProjectEdit from "../../../lib/components/forms/ProjectEdit.svelte";

  import ProjectDelDialog from "../../../lib/components/forms/ProjectDelDialog.svelte";
  import ImageDeleteForm from "../../../lib/components/forms/ImageDeleteForm.svelte";
  import type { PageData } from "./$types";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import Editor from "$lib/components/Editor.svelte";
  import ImageUploadForm from "$lib/components/forms/ImageUploadForm.svelte";
  import type { ProjectData } from "$lib/types";
  import PageContainer from "$lib/components/PageContainer.svelte";

  let { data }: { data: PageData } = $props();
  const loggedIn = data.loggedIn;
  const project = data.project as ProjectData;
</script>

<svelte:head>
  <title>{project.name} | Interiéry CZ</title>
  <meta name="description" content="Realizace projektu {project.name}" />
</svelte:head>

<PageContainer>
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
          <Carousel.Previous
            class="w-16 h-16 text-white bg-black/85 border-black cursor-pointer transition duration-300 hover:bg-black/60 hover:text-white"
          />
          <Carousel.Next
            class="w-16 h-16 text-white bg-black/85 border-black rounded-full cursor-pointer transition duration-300 hover:bg-black/60 hover:text-white"
          />
        </div>
      {/if}
    </Carousel.Root>
  {/if}

  {#if loggedIn}
    <div
      class="flex max-w-[400px] mx-auto flex-col items-center justify-center w-full gap-4 mt-24"
    >
      <!-- Nahrávání obrázků -->
      <ImageUploadForm data={project} />
    </div>

    <div class="flex flex-col items-center w-full mt-24">
      {#if !(project.images.length === 0)}
        <!-- Odstranění obrázků -->
        <ImageDeleteForm data={project} />
      {/if}
      <!-- Upravení projektu -->

      <div class="mt"></div>
      <ProjectEdit data={project} />
    </div>
  {/if}

  <section class=" flex flex-col mt-16">
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
      <ProjectDelDialog data={project} />
    </section>
  {/if}
</PageContainer>

<style>
</style>
