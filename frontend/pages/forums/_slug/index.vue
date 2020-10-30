<template>
  <v-container
    class="category-slug-container"
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
        <h4 class="text-h4 page-title mb-8 pl-2">
          {{ pageTitle }}
        </h4>
        <sign-up-alert />

        <!-- list of category posts -->
        <v-text-field
          v-model="search"
          class="px-2"
          clearable
          dense
          hide-details
          label="Search"
          outlined
          single-line />
        <v-data-table
          class="posts-table"
          :headers="headers"
          :items="items"
          :items-per-page="20"
          :search="search">
          <template #item.title="{ item }">
            <nuxt-link
              class="text-h6"
              :to="`/forums/${$route.params.slug}/posts/${item.id}`">
              {{ item.title }}
            </nuxt-link>
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
        search: ''
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
        this.items = allTopics[0];
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
      }
    },

    created () {
      this.determineItems();
      dayjs.extend(relativeTime);
    },

    components: {
      SignUpAlert
    },

    head () {
      return {
        title: this.pageTitle
      };
    }
  };
</script>

<style lang="scss">
  .posts-table {
    tbody {
      td {
        padding: 0.5rem 16px !important;
      }
    }
  }
</style>
