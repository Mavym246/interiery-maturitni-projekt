<script lang="ts">
  import type { ProjectData } from "$lib/types";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { toast } from "svelte-sonner";
  import Loader from "$lib/components/Loader.svelte";
  import { page } from "$app/state";

  let { data }: { data: ProjectData } = $props();
  const project = data as ProjectData;
  
  let loggedIn = $derived(page.data.loggedIn);
  let dialogOpen = $state(false);
  let formLoading = $state(false);
</script>

{#if loggedIn}
  <Button
    class="cursor-pointer text-blue-600 hover:opacity-80"
    onclick={() => dialogOpen = true}
  >
    Upravit
  </Button>
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Upravit projekt</Dialog.Title>
        <Dialog.Description>
          Upravte název projektu a klikněte na Uložit Změny.
        </Dialog.Description>
      </Dialog.Header>

      <form
        class="flex flex-col gap-4"
        action="?/projectUpdate"
        method="post"
        use:enhance={({ formData }) => {
          formLoading = true;
          formData.append("oldSlug", project.slug);
          const getName = formData.get("name") as string;
          formData.append(
            "images",
            JSON.stringify(project.images.map((image: any) => image))
          );
          const newSlug = getName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          formData.append("newSlug", newSlug);

          return async ({ result }) => {
            formLoading = false;
            if (result.type === "success") {
              dialogOpen = false;
              toast.success("Projekt byl úspěšně upraven");
              goto("/realizace/" + newSlug);
            } else {
              toast.error("Projekt se nepodařilo upravit");
            }
          };
        }}
      >
        <Label for="name">Název projektu</Label>
        <Input type="text" name="name" defaultValue={project.name} />
        
        <div class="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onclick={() => (dialogOpen = false)}
          >
            Zrušit
          </Button>
          <Button type="submit" disabled={formLoading}>
            {#if formLoading}
              <Loader />
            {:else}
              Uložit Změny
            {/if}
          </Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}

<style>
</style>
