<script lang="ts">
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import type { ProjectData } from "$lib/types";

  let { data }: { data: ProjectData } = $props();



  const project = data as ProjectData;
  let formLoading = $state(false);
</script>

      <span class="text-2xl font-semibold">Nahrát Obrázek</span>
      <form
        class="flex flex-col items-center justify-center w-full gap-4"
        method="post"
        action="?/imgUpload"
        enctype="multipart/form-data"
        use:enhance={({ formData }) => {
          formData.append("slug", project.slug);
          formLoading = true;
          
          return async ({ result }) => {
            if (result.type === "success") {
              toast.success("Obrázek byl úspěšně nahrán");
              await new Promise((res) => setTimeout(res, 1000));
              formLoading = false;
              window.location.reload();
            }
          };
        }}
      >
        <Input
          required
          class="hover:cursor-pointer"
          type="file"
          name="images"
          multiple
          accept="image/*"
        />

        <Button
          disabled={formLoading}
          type="submit"
          class="px-8 py-2 text-center border rounded-xl"
        >
          {#if formLoading}
            <Loader />
          {:else}
            Nahrát
          {/if}
        </Button>
      </form>

<style>
</style>

