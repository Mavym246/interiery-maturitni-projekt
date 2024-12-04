<script lang="ts">
  import { enhance } from "$app/forms";
  import { isLogged } from "$lib/authStore";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  export let data;
  export let htmlTag = "span";
  export let className = "";

  const id = data.id;
  const content = data.content;

</script>

<svelte:element this={htmlTag} class={className}>
  {content}
</svelte:element>

{#if !$isLogged}
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " max-w-24"}
      >Upravit</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Upravit Text</Dialog.Title>
        <Dialog.Description>
          Upravte text a klikněte na Uložit Změny.
        </Dialog.Description>
      </Dialog.Header>

      <form method="post" action="/?/setText" use:enhance>
        <Label for="name" class="my-2">Text</Label>
        <Input type="hidden" name="id" value={id} />
        <Input type="text" name="content" value={content} />

        <Button type="submit">Uložit Změny</Button>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}
