<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { CategoryData, ProjectData } from "$lib/types";
  import CategoryAddForm from "$lib/components/forms/CategoryAddForm.svelte";
  import CategoryDeleteForm from "$lib/components/forms/CategoryDeleteForm.svelte";
  import ProjectAddForm from "$lib/components/forms/ProjectAddForm.svelte";
  import PageContainer from "$lib/components/PageContainer.svelte";

  let { data } = $props<{
    data: {
      projects: ProjectData[];
      categories: CategoryData[];
      loggedIn: boolean;
    };
  }>();

  let projects = $state([...data.projects.reverse()]);
  let categories = $state(data.categories);
  let selectedCategory = $state<string | null>(null);
  let filterKey = $state(0);

  let filteredProjects = $derived(
    selectedCategory
      ? projects.filter((project: ProjectData) =>
          project.categories.some(
            (category: CategoryData) => category.name === selectedCategory
          )
        )
      : projects
  );

  const updateCategory = (category: string) => {
    selectedCategory = selectedCategory === category ? null : category;
    filterKey++;
  };
</script>

<svelte:head>
  <title>Realizace | Interiéry CZ</title>
</svelte:head>

<PageContainer>
  <h1 class="mb-8 text-6xl font-bold text-center">Realizace</h1>

  {#if data.loggedIn}
    <ProjectAddForm {categories} />
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
              class="hover:underline hover:bg-transparent bg-transparent text-black {selectedCategory ===
              category.name
                ? 'underline font-bold'
                : ''}"
            >
              {category.name}
            </Button>
              <CategoryDeleteForm {category} />
          </Carousel.Item>
        {/each}
        {#if data.loggedIn}
        <Carousel.Item>
            <CategoryAddForm />
          </Carousel.Item>
        {/if}
      </Carousel.Content>

      {#if categories.length >= 3}
        <Carousel.Previous />
        <Carousel.Next />
      {/if}
    </Carousel.Root>
  </div>

  <div class="grid gap-16 lg:grid-cols-2">
    {#each filteredProjects as project, i}
      <ProjectCard data={project} index={i} {filterKey} />
    {/each}
  </div>
</PageContainer>
