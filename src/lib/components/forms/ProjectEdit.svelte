<script lang="ts">
  import type { ProjectData } from "$lib/types";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";

  let { data }: { data: ProjectData } = $props();
  const project = data as ProjectData;
</script>

<form
  class="flex flex-col items-center p-8 mt-24 bg-gray-300"
  action="?/projectUpdate"
  method="post"
  use:enhance={({ formData }) => {
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

    return async ({ result }: { result: { type: string } }) => {
      if (result.type === "success") {
        goto("/realizace/" + newSlug);
      }
    };
  }}
>
  <input type="text" name="name" defaultValue={project.name} />
  <button class="px-8 py-2 mt-12 border border-black rounded-xl"
    >Upravit Projekt</button
  >
</form>

<style>
</style>
