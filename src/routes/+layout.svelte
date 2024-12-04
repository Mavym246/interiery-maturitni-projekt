<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<nav
  class="py-8 absolute flex justify-between items-center w-full max-w-[1400px] left-1/2 transform -translate-x-1/2"
>
  <a href="/" class="max-w-[300px]"
    ><img src="/logo_interierycz.png" alt="Logo firmy" /></a
  >
  <ul class="flex gap-8 text-xl font-semibold">
    <li><a href="/">Úvod</a></li>
    <li><a href="/o-nas">O Nás</a></li>
    <li><a href="/realizace">Realizace</a></li>
    <li><a href="/kontakt">Kontakt</a></li>
  </ul>
</nav>

<main class="min-h-[80vh]">
  {@render children()}
</main>

<footer class="flex justify-center p-12 mt-24 bg-gray-700">
  <a href="/admin/auth/">Administrace</a>
</footer>
