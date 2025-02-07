<template>
  <div class="editor-container" v-if="editor">
    <!-- Floating Toolbar using BubbleMenu -->
    <BubbleMenu :editor="editor" class="bubble-menu">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ active: editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ active: editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ active: editor.isActive('codeBlock') }"
      >
        Code Block
      </button>
    </BubbleMenu>

    <!-- The editable area -->
    <EditorContent :editor="editor" class="editor-content"/>
  </div>
</template>

<script setup>
import {onBeforeUnmount} from 'vue'
import {useEditor, EditorContent, BubbleMenu} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content   : "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit.configure({
    heading  : {
      levels: [1, 2, 3],
    },
    paragraph: true
  })],
});


// Clean up the editor instance when the component is unmounted
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style>
.editor-container {
  position:      relative;
  border:        1px solid #ccc;
  padding:       16px;
  border-radius: 4px;
  min-height:    200px;
  outline:       none; /* Remove focus outline if desired */
}

/* Style for the floating BubbleMenu */
.bubble-menu {
  background:    #fff;
  border:        1px solid #ddd;
  padding:       8px;
  border-radius: 4px;
  box-shadow:    0 2px 5px rgba(0, 0, 0, 0.1);
  /* You may need to adjust the positioning based on your layout */
}

/* Button styling within the toolbar */
.bubble-menu button {
  margin-right: 4px;
  background:   none;
  border:       none;
  cursor:       pointer;
}

/* Active state for formatting buttons */
.bubble-menu button.active {
  font-weight: bold;
}

/* Style for the editor content area */
.editor-content {
  min-height: 200px;
  outline:    none !important; /* Remove focus outline if desired */
}

.editor-content .ProseMirror:focus,
.editor-content .ProseMirror:focus-visible,
.editor-content .ProseMirror:focus-within,
.editor-content .ProseMirror:active {
  outline: none !important;
}
</style>
