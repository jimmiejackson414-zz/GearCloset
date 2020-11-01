<template>
  <div class="editor mt-3">
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="editor">
      <div class="menubar d-flex justify-space-between">
        <div class="left">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="bold"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic">
            <custom-icon
              fill="#4a4a4a"
              height="25x"
              name="italic"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="text-strike-through"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="underline"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="text"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })">
            <span style="height: 25px; width: 25px">
              <p class="body-text-1 text-uppercase mb-0">h1</p>
            </span>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })">
            <span class="body-text-1 text-uppercase">h2</span>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })">
            <span class="body-text-1 text-uppercase">h3</span>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="list-ul"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="list-ui-alt"
              width="25px" />
          </button>
        </div>
        <div class="right">
          <button
            class="menubar__button"
            @click="commands.undo">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="history-alt"
              width="25px" />
          </button>

          <button
            class="menubar__button"
            @click="commands.redo">
            <custom-icon
              fill="#4a4a4a"
              height="25px"
              name="redo"
              width="25px" />
          </button>
        </div>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content"
      :editor="editor" />
  </div>
</template>

<script>
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
  import {
    HardBreak,
    Heading,
    OrderedList,
    BulletList,
    ListItem,
    Bold,
    Italic,
    Link,
    Strike,
    Underline,
    History
  } from 'tiptap-extensions';

  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        editor: new Editor({
          extensions: [
            new BulletList(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new ListItem(),
            new OrderedList(),
            new Link(),
            new Bold(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History()
          ],
          content: this.content
        })
      };
    },

    beforeDestroy () {
      this.editor.destroy();
    },

    components: {
      EditorContent,
      EditorMenuBar
    }
  };
</script>

<style lang="scss">
  .editor__content {
    border: 1px solid #00000061;
    border-radius: 4px;
    padding: 12px;

    .ProseMirror {
      min-height: 100px;

      &.ProseMirror-focused {
        outline: none;
      }
    }

    p {
      margin-bottom: 0;
    }
  }
</style>
