<script lang="ts">
  import TextDialog from "$lib/components/TextDialog.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let text = [...data.data];
</script>

<br />
<div class="flex flex-col mx-auto px-12 max-w-[1500px] mt-32">
    <section class="flex items-center justify-center w-full gap-8">
      <div class="w-full">
        <TextDialog htmlTag="h1" className="text-6xl font-bold" data={text[14]} />
        <TextDialog htmlTag="p" className="mt-8 text-lg leading-6" data={text[15]} />
      </div>
      <div class="w-full h-[500px] rounded-3xl overflow-hidden bg-gray-300"></div>
    </section>
  
    <section class="flex items-center justify-center w-full gap-8 mt-32">
      <div class="grid grid-rows-2 grid-cols-5 gap-8 h-[500px] w-[800px]">
        <div class="w-full h-full col-span-3 bg-gray-300 rounded-3xl">1</div>
        <div class="w-full h-full col-span-2 bg-gray-300 rounded-3xl">2</div>
        <div class="w-full h-full col-span-2 bg-gray-300 rounded-3xl">3</div>
        <div class="w-full h-full col-span-3 bg-gray-300 rounded-3xl">4</div>
      </div>
  
      <div class="w-full basis-[50%]">
        <TextDialog htmlTag="h1" className="text-6xl font-bold" data={text[16]} />
        <TextDialog htmlTag="p" className="mt-8 text-lg leading-6" data={text[17]} />
      </div>
    </section>
  
    <section class="flex flex-col justify-center w-full mt-32">
      <TextDialog htmlTag="h3" className="text-5xl font-bold text-center" data={text[18]} />
      <div class="bg-gray-300 mt-8 rounded-3xl w-full h-[700px]"></div>
    </section>
  </div>
  