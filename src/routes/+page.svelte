<script lang="ts">
  import TextDialog from '$lib/components/TextDialog.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let text = [...data.data];
</script>

<div
  class="flex items-end justify-start h-screen bg-cover"
  style="background-image: url(./uvodni-obrazek.jpg);"
>
  <div class="mb-12 ml-32 max-w-[400px] rounded-3xl bg-black bg-opacity-85 p-8">
    <TextDialog htmlTag="p" className="text-xl text-white" data={text[0]} />
    <button class="px-8 py-2 mt-4 text-white border rounded-lg">
      Reference &rAarr;
    </button>
  </div>
</div>

<div class="flex flex-col mx-auto px-12 max-w-[1400px] mt-24">
  <section class="w-full">
    <TextDialog htmlTag="h1" className="text-6xl font-bold" data={text[1]} />
    <br />
    <div class="grid grid-cols-[3fr_1fr] grid-rows-3 gap-8 h-[550px]">
      <img
        src="./foto-1.jpg"
        class="w-full h-full row-span-3 overflow-hidden bg-gray-300 bg-cover rounded-3xl"
        alt="f"
      />
      <div class="w-full h-full row-span-1 overflow-hidden bg-gray-300 rounded-3xl">
        <div class="flex flex-col justify-between w-full h-full p-4">
          <div>
            <TextDialog
              htmlTag="span"
              className="px-4 py-1 text-sm font-bold border-2 border-black rounded-xl"
              data={text[2]}
            />
          </div>
          <TextDialog
            htmlTag="p"
            className="text-lg leading-5"
            data={text[3]}
          />
          <TextDialog
            htmlTag="span"
            className="text-2xl font-bold"
            data={text[4]}
          />
        </div>
      </div>

      <img
        src="./uvod-zrcadlo.jpg"
        alt="f"
        class="w-full h-full row-span-2 overflow-hidden bg-gray-300 bg-cover rounded-3xl"
      />
    </div>

    <div class="flex justify-center gap-32 mt-12">
      <div>
        <TextDialog htmlTag="span" className="text-5xl font-bold" data={text[5]} />
        <TextDialog htmlTag="p" className="text-lg" data={text[6]} />
      </div>
      <div>
        <TextDialog htmlTag="span" className="text-5xl font-bold" data={text[7]} />
        <TextDialog htmlTag="p" className="text-lg" data={text[8]} />
      </div>
      <div>
        <TextDialog htmlTag="span" className="text-5xl font-bold" data={text[9]} />
        <TextDialog htmlTag="p" className="text-lg" data={text[10]} />
      </div>
    </div>
  </section>

  <section class="w-full my-44">
    <div class="flex items-center justify-center w-full gap-8">
      <img
        class="w-full aspect-4/3 rounded-3xl"
        src="./uvod-kuchyn.jpeg"
        alt="obrazek"
      />
      <div class="basis-[70%]">
        <TextDialog htmlTag="h2" className="text-4xl font-bold" data={text[11]} />
        <TextDialog htmlTag="p" className="mt-4 text-lg" data={text[12]} />
        <button class="px-8 py-2 mt-4 text-white bg-black border rounded-lg color-white">O Nás &rAarr;</button>
      </div>
    </div>
  </section>

  <section class="w-full">
    <TextDialog htmlTag="h3" className="text-5xl font-bold" data={text[13]} />
    <div class="grid mt-8 grid-flow-column grid-cols-3 grid-rows-5 gap-8 h-[900px] max-h-screen">
      <div class="w-full row-span-2 overflow-hidden bg-gray-300 rounded-3xl">1</div>
      <div class="w-full row-span-3 overflow-hidden bg-gray-300 rounded-3xl">2</div>
      <div class="w-full row-span-2 overflow-hidden bg-gray-300 rounded-3xl">3</div>
      <div class="w-full row-span-3 overflow-hidden bg-gray-300 rounded-3xl">4</div>
      <div class="w-full row-span-3 overflow-hidden bg-gray-300 rounded-3xl">5</div>
      <div class="w-full row-span-2 overflow-hidden bg-gray-300 rounded-3xl">6</div>
    </div>
  </section>
</div>
