<script lang="ts">
  import TextDialog from "$lib/components/TextDialog.svelte";
  import type { TextData } from "$lib/types";
  import { Info, Instagram, Mail, MapPin, Phone } from "lucide-svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let text: TextData[] = data.textData;
</script>

<svelte:head>
  <title>Kontakt | Interiéry CZ</title>
  <meta name="description" content="Kontakt | Interiéry CZ" />
</svelte:head>

<div class="flex flex-col mx-auto px-4 md:px-12 w-full max-w-[1500px] lg:mt-32">
  <h1
    class="lg:text-6xl text-4xl sm:text-5xl font-bold lg:text-left text-center"
  >
    Kontaktujte Nás
  </h1>

  <div class="flex lg:flex-row flex-col gap-8 lg:mt-14 mt-8 w-full">
    <div class="basis-1/2 flex flex-col gap-2 lg:items-baseline items-center">
      <div class="flex">
        <MapPin />
        <span class="font-bold ml-2">INTERIÉRY CZ</span>
      </div>
      <TextDialog data={text[19]} htmlTag="p" />

      <div class="flex">
        <Info />
        <span class="font-bold ml-2">Provozní doba</span>
      </div>
      <TextDialog data={text[20]} htmlTag="p" />

      <div class="flex">
        <Phone />
        <TextDialog data={text[21]} htmlTag="span" className="font-bold ml-2" />
      </div>

      <div class="flex">
        <Mail />
        <TextDialog data={text[22]} htmlTag="span" className="font-bold ml-2" />
      </div>

      <div class="flex">
        <Instagram />
        <TextDialog data={text[23]} htmlTag="span" className="font-bold ml-2" />
      </div>
    </div>

    <div class="basis-1/2">
      <iframe
        class="rounded-3xl w-full"
        title="mapa"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1099.3760180802428!2d17.45530305056672!3d49.071363874249876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713143b75ae3a49%3A0x1ec15ba40851cd55!2sInteri%C3%A9ry%20CZ%20s.r.o.!5e0!3m2!1scs!2scz!4v1733258884418!5m2!1scs!2scz"
        width="600"
        height="450"
        style="border:0;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>
