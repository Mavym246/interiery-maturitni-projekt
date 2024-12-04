<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>
<br>


<section class="flex flex-col items-center gap-4 mt-32">
	<h1>Čau:  {data.user.username}</h1>
	<p>user ID: {data.user.id}.</p>
	<form method="post" action="?/logout" use:enhance>
		<button class="px-8 py-2 border border-black rounded-xl">Odhlásit</button>
	</form>
	
</section>
