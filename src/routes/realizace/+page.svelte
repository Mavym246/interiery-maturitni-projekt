<script lang="ts">
  import { enhance } from "$app/forms";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import Loader from "$lib/components/Loader.svelte";
  import { toast } from "svelte-sonner";

  let { data }: { data: PageData } = $props();
  let formLoading = $state(false);

  const projects = [...data.data];
</script>

<br />

<div class="flex flex-col mx-auto px-12 max-w-[1500px] mt-32">
  <h1 class="mb-12 text-6xl font-bold text-center">Realizace</h1>

  {#if data.loggedIn}
    <Dialog.Root>
      <Dialog.Trigger
        class={buttonVariants({ variant: "outline" }) + " max-w-32 mx-auto mb-8"}
        >Přidat Projekt</Dialog.Trigger
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
          <Input type="text" name="name" />
          <!-- <select name="category" id="">
            {#each projects as project}
              <option value={project.categories[0].id}>{project.categories[0].name}</option>
            {/each}
          </select> -->

          <Button type="submit">
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

  <div class="grid grid-cols-2 gap-16">
    {#each projects as project}
      <ProjectCard data={project} />
    {/each}
  </div>
</div>
