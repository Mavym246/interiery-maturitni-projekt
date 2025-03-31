<script lang="ts">
  import TextDialog from "$lib/components/TextDialog.svelte";
  import type { TextData } from "$lib/types";
  import type { PageData } from "./$types";
  import PageContainer from "$lib/components/PageContainer.svelte";

  let { data }: { data: PageData } = $props();

  let text: TextData[] = data.textData;
</script>

<svelte:head>
  <title>O nás | Interiéry CZ</title>
  <meta name="description" content="O firmě Interiéry Cz" />
</svelte:head>

<PageContainer>
  <section
    class="flex flex-col gap-8 justify-center items-center w-full lg:flex-row"
  >
    <div class="order-2 w-full lg:order-1">
      <TextDialog
        htmlTag="h1"
        className="lg:text-6xl text-center lg:text-left text-3xl font-extrabold"
        data={text[14]}
      />
      <TextDialog
        htmlTag="p"
        className="lg:mt-8 mt-4 lg:text-lg leading-6"
        data={text[15]}
      />
    </div>
    <img
      src="o_nas/o-nas.webp"
      alt="Foto o nás"
      class="w-full sm:min-h-[400px] lg:h-[500px] h-[40vh] lg:order-2 order-1 rounded-3xl overflow-hidden max-h-[600px] bg-gray-300"
    />
  </section>

  <section
    class="flex flex-col gap-8 justify-center items-center mt-32 w-full lg:mt-44 lg:flex-row"
  >
    <div
      class="grid grid-rows-2 h-[40vh] sm:min-h-[400px] max-h-[600px] w-full grid-cols-5 gap-4 lg:gap-8 min-h-[300px] lg:h-[500px] lg:w-[800px]"
    >
      <img
        src="o_nas/material-bily-mramor.webp"
        alt="Materiál bílý mramor"
        class="col-span-3 w-full h-full rounded-3xl object-cover"
      />
      <img
        src="o_nas/material-cerny.webp"
        alt="Material cerny"
        class="col-span-2 w-full h-full rounded-3xl"
      />
      <img
        src="o_nas/material-drevo.webp"
        alt="Materiál dřevo"
        class="col-span-2 w-full h-full rounded-3xl object-cover"
      />
      <img
        src="o_nas/material-mramor-cerny.webp"
        alt="Materiál mramor černý"
        class="col-span-3 w-full h-full rounded-3xl object-cover"
      />
    </div>

    <div class="w-full basis-[50%]">
      <TextDialog
        htmlTag="h2"
        className="lg:text-6xl text-center lg:text-left text-3xl font-extrabold"
        data={text[16]}
      />
      <TextDialog
        htmlTag="p"
        className="lg:mt-8 mt-4 lg:text-lg leading-6"
        data={text[17]}
      />
    </div>
  </section>

  <section class="flex flex-col justify-center mt-44 w-full">
    <TextDialog
      htmlTag="h3"
      className="lg:text-6xl text-center text-3xl font-extrabold"
      data={text[18]}
    />
    <img
      class="object-cover mt-8 rounded-3xl w-full min-h-[300px] lg:h-[700px]"
      src="o_nas/vyroba.webp"
      alt="Výroba"
    />
  </section>
</PageContainer>
