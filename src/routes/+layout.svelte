<script lang="ts">
  import { page } from "$app/stores";
  import { Toaster } from "$lib/components/ui/sonner";
  import "../app.css";

  const links = [
    { name: "Úvod", path: "/" },
    { name: "O Nás", path: "/o-nas" },
    { name: "Realizace", path: "/realizace" },
    { name: "Kontakt", path: "/kontakt" },
  ];

  const link_hover =
    "relative text-black cursor-pointer transition-all ease-in-out " +
    "before:transition-[width] before:ease-in-out before:duration-700 before:absolute " +
    "before:bg-gray-600 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] " +
    "before:bottom-[-1px] before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 " +
    "after:absolute after:bg-gray-600 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] " +
    "after:bottom-[-1px] after:right-[50%]";

  let isMenuOpen = false;
</script>


<nav class="py-10 md:absolute relative md:bg-transparent bg-white max-w-[1500px] top-0 left-1/2 -translate-x-1/2 w-full z-50 flex justify-between items-center md:px-12">
  <!-- Hamburger Menu Icon -->
  <button
    class="z-50 block md:hidden"
    on:click={() => (isMenuOpen = !isMenuOpen)}
    aria-label="Toggle navigation"
  >
    <div class="w-8 h-1 mb-1 bg-black"></div>
    <div class="w-8 h-1 mb-1 bg-black"></div>
    <div class="w-8 h-1 bg-black"></div>
  </button>

  <!-- Logo -->
  <a href="/" class="flex justify-center mx-auto md:mx-0">
    <img src="/logo_interierycz.png" alt="Logo firmy" class="max-w-[250px]" />
  </a>

  <!-- Navigační odkazy (pro větší obrazovky) -->
  <ul class="hidden gap-8 text-[1.35rem] font-semibold md:flex">
    {#each links as { name, path }}
      <li>
        <a
          class="{link_hover} { $page.url.pathname === path ? 'before:w-[50%] after:w-[50%]' : '' }"
          href={path}
        >
          {name}
        </a>
      </li>
    {/each}
  </ul>

  <!-- Mobilní menu -->
  {#if isMenuOpen}
    <div
      class="fixed inset-0 flex flex-col items-center justify-center gap-12 mt-8 text-2xl font-semibold bg-white"
      style="z-index: 49"
    >
      {#each links as { name, path }}
        <a
          href={path}
          class="{link_hover} { $page.url.pathname === path ? 'before:w-[50%] after:w-[50%]' : '' }"
          on:click={() => (isMenuOpen = false)}
        >
          {name}
        </a>
      {/each}
    </div>
  {/if}
</nav>
<Toaster />
<main class="min-h-[80vh]">
  <slot />
</main>

<footer class="flex justify-center p-12 mt-24 text-white bg-gray-700">
  <a href="/admin/auth/">Administrace</a>
</footer>
