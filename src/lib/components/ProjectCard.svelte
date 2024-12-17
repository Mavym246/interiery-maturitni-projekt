<script lang="ts">
  export let data;
</script>

<a class="overflow-hidden shadow-lg rounded-3xl" href="realizace/{data.slug}">
    <img
      class="w-full object-center object-cover h-full max-h-[600px] hover:scale-105 transition-all ease-in-out duration-500"
      src={data.images[0].url}
      alt="{data.name}"
    />
</a>
