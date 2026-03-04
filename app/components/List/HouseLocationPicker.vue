<template>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";

const editor = useEditor({
  content: "<p>I’m running Tiptap with Nuxt 3 🎈</p>",
  extensions: [StarterKit],
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
