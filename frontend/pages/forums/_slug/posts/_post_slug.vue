<template>
  <v-container
    class="post-container"
    grid-list-lg
    mx-auto>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2">
        <!-- breadcrumbs -->
        <v-breadcrumbs
          class="pl-2"
          :items="items">
          <template #item="{ item }">
            <v-breadcrumbs-item
              :disabled="item.disabled"
              exact
              nuxt
              :to="item.to">
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
        <h4 class="text-h4 page-title mb-2 pl-2">
          {{ pageTitle }}
        </h4>
        <p class="body-text-2 grey8--text mb-8 pl-2">
          Viewing {{ totalPosts }} Total Posts
        </p>
        <sign-up-alert />

        <!-- Post Wrapper -->
        <div class="post-wrapper">
          <post-card
            :author="topicAuthor"
            :is-original-post="isOriginalPost"
            :post="topic.posts[0]"
            @toggle-delete-confirm-modal="toggleDeleteConfirmModal"
            @toggle-report-post-modal="toggleReportPostModal" />

          <!-- Replies Wrapper -->
          <div class="replies-wrapper">
            <post-card
              v-for="reply in replies"
              :key="reply.id"
              :author="currentUser.friends[0]"
              :post="reply"
              @toggle-delete-confirm-modal="toggleDeleteConfirmModal"
              @toggle-report-post-modal="toggleReportPostModal" />
          </div>

          <!-- Create Reply Wrapper -->
          <div
            v-if="currentUser.subscription_level !== 'free'"
            class="create-reply-wrapper">
            <tip-tap-editor />
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Delete Confirm Modal -->
    <delete-confirm-modal
      v-model="deletePostModalOpen"
      item="post"
      :selected-detail="selectedPost"
      @handle-remove-post="handleRemovePost"
      @handle-reset-modal="handleResetModal" />

    <!-- Report Post Modal -->
    <report-post-modal
      v-model="reportPostModalOpen"
      :selected-item="selectedPost"
      @handle-reset-modal="handleResetModal" />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import { convertSlugToTitle } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import PostCard from '~/components/forums/PostCard.vue';
  import TipTapEditor from '~/components/TipTapEditor';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';

  export default {
    name: 'Post',

    mixins: [currentUser],

    data () {
      return {
        deletePostModalOpen: false,
        items: [
          { text: 'Forums', disabled: false, to: '/forums' },
          { text: convertSlugToTitle(this.$route.params.slug), disabled: false, to: `/forums/${this.$route.params.slug}` },
          { text: convertSlugToTitle(this.$route.params.post_slug), disabled: true, to: `/forums/${this.$route.params.slug}/posts/${this.$route.params.post_slug}` }
        ],
        reportPostModalOpen: false,
        selectedPost: null
      };
    },

    computed: {
      ...mapState({
        categories: state => state.forums.categories
      }),
      isOriginalPost () {
        return this.topic.posts.indexOf(this.topic.posts[0]) === 0;
      },
      pageTitle () {
        return this.topic.title;
      },
      replies () {
        return this.topic.posts.slice(1);
      },
      topic () {
        let found;
        this.categories.forEach(category => {
          category.subcategories.forEach(sub => {
            sub.topics.forEach(topic => {
              if (topic.slug === this.$route.params.post_slug) {
                found = topic;
              }
            });
          });
        });
        return found;
      },
      topicAuthor () {
        return this.currentUser;
      },
      totalPosts () {
        return this.topic.posts.length.toLocaleString();
      }
    },

    methods: {
      handleRemovePost () {
        console.log('handleRemovePost');
      },
      handleResetModal () {
        this.selectedPost = null;
      },
      toggleDeleteConfirmModal (post) {
        this.selectedPost = post;
        this.deletePostModalOpen = true;
      },
      toggleReportPostModal (post) {
        console.log({ post });
        this.selectedPost = post;
        this.reportPostModalOpen = true;
      }
    },

    components: {
      DeleteConfirmModal: () => import('~/components/modals/DeleteConfirmModal'),
      PostCard,
      TipTapEditor,
      ReportPostModal: () => import('~/components/modals/ReportPostModal'),
      SignUpAlert
    },

    head () {
      return {
        title: this.pageTitle
      };
    }
  };
</script>

<style lang="scss" scoped>

</style>
