<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import TextAlign from "@tiptap/extension-text-align";
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import Button from "./ui/button/button.svelte";
  import Loader from "./Loader.svelte";
  import { 
    Heading2, 
    Heading3, 
    Pilcrow, 
    Bold, 
    List, 
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight
  } from 'lucide-svelte';

  let element: HTMLDivElement | null = null;
  let editor: Editor | null = $state(null);

  let { description, slug } = $props();

  let formLoading = $state(false);

  onMount(() => {
    if (element) {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
          TextAlign.configure({
            types: ["heading", "paragraph", "bulletList", "listItem"],
          }),
        ],
        content: description,
        onTransaction: () => {
          editor = editor;
        },
      });
    }
  });
  onDestroy(() => {
    editor?.destroy();
  });
</script>

{#if editor}
<div class="bg-gray-100 p-4 rounded-xl flex gap-2">
  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive('heading', { level: 2 })}
  >
    <Heading2 size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
    class:active={editor.isActive('heading', { level: 3 })}
  >
    <Heading3 size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().setParagraph().run()}
    class:active={editor.isActive('paragraph')}
  >
    <Pilcrow size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().toggleBold().run()}
    class:active={editor.isActive('bold')}
  >
    <Bold size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().toggleBulletList().run()}
    class:active={editor.isActive('bulletList')}
  >
    <List size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().toggleOrderedList().run()}
    class:active={editor.isActive('orderedList')}
  >
    <ListOrdered size={25} />
  </button>

  <div class="control-group">
    <div class="button-group">
      <button
        type="button"
        class="px-4 py-2 border border-black rounded-xl"
        onclick={() => editor?.chain().focus().setTextAlign('left').run()}
        class:active={editor.isActive({ textAlign: 'left' })}
      >
        <AlignLeft size={25} />
      </button>

      <button
        type="button"
        class="px-4 py-2 border border-black rounded-xl"
        onclick={() => editor?.chain().focus().setTextAlign('center').run()}
        class:active={editor.isActive({ textAlign: 'center' })}
      >
        <AlignCenter size={25} />
      </button>

      <button
        type="button"
        class="px-4 py-2 border border-black rounded-xl"
        onclick={() => editor?.chain().focus().setTextAlign('right').run()}
        class:active={editor.isActive({ textAlign: 'right' })}
      >
        <AlignRight size={25} />
      </button>
    </div>
  </div>
</div>
{/if}

<div
  class="mt-4 border-black border rounded-2xl p-2 focus:border-none"
  bind:this={element}
></div>
<form
  action="?/editorSave"
  method="post"
  use:enhance={({ formData }) => {
    formData.append("description", editor?.getHTML() || "");
    formData.append("slug", slug);
    formLoading = true;

    return async ({ result }) => {
      if (result.type === "success") {
        toast.success("Změny uloženy");
      } else {
        toast.error("Změny nebyly uloženy");
      }
      formLoading = false;
    };
  }}
>
  <br />

  <div class="flex">
    <Button
      disabled={formLoading}
      type="submit"
      class="px-8 mx-auto py-2 border border-black rounded-xl"
    >
      {#if formLoading}
        <Loader />
      {:else}
        Uložit
      {/if}
    </Button>
  </div>
</form>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
