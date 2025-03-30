<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();
</script>

<br />

<section class="flex flex-col items-center gap-4 mt-32">
  <h1 class="text-6xl font-bold">Administrace</h1>
  <span class="text-2xl mt-8">Přihlášen jako: <b>{data.user.username}</b></span>
  <form method="post" action="?/logout" use:enhance>
    <Button type="submit" variant="outline" class="px-8 py-2 border bg-white text-black rounded-xl">Odhlásit</Button>
  </form>

  <div class="flex justify-center flex-wrap gap-12 mt-8">
    <div class="flex flex-col border border-black p-4 rounded-2xl">
      <span class="text-2xl font-bold">Upravit texty</span>
      <ul class="list-disc p-4 text-gray-800">
        <li><a class="hover:underline" href="/">Na stránce Úvod</a></li>
        <li><a class="hover:underline" href="/o-nas">Na stránce O Nás</a></li>
      </ul>
    </div>
    <div class="flex flex-col border border-black p-4 rounded-2xl">
      <span class="text-2xl font-bold">Přidat/upravit Projekty</span>

      <ul class="list-disc p-4 text-gray-800">
		<li><a class="hover:underline" href="/realizace">Realizace</a></li>
      </ul>
    </div>
    <div class="flex flex-col border border-black p-4 rounded-2xl">
      <span class="text-2xl font-bold">Změnit kontaktní údaje</span>

      <ul class="list-disc p-4 text-gray-800">
        <li><a class="hover:underline" href="/kontakt">Kontakt</a></li>
      </ul>
    </div>
  </div>
  <p class="text-gray-400">změnit heslo můžete <a href="/admin/auth/change-password" class="hover:underline text-blue-500">zde</a></p>

</section>
