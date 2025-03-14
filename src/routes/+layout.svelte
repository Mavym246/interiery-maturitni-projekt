<script lang="ts">
  import { page } from "$app/stores";
  import { Toaster } from "$lib/components/ui/sonner";
  import { onMount } from "svelte";
  import "@fontsource-variable/sofia-sans";
  import "../app.css";
  import { animate } from "motion/mini";

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

  onMount(() => {
    animate("nav", { opacity: [0, 1] }, { duration: 1 });
  });
</script>

<Toaster />
<main class="min-h-screen flex flex-col justify-between">
  <nav
    class="py-6 lg:py-8 lg:absolute relative xl:bg-transparent bg-white max-w-[1500px] top-0 left-1/2 -translate-x-1/2 w-full z-50 flex justify-between items-center md:px-12"
  >
    <a href="/" class="flex justify-center mx-auto lg:mx-0">
      <img
        src="/logo_interierycz.png"
        alt="Logo firmy"
        class="max-w-[250px] lg:p-0 pl-4 w-full"
      />
    </a>

    <!-- Hamburger Menu Icon -->
    <button
      type="button"
      class="inline-flex lg:hidden items-center justify-center rounded-md p-2.5 text-gray-700"
      on:click={() => (isMenuOpen = !isMenuOpen)}
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="size-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>

    <!-- Navigační odkazy (pro větší obrazovky) -->
    <ul class="hidden gap-8 text-[1.35rem] font-semibold lg:flex">
      {#each links as { name, path }}
        <li>
          <a
            class="{link_hover} {$page.url.pathname === path
              ? 'before:w-[50%] after:w-[50%]'
              : ''}"
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
        class="fixed flex flex-col items-center justify-center w-screen gap-12 pb-6 text-2xl font-semibold bg-white mt-96 z-49"
      >
        {#each links as { name, path }}
          <a
            href={path}
            class=" bg-white w-full text-center {$page.url.pathname === path
              ? 'underline bg-gray-700'
              : ''}"
            on:click={() => (isMenuOpen = false)}
          >
            {name}
          </a>
        {/each}
      </div>
    {/if}
  </nav>
  <slot />

  <footer class="flex justify-center h-24 mt-24 text-white bg-gray-900">
    <a href="/admin/auth/" class="self-center">Administrace</a>
  </footer>
</main>

<style>
  * {
    font-family: "Sofia Sans Variable", sans-serif;
  }
</style>
