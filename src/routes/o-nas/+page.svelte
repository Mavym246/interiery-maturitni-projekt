<script lang="ts">
  import TextDialog from "$lib/components/TextDialog.svelte";
  import type { TextData } from "$lib/types";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let text: TextData[] = data.textData;
</script>

<svelte:head>
  <title>O nás | Interiéry CZ</title>
</svelte:head>

<br />
<div class="flex flex-col mx-auto lg:px-12 px-4 max-w-[1500px] lg:mt-32">
    <section class="flex flex-col items-center justify-center w-full gap-8 lg:flex-row">
      <div class="order-2 w-full lg:order-1">
        <TextDialog htmlTag="h1" className="lg:text-6xl text-center lg:text-left text-3xl font-bold" data={text[14]} />
        <TextDialog htmlTag="p" className="lg:mt-8 mt-4 lg:text-lg leading-6" data={text[15]} />
      </div>
      <div class="w-full lg:h-[500px] h-[40vh] lg:order-2 order-1 rounded-3xl overflow-hidden bg-gray-300"></div>
    </section>
  
    <section class="flex flex-col items-center justify-center w-full gap-8 mt-24 lg:mt-32 lg:flex-row">
      <div class="grid grid-rows-2 h-[35vh] w-full grid-cols-5 gap-4 lg:gap-8 min-h-[300px] max-w- lg:h-[500px] lg:w-[800px]">
        <div class="w-full h-full col-span-3 bg-gray-300 rounded-3xl">1</div>
        <div class="w-full h-full col-span-2 bg-gray-300 rounded-3xl">2</div>
        <div class="w-full h-full col-span-2 bg-gray-300 rounded-3xl">3</div>
        <div class="w-full h-full col-span-3 bg-gray-300 rounded-3xl">4</div>
      </div>
  
      <div class="w-full basis-[50%]">
        <TextDialog htmlTag="h2" className="lg:text-6xl text-center lg:text-left text-3xl font-bold" data={text[16]} />
        <TextDialog htmlTag="p" className="lg:mt-8 mt-4 lg:text-lg leading-6" data={text[17]} />
      </div>
    </section>
  
    <section class="flex flex-col justify-center w-full mt-32">
      <TextDialog htmlTag="h3" className="lg:text-6xl text-center text-3xl font-bold" data={text[18]} />
      <div class="bg-gray-300 mt-8 rounded-3xl w-full min-h-[300px] lg:h-[700px]"></div>
    </section>
  </div>
