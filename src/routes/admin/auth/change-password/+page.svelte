<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  let { form }: { form: ActionData } = $props();
  
</script>

<br>

<section class="flex flex-col items-center justify-center mt-32">
  <h1>Změna hesla</h1>

  <form class="p-8 border-2" method="post" action="?/changePassword" use:enhance>
    <label>
      Aktuální heslo:
      <input class="bg-gray-200" type="password" name="currentPassword" required />
    </label>
    <label>
      Nové heslo:
      <input class="bg-gray-200" type="password" name="newPassword" 
        required minlength="6" maxlength="255" />
    </label>
    <label>
      Potvrďte nové heslo:
      <input class="bg-gray-200" type="password" name="confirmPassword" required />
    </label>
    <br>
    <div class="flex justify-center gap-4 mt-8">
      <button class="px-8 py-2 border rounded-xl">Změnit heslo</button>
      <a href="/admin/auth" class="px-8 py-2 border rounded-xl text-center">Zpět</a>
    </div>
  </form>
  
  {#if form?.message}
    <p style="color: {form.success ? 'green' : 'red'}" class="mt-4">{form.message}</p>
  {/if}
</section> 