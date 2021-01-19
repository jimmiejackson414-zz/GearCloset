<template>
  <v-dialog
    v-model="show"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>
        Create New Post
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                color="primary"
                dense
                :disabled="submitting"
                label="Title"
                outlined
                required
                :rules="titleRules"
                validate-on-blur
                @keyup.enter="handleSubmit" />
              <tip-tap-editor
                :content="content"
                @handle-update-content="handleUpdateContent" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey7--text"
          :disabled="submitting"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          depressed
          :disabled="submitting || isDisabled"
          :ripple="false"
          @click="handleCreate">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Create Post</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import Loading from '~/components/Loading.vue';
  import TipTapEditor from '~/components/TipTapEditor';

  export default {
    props: {
      subcategory: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      content: '',
      submitting: false,
      title: '',
      titleRules: [
        v => !!v || 'Title is required'
      ]
    }),

    computed: {
      isDisabled () {
        return !this.title || !this.content;
      },
      show: {
        get () {
          return this.value;
        },
        set (value) {
          this.$emit('input', value);
        }
      }
    },

    methods: {
      ...mapActions({
        success: 'alert/success',
        error: 'alert/error'
      }),
      ...mapActions('entities/forumPosts', [
        'createPost'
      ]),
      closeModal () {
        this.show = false;
        this.content = '';
        this.title = '';
      },
      async handleCreate () {
        this.submitting = true;

        const payload = {
          variables: {
            title: this.title,
            text: this.content,
            pinned: false,
            forum_subcategory_id: this.subcategory.id
          }
        };
        await this.createPost(payload);

        this.success('Post successfully created.');
        this.closeModal();
        this.$emit('handle-reset-modal');
        this.submitting = false;
      },
      handleUpdateContent (value) {
        this.content = value;
      }
    },

    components: {
      Loading,
      TipTapEditor
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $primary;
  }
</style>
