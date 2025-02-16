<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { toast } from "svelte-sonner";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { ProjectData } from "$lib/types";

  let { data }: { data: ProjectData } = $props();

  const project = data as ProjectData;
  let deleteDialogOpen = $state(false);
</script>

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

<style>
</style>
