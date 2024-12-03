<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let text = [...data.data];

</script>


<br>
<div class="flex flex-col mx-auto px-12 max-w-[1400px] mt-32">

<section class="flex items-center justify-center w-full gap-8">
    <div class="w-full">
        <h1 class="text-6xl font-bold">{text[14].content}</h1>
        <p class="mt-8 text-lg leading-6">{text[15].content}</p>
    </div>
    <div class="w-full h-[500px] rounded-3xl overflow-hidden bg-gray-300">
s
    </div>
</section>

<section class="flex items-center justify-center w-full gap-8 mt-32">

    <div class="grid grid-rows-2 grid-cols-5 gap-8 h-[500px] w-[800px]">
        <div class="w-full h-full col-span-3 bg-gray-300 rounded-3xl">
            1
        </div>
        <div class="w-full h-full col-span-2 bg-gray-300 rounded-3xl">
            2
        </div>
        <div class="w-full h-full col-span-2 bg-gray-300 rounded-3xl">
            3
        </div>
        <div class="w-full h-full col-span-3 bg-gray-300 rounded-3xl">
            4
        </div>
    </div>


    <div class="w-full basis-[50%]">
        <h1 class="text-6xl font-bold">{text[16].content}</h1>
        <p class="mt-8 text-lg leading-6">{text[17].content}</p>
    </div>
</section>

<section class="flex flex-col justify-center w-full mt-32">
    <h3 class="text-5xl font-bold text-center">{text[18].content}</h3>

    <div class="bg-gray-300 mt-8 rounded-3xl w-full h-[700px]">

    </div>
</section>


</div>