<script lang="ts">
  export let data;
</script>


<a
  class="overflow-hidden shadow-lg relative w-full max-h-[400px] min-h-[300px] lg:max-h-full rounded-3xl group"
  href="realizace/{data.slug}"
>
  {#if data.images && data.images.length > 0}
    <img
      class="w-full object-center object-cover h-full max-h-[600px] group-hover:scale-105 transition-transform ease-in-out duration-500"
      src={data.images[0].url}
      alt="{data.name}"
    />
  {:else}
    <div class="w-full h-[600px] flex items-center justify-center bg-gray-200 text-gray-500">
      Obrázek nenalezen
    </div>
  {/if}
  <p
    class="absolute bg-black bg-opacity-80 p-4 backdrop-blur-xs text-white bottom-0 w-full text-center transform translate-y-full opacity-0 transition-all ease-in-out duration-500 group-hover:translate-y-0 group-hover:opacity-100"
  >
    {data.name}
  </p>
</a>

