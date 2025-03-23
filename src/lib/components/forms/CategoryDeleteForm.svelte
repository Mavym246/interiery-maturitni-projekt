<script lang="ts">
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Loader from "$lib/components/Loader.svelte";
  import type { CategoryData } from "$lib/types";
  import { page } from "$app/state";
  
  let { category }: { category: CategoryData } = $props();
  
  let loggedIn = $derived(page.data.loggedIn);
  let dialogOpen = $state(false);
  let formLoading = $state(false);
</script>

{#if loggedIn}
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger
      class={buttonVariants({ variant: "outline" }) + 
      " ml-2 px-2 py-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"}
    >
      ×
    </Dialog.Trigger>
    
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Odstranit kategorii</Dialog.Title>
        <Dialog.Description>
          Opravdu chcete odstranit kategorii "{category.name}"? Tato akce je nevratná.
        </Dialog.Description>
      </Dialog.Header>

      <form
        method="post"
        action="?/deleteCategory"
        class="flex flex-col gap-4"
        use:enhance={({ formData }) => {
          formLoading = true;
          formData.append("categoryId", category.id.toString());
          
          return async ({ result }) => {
            formLoading = false;
            if (result.type === "success") {
              dialogOpen = false;
              toast.success("Kategorie byla úspěšně odstraněna");
              window.location.reload();
            } else if (result.type === "failure") {
              toast.error("Kategorii se nepodařilo odstranit");
            } else {
              toast.error("Kategorii se nepodařilo odstranit");
            }
          };
        }}
      >
        <div class="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onclick={() => (dialogOpen = false)}
          >
            Zrušit
          </Button>
          <Button 
            type="submit" 
            disabled={formLoading}
            class="bg-red-600 hover:bg-red-700 text-white"
          >
            {#if formLoading}
              <Loader />
            {:else}
              Odstranit
            {/if}
          </Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}