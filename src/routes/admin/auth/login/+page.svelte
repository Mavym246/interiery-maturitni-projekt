<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
</script>

<section class="flex flex-col items-center justify-center px-4 mt-16 md:mt-32">
  <h1 class="text-2xl font-bold mb-6">Přihlášení</h1>

  <form
    class="w-full max-w-md p-6 border-2 rounded-lg shadow-md"
    method="post"
    action="?/login"
    use:enhance
  >
    <div class="mb-4">
      <label class="block mb-2">
        Uživatelské jméno:
        <Input
          class="w-full mt-1 px-3 py-2 bg-gray-200 border rounded-md"
          name="username"
        />
      </label>
    </div>

    <div class="mb-6">
      <label class="block mb-2">
        Heslo:
        <Input
          class="w-full mt-1 px-3 py-2 bg-gray-200 border rounded-md"
          type="password"
          name="password"
        />
      </label>
    </div>

    <div class="flex justify-center mt-6">
      <Button
        type="submit"
        class="w-full px-8 py-3 border rounded-xl bg-gray-100 text-black outline-gray-400 hover:bg-gray-200 transition-colors"
        >Přihlásit</Button
      >
    </div>
  </form>

  {#if form?.message}
    <p class="mt-4 text-red-600">{form.message}</p>
  {/if}
</section>
