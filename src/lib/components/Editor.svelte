<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align'
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';

  let element: HTMLDivElement | null = null;
  let editor: Editor | null = null;

  export let description;
  export let slug;

  onMount(() => {
    if (element) {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
          TextAlign.configure({
              types: ['heading', 'paragraph', 'bulletList', "listItem"]
            }),
 ],
        content: description,
        onTransaction() {
          editor = editor;
        }
      });
    }
  });
  onDestroy(() => {
    editor?.destroy();
  });
</script>


{#if editor}
<div class="bg-gray-100 p-4 rounded-xl flex gap-4">
	<button
    class="px-4 py-2 border border-black rounded-xl"
		onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>

  <button
  class="px-4 py-2 border border-black rounded-xl"
  onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
  class:active={editor.isActive('heading', { level: 3 })}
  >
    H3
  </button>


	<button
    class="px-4 py-2 border border-black rounded-xl"
		onclick={() => editor?.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>

  <button
    class="px-4 py-2 border border-black rounded-xl"
		onclick={() => editor?.chain().focus().toggleBold().run()}
    class:active={editor.isActive('bold')}
  >
  b</button>

  <button
    class="px-4 py-2 border border-black rounded-xl"
    onclick={() => editor?.chain().focus().toggleBulletList().run()}
    class:active={editor.isActive('bulletList')}
  >
  Toggle bullet list
  </button>

  <button
  class="px-4 py-2 border border-black rounded-xl"
  onclick={() => editor?.chain().focus().toggleOrderedList().run()}
  class:active={editor.isActive('orderedList') ? 'is-active' : ''}
  >
  Toggle ordered list
  </button>
  <div class="control-group">
    <div class="button-group">
      <button
        class="px-4 py-2 border border-black rounded-xl"
        onclick={() => editor?.chain().focus().setTextAlign('left').run()}
        class:active={editor.isActive({ textAlign: 'left' })}
      >
        Left
      </button>
  
      <button
        class="px-4 py-2 border border-black rounded-xl"
        onclick={() => editor?.chain().focus().setTextAlign('center').run()}
        class:active={editor.isActive({ textAlign: 'center' })}
      >
        Center
      </button>
  
      <button
        class="px-4 py-2 border border-black rounded-xl"
        onclick={() => editor?.chain().focus().setTextAlign('right').run()}
        class:active={editor.isActive({ textAlign: 'right' })}
      >
        Right
      </button>
    </div>
  </div>
</div>
{/if}

<div class="mt-4 border-black border rounded-2xl p-2 focus:border-none" bind:this={element}></div>
<form action="?/editorSave" method="post" use:enhance={({ formData }) => {
  formData.append("description", editor?.getHTML() || '');
  formData.append("slug", slug);

  return async ({ result }) => {
    if (result.type === "success") {
      toast.success("Změny uloženy");
    } else {
      toast.error("Změny nebyly uloženy");
    }

  };
}}>
  <button class="px-8 py-2 mt-12 border border-black rounded-xl">Save</button>
</form>



<style>
  button.active {
    background: black;
    color: white;
  }
</style>