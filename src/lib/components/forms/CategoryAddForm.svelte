<script lang="ts">
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Loader from "$lib/components/Loader.svelte";
  
  let formLoading = $state(false);
  let categoryName = $state("");
  let dialogOpen = $state(false);
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " max-w-32"}>
    Přidat kategorii
  </Dialog.Trigger>
  
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Přidat kategorii</Dialog.Title>
      <Dialog.Description>
        Zadejte název nové kategorie a klikněte na Přidat.
      </Dialog.Description>
    </Dialog.Header>

    <form
      method="post"
      action="?/addCategory"
      class="flex flex-col gap-4"
      use:enhance={({ formData }) => {
        formLoading = true;
        
        return async ({ result }) => {
          formLoading = false;
          if (result.type === "success") {
            dialogOpen = false;
            categoryName = "";
            toast.success("Kategorie byla úspěšně přidána");
            window.location.reload();
          } else {
            toast.error("Kategorii se nepodařilo přidat");
          }
        };
      }}
    >
      <div class="flex flex-col gap-2">
        <Label for="category-name">Název kategorie</Label>
        <Input 
          id="category-name"
          type="text" 
          name="name" 
          placeholder="Nová kategorie" 
          required 
          bind:value={categoryName}
          class="w-full"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={formLoading} 
        class="w-full"
      >
        {#if formLoading}
          <Loader />
        {:else}
          Přidat
        {/if}
      </Button>
    </form>
  </Dialog.Content>
</Dialog.Root>
