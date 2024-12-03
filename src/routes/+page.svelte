<script lang="ts">
    import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let text = [...data.data];
</script>

<div
  class="flex items-end justify-start h-screen bg-cover"
  style="background-image: url(./uvodni-obrazek.jpg);"
>
  <div class="mb-12 ml-32 max-w-[400px] rounded-3xl bg-black bg-opacity-85 p-8">
    <p class="text-xl text-white">
      {text[0].content}
    </p>

    <button class="px-8 py-2 mt-4 text-white border rounded-lg"
      >Reference &rAarr;</button
    >
  </div>
</div>

<div class="flex flex-col mx-auto px-12 max-w-[1400px] mt-24">
  <section class="w-full">
    <h1 class="text-6xl font-bold">{text[1].content}</h1>
    <br>
    <div class="grid grid-cols-[3fr_1fr] grid-rows-3  gap-8 h-[550px]">
        <img src="./foto-1.jpg" class="w-full h-full row-span-3 overflow-hidden bg-gray-300 bg-cover rounded-3xl" alt="f" >
        <div class="w-full h-full row-span-1 overflow-hidden bg-gray-300 rounded-3xl">
          <div class="flex flex-col justify-between w-full h-full m-4">
            <div>
              <span class="px-4 py-1 text-sm font-bold border-2 border-black rounded-xl">{text[2].content}</span>
            </div>
            <p class="text-lg leading-5">{text[3].content}</p>
            <span class="text-2xl font-bold">{text[4].content}</span>
          </div>
        </div>

        <img src="./uvod-zrcadlo.jpg"  alt="f" class="w-full h-full row-span-2 overflow-hidden bg-gray-300 bg-cover rounded-3xl">
    </div>

    <div class="flex justify-center gap-32 mt-12">
      <div>
        <span class="text-5xl font-bold">{text[5].content}</span>
        <p class="text-lg">{text[6].content}</p>
      </div>
      <div>
        <span class="text-5xl font-bold">{text[7].content}</span>
        <p class="text-lg ">{text[8].content}</p>
      </div>
      <div>
        <span class="text-5xl font-bold">{text[9].content}</span>
        <p class="text-lg ">{text[10].content}</p>
      </div>
    </div>
  </section>

<section class="w-full mt-24">

  <div class="flex items-center justify-center w-full gap-8">
    <img class="w-full aspect-4/3 rounded-3xl" src="./uvod-kuchyn.jpeg" alt="obrazek">

    <div class="basis-[70%]">
      <h2 class="text-4xl font-bold">{text[11].content}</h2>
      <p class="mt-4 text-lg">{text[12].content}</p>

      <button class="px-8 py-2 mt-4 border border-black rounded-lg">
        O Nás
      </button>
    </div>
  </div>

</section>

<section class="w-full mt-24">
  <h3 class="text-5xl font-bold">{text[13].content}</h3>
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

