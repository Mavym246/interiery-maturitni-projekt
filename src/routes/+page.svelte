<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let text = [...data.data];
</script>

<div
  class="h-screen bg-cover flex justify-start items-end"
  style="background-image: url(./uvodni-obrazek.jpg);"
>
  <div class="mb-12 ml-32 max-w-[400px] rounded-3xl bg-black bg-opacity-85 p-8">
    <p class="text-white text-xl">
      {text[0].content}
    </p>

    <button class="py-2 px-8 mt-4 text-white border rounded-lg"
      >Reference &rAarr;</button
    >
  </div>
</div>

<div class="flex mx-auto max-w-[1400px] h-screen mt-24">
  <section class="w-full">
    <h1 class="text-6xl font-bold">{text[1].content}</h1>
    <br>
    <div class="grid grid-cols-[3fr_1fr] grid-rows-3  gap-12 h-[550px]">
        <img src="./foto-1.jpg" class="bg-gray-300 h-full w-full row-span-3 rounded-3xl overflow-hidden bg-cover" alt="f" >
        <div class="bg-gray-300 h-full w-full row-span-1 rounded-3xl overflow-hidden">2</div>
        <div class="bg-gray-300 h-full w-full row-span-2 rounded-3xl overflow-hidden">3</div>
    </div>
  </section>
</div>

