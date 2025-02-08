<template>
  <div class="doc-style-1 editor-parent">
    <div ref="editor"></div>
  </div>
</template>
<script setup>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import {onMounted, ref} from "vue";
import Table from "@editorjs/table";
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import InlineCode from '@editorjs/inline-code';
import CodeTool from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import Undo from 'editorjs-undo';


const editor = ref(null);
const editorInstance = ref(null);
onMounted(function () {
  editorInstance.value = new EditorJS({
    holder: editor.value,

    defaultBlock: 'paragraph',

    autofocus: true,

    onReady: () => {
      new Undo({editor: editorInstance.value});
    },

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      header: {
        class : Header,
        config: {
          placeholder : 'Enter a header',
          levels      : [1, 2, 3, 4],
          defaultLevel: 2
        }
      },

      quote: {
        class        : Quote,
        inlineToolbar: true,
        shortcut     : 'CMD+SHIFT+O',
        config       : {
          quotePlaceholder  : 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
      },

      code: CodeTool,

      marker: {
        class   : Marker,
        shortcut: 'CMD+SHIFT+M',
      },

      inlineCode: {
        class: InlineCode,
      },

      warning: {
        class        : Warning,
        inlineToolbar: true,
        shortcut     : 'CMD+SHIFT+W',
        config       : {
          titlePlaceholder  : 'Title',
          messagePlaceholder: 'Message',
        },
      },

      paragraph: {
        class        : Paragraph,
        inlineToolbar: true,
      },


      table: {
        class        : Table,
        inlineToolbar: true,
        config       : {
          rows   : 2,
          cols   : 3,
          maxRows: 5,
          maxCols: 5,
        },
      },

      list: {
        class        : List,
        inlineToolbar: true,
        config       : {
          defaultStyle: 'unordered'
        },
      }
    },
  })
});
</script>

<style>
.editor-parent {
  width:  80%;
  margin: 0 auto;
}

.ce-block__content,
.ce-toolbar__content {
  max-width: unset;
}
</style>
