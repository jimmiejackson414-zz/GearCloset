<template>
  <v-container
    v-if="!loading"
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
          Viewing {{ totalComments }} Total Comments
        </p>
        <sign-up-alert @handle-open-upgrade-form="handleOpenUpgradeForm" />

        <!-- Post Wrapper -->
        <div class="post-wrapper">
          <post-card
            :is-original-post="isOriginalPost"
            :post="post.comments[0]"
            @toggle-delete-confirm-modal="toggleDeleteConfirmModal"
            @toggle-report-post-modal="toggleReportPostModal" />

          <!-- Replies Wrapper -->
          <div class="replies-wrapper">
            <post-card
              v-for="reply in post.comments.slice(1)"
              :key="reply.id"
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

    <!-- Full Screen Upgrade -->
    <full-screen-upgrade
      v-model="upgradeModalOpen"
      :user="currentUser"
      @handle-modal-open="updateSubscriptionModalOpen = true" />

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

  <loading-page v-else />
</template>

<script>
  import currentUser from '~/mixins/currentUser';
  import LoadingPage from '~/components/LoadingPage.vue';
  import PostCard from '~/components/forums/PostCard.vue';
  // import postQuery from '~/apollo/queries/forum/post.gql';
  import TipTapEditor from '~/components/TipTapEditor';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';

  export default {
    name: 'PostSlug',

    mixins: [currentUser],

    middleware: 'authenticated',

    data () {
      return {
        deletePostModalOpen: false,
        items: [
          { text: 'Forums', disabled: false, to: '/forums' },
          { text: '', disabled: false, to: '' },
          { text: '', disabled: true }
        ],
        loading: 1,
        reportPostModalOpen: false,
        selectedPost: null,
        upgradeModalOpen: false
      };
    },

    computed: {
      isOriginalPost () {
        return this.post.comments.indexOf(this.post.comments[0]) === 0;
      },
      pageTitle () {
        return this.post ? this.post.title : '';
      },
      post: () => [],
      postAuthor () {
        return this.post?.author;
      },
      totalComments () {
        return this.post.comments.length.toLocaleString();
      }
    },

    methods: {
      handleOpenUpgradeForm () {
        this.upgradeModalOpen = true;
      },
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
        this.selectedPost = post;
        this.reportPostModalOpen = true;
      }
    },

    async mounted () {
      // const { post } = await this.$store.dispatch('entities/simpleQuery', {
      //   query: postQuery,
      //   variables: {
      //     slug: this.$route.params.post_slug
      //   },
      //   bypassCache: false
      // });
      // ForumPost.insert({
      //   data: post
      // });
      // this.loading = 0;
    },

    watch: {
      post (val) {
        if (val) {
          this.items[1] = { text: this.post.subcategory.title, disabled: false, to: `/forums/${this.post.subcategory.slug}` };
          this.items[2] = { text: val.title, disabled: true };
        }
      }
    },

    components: {
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal'),
      FullScreenUpgrade: () => import(/* webpackPrefetch: true */'~/components/modals/FullScreenUpgrade'),
      LoadingPage,
      PostCard,
      TipTapEditor,
      ReportPostModal: () => import(/* webpackPrefetch: true */ '~/components/modals/ReportPostModal'),
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
