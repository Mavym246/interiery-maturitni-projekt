<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<br>

<section class="flex flex-col items-center justify-center mt-32">
	<h1>Login/Register</h1>

	<form class="p-8 border-2 " method="post" action="?/login" use:enhance>
		<label>
			Username:
			<input class="bg-gray-200" name="username" />
		</label>
		<label>
			Password:
			<input class="bg-gray-200" type="password" name="password" />
		</label>
		<br>
		<div class="flex justify-center gap-4 mt-8">
			<button class="px-8 py-2 border rounded-xl">Login</button>
			<!-- <button class="px-8 py-2 border rounded-xl" formaction="?/register">Register</button> -->
		</div>

	</form>
	<p style="color: red">{form?.message ?? ''}</p>
	
</section>
