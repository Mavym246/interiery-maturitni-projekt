<script lang="ts">
  import { page } from "$app/stores";
  import "../app.css";
  let { children } = $props();

  let path = $state($page.url.pathname);
  console.log(path);
</script>

<nav
  class="py-8 absolute flex justify-between items-center w-full max-w-[1400px] left-1/2 transform -translate-x-1/2"
>
  <a href="/" class="max-w-[300px]"
    ><img src="/logo_interierycz.png" alt="Logo firmy" /></a
  >
  <ul class="flex gap-8 text-xl font-semibold">
    <li><a class:active={path === "/" } href="/">Úvod</a></li>
    <li><a class:active={path === "/o-nas" } href="/o-nas">O Nás</a></li>
    <li><a class:active={path === "/realizace" } href="/realizace">Realizace</a></li>
    <li><a class:active={path === "/kontakt" } href="/kontakt">Kontakt</a></li>
  </ul>
</nav>
<main class="min-h-[80vh]">
  {@render children()}
</main>

<footer class="flex justify-center p-12 mt-24 bg-gray-700">
  <a href="/admin/auth/">Administrace</a>
</footer>

<style>
  .active {
    color: red;
  }
</style>