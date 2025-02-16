<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { toast } from "svelte-sonner";
  import Loader from "./Loader.svelte";
  import { page } from "$app/state";
  import type { TextData } from "$lib/types";
  import { animate, inView } from "motion";
  import { onMount } from "svelte";

  $: loggedIn = page.data.loggedIn;
  export let data: TextData;
  export let htmlTag = "span";
  export let className = "";

  const id = data.id;
  let content = data.content;

  let dialogOpen = false;
  let loading = false;

  onMount(() => {
    inView("#text-dialog", (info) => {
      animate(
        info.target,
        { opacity: [0.5, 1], y: [20, 0] },
        { duration: 0.5, delay: 0.2, ease: "easeInOut" }
      );
    });
  });

  function handleTextClick() {
    if (loggedIn) {
      dialogOpen = true;
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<svelte:element
  this={htmlTag}
  id="text-dialog"
  class={className +
    " " +
    (loggedIn
      ? "cursor-pointer underline underline-offset-4 hover:opacity-80 relative group"
      : "")}
  onclick={handleTextClick}
  role="dialog"
>
  {content}
</svelte:element>

{#if loggedIn}
  <Dialog.Root bind:open={dialogOpen}>
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
          formData.append("id", id.toString());
          loading = true;
          return async ({ result }) => {
            if (result.type === "success") {
              dialogOpen = false;
              loading = false;
              content = formData.get("content") as string;
              toast.success("Text byl úspěšně uložen");
            } else {
              loading = false;
              toast.error("Text se nepodařilo uložit");
            }
          };
        }}
      >
        <Label for="name" class="my-2">Text</Label>
        <Input type="text" name="content" value={content} />
        <Button disabled={loading} class="min-w-[110px]" type="submit">
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
