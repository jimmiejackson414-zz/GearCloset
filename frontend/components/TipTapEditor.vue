<template>
  <client-only>
    <tiptap-vuetify
      v-model="localContent"
      :card-props="{ outlined: true }"
      :extensions="extensions"
      :placeholder="placeholder" />

    <template #placeholder>
      Loading...
    </template>
  </client-only>
</template>

<script>
  import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    History
  } from 'tiptap-vuetify';

  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        extensions: [
          Bold,
          Italic,
          Strike,
          Underline,
          Paragraph,
          [
            Heading,
            {
              options: {
                levels: [1, 2, 3]
              }
            }
          ],
          Blockquote,
          Link,
          ListItem,
          BulletList,
          OrderedList,
          HardBreak,
          History
        ],
        localContent: this.content,
        placeholder: 'Please remember to be respectful of your fellow hikers.'
      };
    },

    methods: {
      onKeyDown () {
        this.$emit('handle-update-content', this.localContent);
      }
    },

    watch: {
      localContent () {
        this.onKeyDown();
      }
    },

    components: {
      TiptapVuetify
    }
  };
</script>

<style lang="scss" scoped>

</style>
