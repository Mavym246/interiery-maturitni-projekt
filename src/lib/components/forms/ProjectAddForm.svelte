<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { goto } from "$app/navigation";
  import Loader from "$lib/components/Loader.svelte";
  import { toast } from "svelte-sonner";
  import type { CategoryData } from "$lib/types";

  let { categories } = $props<{ categories: CategoryData[] }>();
  let formLoading = $state(false);
</script>

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
      use:enhance={async ({ formData }) => {
        formLoading = true;
        const name = formData.get("name") as string;
        const slug = name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        formData.append("slug", slug);

        return ({ result }) => {
          formLoading = false;
          if (result.type === "success") {
            goto("/realizace/" + slug);
            toast.success("Projekt byl úspěšně vytvořen");
          } else {
            toast.error("Projekt se nepodařilo vytvořit");
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