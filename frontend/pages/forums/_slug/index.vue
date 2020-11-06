<template>
  <v-container class="category-slug-container">
    <v-row v-if="!loading">
      <v-col
        cols="12"
        md="8"
        offset-md="2">
        <!-- breadcrumbs -->
        <v-breadcrumbs
          class="pl-0"
          :items="breadcrumbs">
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
        <div class="page-header d-flex justify-space-between">
          <h4 class="text-h4 page-title mb-8">
            {{ pageTitle }}
          </h4>
          <v-btn
            v-if="currentUser.subscription_level !== 'free'"
            color="success"
            depressed
            @click="handleCreateNewTopic">
            <custom-icon
              custom-class="mr-2"
              fill="#fff"
              :height="16"
              name="plus"
              :width="16" />New Post
          </v-btn>
        </div>
        <sign-up-alert @handle-open-upgrade-form="handleOpenUpgradeForm" />

        <!-- list of category posts -->
        <v-text-field
          v-model="search"
          class="my-4"
          clearable
          dense
          hide-details
          label="Search"
          outlined
          single-line />
        <v-data-table
          v-if="items"
          class="posts-table"
          :headers="headers"
          :item-class="isPinned"
          :items="items"
          :items-per-page="20"
          :search="search">
          <template #item.title="{ item }">
            <div class="title d-flex">
              <custom-icon
                v-if="item.pinned"
                custom-class="mr-2"
                :fill="warningDarkest"
                :height="20"
                name="map-marker-info"
                :width="20" />
              <nuxt-link
                class="text-h6"
                :to="`/forums/${$route.params.slug}/posts/${item.slug}`">
                {{ item.title }}
              </nuxt-link>
            </div>
            <p class="body-text-2 mb-0">
              Author: {{ postAuthor(item) }}
            </p>
          </template>
          <template #item.last_post="{ item }">
            <p class="body-text-2 mb-0 text-center">
              {{ lastPost(item).date }}
            </p>
            <p class="subtitle-2 mb-0 text-center">
              {{ lastPost(item).author }}
            </p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <loading-page v-else />

    <!-- Full Screen Upgrade -->
    <full-screen-upgrade
      v-model="upgradeModalOpen"
      :user="currentUser"
      @handle-modal-open="updateSubscriptionModalOpen = true" />

    <!-- Create New Topic Modal -->
    <create-new-topic-modal v-model="createNewTopicModal" />
  </v-container>
</template>

<script>
  import * as dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import currentUser from '~/mixins/currentUser';
  import LoadingPage from '~/components/LoadingPage.vue';
  import subCategoryQuery from '~/apollo/queries/forum/subcategory.gql';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';

  export default {
    name: 'CategorySlug',

    mixins: [currentUser],

    apollo: {
      subcategory: {
        query: subCategoryQuery,
        variables () {
          return {
            slug: this.$route.params.slug
          };
        },
        result ({ data: { subcategory } }) {
          this.items = subcategory.posts.sort((a, b) => b.pinned - a.pinned);
          this.breadcrumbs[1] = { text: subcategory.title, disabled: true };
        }
      }
    },

    data () {
      return {
        createNewTopicModal: false,
        headers: [
          { text: 'Post', align: 'start', sortable: false, value: 'title' },
          { text: 'Comments', align: 'center', sortable: false, value: 'commentCount', filterable: false },
          { text: 'Last Post', align: 'center', sortable: false, value: 'last_post', filterable: false }
        ],
        breadcrumbs: [
          { text: 'Forums', disabled: false, to: '/forums' },
          { text: '', disabled: true }
        ],
        items: null,
        loading: 0,
        search: '',
        warningDarkest: '',
        upgradeModalOpen: false
      };
    },

    computed: {
      pageTitle () {
        return this.subcategory ? this.subcategory.title : '';
      }
    },

    methods: {
      handleCreateNewTopic () {
        this.createNewTopicModal = true;
      },
      handleOpenUpgradeForm () {
        this.upgradeModalOpen = true;
      },
      isPinned (post) {
        return post.pinned && 'pinned';
      },
      lastPost (post) {
        const lastComment = post.comments.reduce((r, o) => o.updated_at < r.updated_at ? o : r);

        return {
          date: dayjs(lastComment.updated_at).fromNow(),
          author: this.$options.filters.prettyName(lastComment.author)
        };
      },
      postAuthor (post) {
        return this.$options.filters.prettyName(post.author);
      },
      resetModal () {
        console.log('resetModal');
      }
    },

    created () {
      dayjs.extend(relativeTime);
      this.warningDarkest = this.$nuxt.$vuetify.theme.themes.light.warningDarkest;
    },

    components: {
      CreateNewTopicModal: () => import(/* webpackPrefetch: true */ '~/components/modals/CreateNewTopicModal.vue'),
      FullScreenUpgrade: () => import(/* webpackPrefetch: true */'~/components/modals/FullScreenUpgrade'),
      LoadingPage,
      SignUpAlert
    },

    head () {
      return {
        title: `${this.pageTitle} | Forums`
      };
    }
  };
</script>

<style lang="scss">
  .posts-table {
    tbody {
      tr {
        &.pinned {
          background-color: $warningLight;

          .title {
            a {
              color: $warningDarkest;
            }
          }

        }

        &:hover {
          &.pinned {
            background-color: lighten($warning, 5%) !important;
          }
        }

        td {
          padding: 0.5rem 16px !important;
        }
      }
    }
  }
</style>
