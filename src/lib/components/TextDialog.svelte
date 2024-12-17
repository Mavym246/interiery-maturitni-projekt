<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Loader from "./Loader.svelte";

  export let data;
  export let htmlTag = "span";
  export let className = "";

  const id = data.id;
  let content = data.content;

  let dialogOpen = false;

  let loggedIn = false;
  let loading = false;
</script>

<svelte:element this={htmlTag} class={className}>
  {content}
</svelte:element>

{#if loggedIn}
  <Dialog.Root bind:open={dialogOpen}>
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

      <form
        method="post"
        action="/?/setText"
        use:enhance={({ formData }) => {
          formData.append("id", id);
          loading = true;
          return async ({ result }) => {
            if (result.type === "success") {
              dialogOpen = false;
              loading = false;
              content = formData.get("content") as string;
            }
          };
        }}
      >
        <Label for="name" class="my-2">Text</Label>
        <Input type="text" name="content" value={content} />
        <Button class="min-w-[110px]" type="submit">

          {#if loading}
            <Loader />
          {:else}
          Uložit Změny
          {/if}
        </Button>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}
