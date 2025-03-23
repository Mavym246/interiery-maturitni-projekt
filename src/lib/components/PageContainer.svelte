<script lang="ts">
  import { cn } from "$lib/utils.js";
  let { class: className = "", children } = $props();
</script>

<div class={cn("flex flex-col mx-auto px-4 md:px-8 lg:px-12 max-w-[1500px] w-full h-full mt-24 lg:mt-32 mb-4", className)}>
  {@render children()}
</div>
