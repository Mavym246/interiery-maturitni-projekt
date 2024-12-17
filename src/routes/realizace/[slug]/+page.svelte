<script lang="ts">
  import type { PageData } from "./$types";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  let { data }: { data: PageData } = $props();

  const loggedIn = data.loggedIn;
  const project = data.project as any;
</script>

<br />
<div class="flex mt-24 flex-col max-w-[1400px] justify-center mx-auto">
  {#if project.images.length === 0}
    <span class="mt-24 text-5xl font-bold text-center">Zatím žádný obrázek</span
    >
  {:else}
    <Carousel.Root opts={{ loop: true }}>
      <Carousel.Content>
        {#each project.images as image}
          <Carousel.Item>
            <img
              src={image.url}
              alt={image.name}
              class="w-full h-full object-contain mx-auto max-w-[1400px] max-h-[80vh]"
            />
          </Carousel.Item>
        {/each}
      </Carousel.Content>

      <div class="relative mx-auto self-center justify-self-end max-w-[70px]">
        <Carousel.Previous class="w-16 h-16 text-white bg-black border-black" />
        <Carousel.Next class="w-16 h-16 text-white bg-black border-black rounded-full" />
      </div>
    </Carousel.Root>
  {/if}

  {#if loggedIn}
    <!-- Nahrávání obrázků -->
    <form
      class="flex flex-col items-center p-8 mt-24 bg-gray-300"
      method="post"
      action="?/imgUpload"
      enctype="multipart/form-data"
      use:enhance={({ formData }) => {
        formData.append("slug", project.slug);

        return async ({ result }) => {
          if (result.type === "success") {
            window.location.reload();
          }
        };
      }}
    >
      <input type="file" name="images" multiple accept="image/*" />

      <button class="px-8 py-2 mt-12 border border-black rounded-xl"
        >Nahrát</button
      >
    </form>

    <div class="flex flex-col items-center w-full mt-24">
      {#if !(project.images.length === 0)}
      <!-- Odstranění obrázků -->
        <form
          method="post"
          action="?/imgDelete"
          use:enhance={({ formData }) => {
            return async ({ result }) => {
              if (result.type === "success") {
                window.location.reload();
              }
            };
          }}
        >
          <select class="w-36" name="images">
            {#each project.images as image}
              <option class="w-36" value={image.name}>
                {image.name}
              </option>
            {/each}
          </select>

          <button class="px-8 py-2 mt-12 border border-black rounded-xl"
            >Vymazat Obrázek</button
          >
        </form>
      {/if}

      <!-- Odstranění projektu -->

      <form
        action="?/projectDelete"
        method="post"
        use:enhance={({ formData }) => {
          formData.append("slug", project.slug);
          formData.append(
            "images",
            project.images.map((image: any) => image.name)
          );

          return async ({ result }) => {
            if (result.type === "success") {
              goto("/realizace");
            }
          };
        }}
      >
        <button
          type="submit"
          class="px-8 py-2 mt-12 border border-black rounded-xl"
          >Odstranit Projekt</button
        >
      </form>
    </div>
  {/if}

  <section class="items-center h-32 mt-32">
    <h1 class="text-6xl font-bold">{project.name}</h1>
    <span>wysiwyg editor</span>
  </section>
</div>
