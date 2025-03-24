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

  // Define TypeScript interface for active states
  interface ActiveStates {
    heading2: boolean;
    heading3: boolean;
    paragraph: boolean;
    bold: boolean;
    bulletList: boolean;
    orderedList: boolean;
    alignLeft: boolean;
    alignCenter: boolean;
    alignRight: boolean;
  }

  let element: HTMLDivElement | null = null;
  let editor: Editor | null = $state(null);
  let isActive = $state<ActiveStates>({
    heading2: false,
    heading3: false,
    paragraph: false,
    bold: false,
    bulletList: false,
    orderedList: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false
  });

  let { description, slug } = $props();

  let formLoading = $state(false);

  // Function to update active states
  function updateActiveStates() {
    if (!editor) return;
    
    isActive = {
      heading2: editor.isActive('heading', { level: 2 }),
      heading3: editor.isActive('heading', { level: 3 }),
      paragraph: editor.isActive('paragraph'),
      bold: editor.isActive('bold'),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      alignLeft: editor.isActive({ textAlign: 'left' }),
      alignCenter: editor.isActive({ textAlign: 'center' }),
      alignRight: editor.isActive({ textAlign: 'right' })
    };
  }

  onMount(() => {
    if (element) {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
          TextAlign.configure({
            types: ["heading", "paragraph", "bulletList", "orderedList", "listItem"],
          }),
        ],
        content: description,
        onTransaction: () => {
          // Force reactivity update
          updateActiveStates();
        },
        onSelectionUpdate: () => {
          updateActiveStates();
        },
        onUpdate: () => {
          updateActiveStates();
        }
      });
      
      // Initial active states
      updateActiveStates();
    }
  });
  
  onDestroy(() => {
    editor?.destroy();
  });

  // Formatting functions
  const toggleHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleHeading3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run();
  const setParagraph = () => editor?.chain().focus().setParagraph().run();
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const setAlignLeft = () => editor?.chain().focus().setTextAlign('left').run();
  const setAlignCenter = () => editor?.chain().focus().setTextAlign('center').run();
  const setAlignRight = () => editor?.chain().focus().setTextAlign('right').run();
</script>

{#if editor}
<div class="bg-gray-100 p-4 rounded-xl flex gap-2 flex-wrap">
  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={toggleHeading2}
    class:active={isActive.heading2}
  >
    <Heading2 size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={toggleHeading3}
    class:active={isActive.heading3}
  >
    <Heading3 size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={setParagraph}
    class:active={isActive.paragraph}
  >
    <Pilcrow size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={toggleBold}
    class:active={isActive.bold}
  >
    <Bold size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={toggleBulletList}
    class:active={isActive.bulletList}
  >
    <List size={25} />
  </button>

  <button
    type="button"
    class="px-4 py-2 border border-black rounded-xl"
    onclick={toggleOrderedList}
    class:active={isActive.orderedList}
  >
    <ListOrdered size={25} />
  </button>

  <div class="control-group">
    <div class="button-group flex gap-2">
      <button
        type="button"
        class="px-4 py-2 border border-black rounded-xl"
        onclick={setAlignLeft}
        class:active={isActive.alignLeft}
      >
        <AlignLeft size={25} />
      </button>

      <button
        type="button"
        class="px-4 py-2 border border-black rounded-xl"
        onclick={setAlignCenter}
        class:active={isActive.alignCenter}
      >
        <AlignCenter size={25} />
      </button>

      <button
        type="button"
        class="px-4 py-2 border border-black rounded-xl"
        onclick={setAlignRight}
        class:active={isActive.alignRight}
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
