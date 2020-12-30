<template>
  <v-container
    v-if="!isLoading"
    class="category-slug-container">
    <v-row>
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
            {{ subcategory ? subcategory.title : '' }}
          </h4>
          <client-only>
            <v-btn
              v-if="currentUser.subscription_level !== 'free'"
              color="success"
              depressed
              @click="handleCreateNewTopic">
              <unicon
                class="mr-2"
                fill="#fff"
                :height="16"
                name="plus"
                :width="16" />New Post
            </v-btn>
          </client-only>
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
              <client-only>
                <unicon
                  v-if="item.pinned"
                  class="mr-2"
                  :fill="warningDarkest"
                  height="20"
                  name="map-marker-info"
                  width="20" />
              </client-only>
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

    <!-- Full Screen Upgrade -->
    <full-screen-upgrade
      v-model="upgradeModalOpen"
      :user="currentUser"
      @handle-modal-open="updateSubscriptionModalOpen = true" />

    <!-- Create New Topic Modal -->
    <create-new-topic-modal v-model="createNewTopicModal" />
  </v-container>

  <loading-page v-else />
</template>

<script>
  import * as dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import currentUser from '~/mixins/currentUser';
  import LoadingPage from '~/components/LoadingPage.vue';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';
  import SUBCATEGORY_QUERY from '~/apollo/queries/forum/subcategory.gql';

  export default {
    name: 'CategorySlug',

    mixins: [currentUser],

    middleware: 'authenticated',

    apollo: {
      subcategory: {
        query: SUBCATEGORY_QUERY,
        $loadingKey: 'isLoading',
        variables () {
          return {
            slug: this.$route.params.slug
          };
        },
        result ({ data: { subcategory } }) {
          this.subcategory = subcategory;
          this.items = this.subcategory.posts.slice().sort((a, b) => b.pinned - a.pinned);
          this.breadcrumbs[1] = { text: this.subcategory.title, disabled: true };
        }
      }
    },

    data () {
      return {
        breadcrumbs: [
          { text: 'Forums', disabled: false, to: '/forums' },
          { text: '', disabled: true }
        ],
        createNewTopicModal: false,
        headers: [
          { text: 'Post', align: 'start', sortable: false, value: 'title' },
          { text: 'Comments', align: 'center', sortable: false, value: 'commentCount', filterable: false },
          { text: 'Last Post', align: 'center', sortable: false, value: 'last_post', filterable: false }
        ],
        isLoading: 0,
        items: null,
        search: '',
        subcategory: null,
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
      },
      setSubcategory ({ data: { subcategory } }) {
        this.subcategory = subcategory;
        this.items = this.subcategory.posts.sort((a, b) => b.pinned - a.pinned);
        this.breadcrumbs[1] = { text: this.subcategory.title, disabled: true };
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
