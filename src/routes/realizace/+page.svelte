<script lang="ts">
  import { enhance } from "$app/forms";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { goto } from "$app/navigation";
  import Loader from "$lib/components/Loader.svelte";
  import { toast } from "svelte-sonner";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { CategoryData, ProjectData } from "$lib/types";
  import { page } from "$app/state";

  export let data: { projects: ProjectData[], categories: CategoryData[], loggedIn: boolean };
  let formLoading = false;

  let projects: ProjectData[] = [...data.projects];
  let categories: CategoryData[] = [...data.categories];
  let selectedCategory: string | null = null;
  let filterKey = 0;

  $: filteredProjects = selectedCategory
    ? projects.filter(project =>
        project.categories.some(category => category.name === selectedCategory)
      )
    : projects;

  const updateCategory = (category: string) => {
    if (selectedCategory === category) {
      selectedCategory = null;
    } else {
      selectedCategory = category;
    }
    filterKey++; // Increment key to trigger re-animation
  };
</script>

<svelte:head>
  <title>Realizace | Interiéry CZ</title>
</svelte:head>

<br />

<div class="flex flex-col mx-auto lg:px-12 px-4 max-w-[1500px] w-full h-full sm:mt-32">
  <h1 class="mb-8 text-6xl font-bold text-center">Realizace</h1>

  {#if data.loggedIn}
    <Dialog.Root>
      <Dialog.Trigger
        class={buttonVariants({ variant: "outline" }) +
          " max-w-32 mx-auto mb-8"}>Přidat Projekt</Dialog.Trigger
      >
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Přidat projekt</Dialog.Title>
          <Dialog.Description>
            Vyplňte název projektu a klikněte na Uložit Změny.
          </Dialog.Description>
        </Dialog.Header>

        <form
          method="post"
          action="?/addProject"
          class="flex flex-col gap-4"
          use:enhance={({ formData }) => {
            formLoading = true;
            const name = formData.get("name") as string;
            const slug = name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
            formData.append("slug", slug);

            return async ({ result }) => {
              formLoading = false;
              if (result.type === "success") {
                goto("/realizace/" + slug);
                toast.success("Projekt byl úspěšně vytvořen");
              } else {
                toast.error("Projekt se nepodařilo vytvořit");
              }
            };
          }}
        >
          <Label for="name" class="my-2">Název</Label>
          <Input required type="text" name="name" />

          <Label for="categories">Kategorie</Label>
          <select
            required
            multiple
            class="p-2 bg-white border border-black rounded"
            name="categories"
            id=""
          >
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>

          <Button type="submit" disabled={formLoading}>
            {#if formLoading}
              <Loader />
            {:else}
              Uložit Změny
            {/if}
          </Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  {/if}

  <div class="flex justify-center mb-8">
    <Carousel.Root
      opts={{
        align: "start",
      }}
      class="w-full lg:max-w-sm max-w-[16rem]"
    >
      <Carousel.Content class="flex justify-between">
        {#each categories as category}
          <Carousel.Item class="text-center basis-1/2 lg:basis-1/3">
            <Button
              onclick={() => updateCategory(category.name)}
              class="hover:underline hover:bg-transparent bg-transparent text-black {selectedCategory === category.name ? 'underline font-bold' : ''}"
            >
              {category.name}
            </Button>
          </Carousel.Item>
        {/each}
      </Carousel.Content>

      {#if categories.length >= 3}
        <Carousel.Previous />
        <Carousel.Next />
      {/if}
    </Carousel.Root>
  </div>

  <div class="grid gap-16 lg:grid-cols-2">
    {#each filteredProjects as project, i}
      <ProjectCard data={project} index={i} filterKey={filterKey} />
    {/each}
  </div>
</div>
