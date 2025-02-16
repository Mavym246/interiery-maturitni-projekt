<script lang="ts">
  
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
  import Loader from "$lib/components/Loader.svelte";
  import type { ProjectData } from "$lib/types";

  let { data }: { data: ProjectData } = $props();


  const project = data as ProjectData;
  let formLoading = $state(false);
</script>

        <span class="text-2xl font-semibold">Odstranit obrázek</span>
        <form
          method="post"
          action="?/imgDelete"
          use:enhance={({ formData }) => {
            formData.append("slug", project.slug);
            formLoading = true;
            return async ({ result }) => {
              if (result.type === "success") {
                formLoading = false;
                window.location.reload();
                toast.success("Obrázek byl úspěšně odstraněn");
              } else {
                toast.error("Obrázek nebyl odstraněn");
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
            type="submit"
            disabled={formLoading}
          >
            {#if formLoading}
              <Loader />
            {:else}
              Vymazat Obrázek
            {/if}
          </Button>
        </form>

<style>
</style>

