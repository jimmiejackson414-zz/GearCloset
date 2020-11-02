<template>
  <v-container class="category-slug-container">
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
        <sign-up-alert />

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

    <!-- Create New Topic Modal -->
    <create-new-topic-modal v-model="createNewTopicModal" />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import * as dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import currentUser from '~/mixins/currentUser';
  import { convertSlugToTitle } from '~/helpers/functions';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';

  export default {
    name: 'CategorySlug',

    mixins: [currentUser],

    data () {
      return {
        createNewTopicModal: false,
        headers: [
          { text: 'Topic', align: 'start', sortable: false, value: 'title' },
          { text: 'Posts', align: 'center', sortable: false, value: 'posts.length', filterable: false },
          { text: 'Last Post', align: 'center', sortable: false, value: 'last_post', filterable: false }
        ],
        breadcrumbs: [
          { text: 'Forums', disabled: false, to: '/forums' },
          { text: convertSlugToTitle(this.$route.params.slug), disabled: true, to: this.$route.params.slug }
        ],
        items: null,
        search: '',
        warningDarkest: ''
      };
    },

    computed: {
      ...mapState({
        categories: state => state.forums.categories
      }),
      pageTitle () {
        return convertSlugToTitle(this.$route.params.slug);
      }
    },

    methods: {
      determineItems () {
        // TODO: Refactor when backend is in place
        const slug = this.$route.params.slug;
        const allTopics = [];
        this.categories.forEach(cat => {
          return cat.subcategories.forEach(s => {
            if (s.slug === slug) {
              allTopics.push(s.topics);
            }
          });
        });
        // Set pinned topics at start, then rest of topics sorted by descending order
        this.items = [
          ...allTopics[0].filter(t => t.pinned),
          ...allTopics[0].filter(t => !t.pinned)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        ];
      },
      handleCreateNewTopic () {
        this.createNewTopicModal = true;
      },
      isPinned (item) {
        return item.pinned && 'pinned';
      },
      lastPost (item) {
        // TODO: Refactor when backend is in place
        return {
          date: dayjs(this.items[0].updated_at).fromNow(),
          author: 'Hulk Hogan'
        };
      },
      postAuthor (topic) {
        // TODO: Refactor when backend is in place
        return 'Randy Savage';
      },
      resetModal () {
        console.log('resetModal');
      }
    },

    created () {
      this.determineItems();
      dayjs.extend(relativeTime);
      this.warningDarkest = this.$nuxt.$vuetify.theme.themes.light.warningDarkest;
    },

    components: {
      CreateNewTopicModal: () => import('~/components/modals/CreateNewTopicModal.vue'),
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
