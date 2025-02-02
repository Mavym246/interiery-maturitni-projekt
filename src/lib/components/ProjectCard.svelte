<script lang="ts">
  import { animate, inView } from "motion";
  import { onMount } from "svelte";
  export let data;
  export let index;
  
  onMount(() => {
    inView(`#project-card-${index}`, info => { 
      animate(
        info.target, 
        { opacity: [0, 1], y: [50, 0]}, 
        { 
          duration: 0.75,
          delay: 0.2 + ((index % 2) * 0.15),
          ease: "easeInOut" 
        },
      ) 
    });
  })
</script>

<a
  id="project-card-{index}"
  class="overflow-hidden shadow-lg relative w-full min-h-[300px] lg:max-h-full rounded-3xl group"
  href="realizace/{data.slug}"
>
  {#if data.images && data.images.length > 0}
    <img
      class="w-full object-center object-cover h-[600px] group-hover:scale-105 transition-transform ease-in-out duration-500"
      src={data.images[0].url}
      alt="Projekt: {data.name}"
    />
  {:else}
    <div class="w-full h-[600px] flex items-center justify-center bg-gray-200 text-gray-500">
      Obrázek nenalezen
    </div>
  {/if}
  <p
    class="absolute bg-black bg-opacity-80 p-4 rounded-b-3xl backdrop-blur-xs text-white bottom-0 w-full text-center transform translate-y-full opacity-0 transition-all ease-in-out duration-500 group-hover:translate-y-0 group-hover:opacity-100"
  >
    {data.name}
  </p>
</a>

