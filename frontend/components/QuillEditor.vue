<template>
  <client-only>
    <div class="editor-wrapper">
      <vue-editor
        v-model="content"
        class="editor"
        :editor-options="editorOptions"
        :editor-toolbar="editorToolbar"
        :placeholder="placeholder" />
      <v-btn
        class="mt-3"
        color="primary"
        depressed
        :disabled="submitting"
        :ripple="false"
        @click="submitReply">
        <loading
          v-if="submitting"
          color="#0077be"
          height="30px"
          width="30px" />
        <span v-else>Submit</span>
      </v-btn>
    </div>
  </client-only>
</template>

<script>
  import Loading from '~/components/Loading';

  export default {
    data: () => ({
      content: '',
      editorToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['blockquote', 'link']],
      editorOptions: {},
      placeholder: 'Please remember to remain polite with your fellow hikers.',
      submitting: false
    }),

    methods: {
      submitReply () {
        console.log(`submit content: ${this.content}`);
        this.submitting = true;

        setTimeout(() => {
          this.submitting = false;
        }, 2000);
      }
    },

    components: {
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  .editor-wrapper {
    display: flex;
    flex-direction: column;

    .v-btn {
      align-self: flex-end;
    }
  }
</style>
