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

      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ active: editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>

      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ active: editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>

      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ active: editor.isActive('heading', { level: 3 }) }"
      >
        H3
      </button>

      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ active: editor.isActive('heading', { level: 4 }) }"
      >
        H4
      </button>
    </BubbleMenu>


    <!-- The editable area -->
    <EditorContent :editor="editor" class="editor-content doc-style-1"/>
  </div>
</template>

<script setup>
import {onBeforeUnmount} from 'vue'
import {useEditor, EditorContent, BubbleMenu} from '@tiptap/vue-3'
import Document from '@tiptap/extension-document';

import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';

import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';

import HardBreak from '@tiptap/extension-hard-break';

import AutoJoiner from 'tiptap-extension-auto-joiner'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'


let content = `
  <h2>Heading</h2>
  <p>This is a paragraph.</p>
  <blockquote>
    <p>A blockquote example.</p>
  </blockquote>
  <p>Another paragraph.</p>
    `;


let extensions = [
  AutoJoiner,
  GlobalDragHandle,


  Document,
  Text,
  Bold,
  Italic,

  Paragraph,
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),

  OrderedList,
  BulletList,
  ListItem,

  CodeBlock,
  Blockquote,

  HardBreak,

];
const editor = useEditor({
  content   : content,
  extensions: extensions,
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
  margin:        0 auto;
  max-width:     600px;
  box-shadow:    0 2px 5px rgba(0, 0, 0, 0.1);
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

/* Ensure each block-level element is positioned relatively */
.ProseMirror > * {
  position: relative;
}


.drag-handle {
  position:            fixed;
  opacity:             1;
  transition:          opacity ease-in 0.2s;
  border-radius:       0.25rem;

  background-image:    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(0, 0, 0, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
  background-size:     calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
  background-repeat:   no-repeat;
  background-position: center;
  width:               1.2rem;
  height:              1.5rem;
  z-index:             50;
  cursor:              grab;
}

.drag-handle:hover {
  background-color: black;
  transition:       background-color 0.2s;
}

.drag-handle:active {
  background-color: red;
  transition:       background-color 0.2s;
  cursor:           grabbing;
}

.drag-handle.hide {
  opacity:        0;
  pointer-events: none;
}

@media screen and (max-width: 600px) {
  .drag-handle {
    display:        none;
    pointer-events: none;}
}


</style>
