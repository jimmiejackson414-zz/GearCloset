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
            :post="topic.posts[0]" />

          <!-- Replies Wrapper -->
          <div class="replies-wrapper">
            <post-card
              v-for="reply in replies"
              :key="reply.id"
              :author="currentUser"
              :post="reply" />
          </div>

          <!-- Create Reply Wrapper -->
          <div class="create-reply-wrapper">
            <v-textarea
              auto-grow
              counter
              label="Create a reply to this post."
              name="create-reply"
              outlined />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import { convertSlugToTitle } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import PostCard from '~/components/forums/PostCard.vue';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';

  export default {
    name: 'Post',

    mixins: [currentUser],

    data () {
      return {
        items: [
          { text: 'Forums', disabled: false, to: '/forums' },
          { text: convertSlugToTitle(this.$route.params.slug), disabled: false, to: this.$route.params.slug },
          { text: 'NOT WORKING', disabled: true, to: '#' } // TODO: Figure out last breadcrumb
        ]
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
              if (topic.id === Number(this.$route.params.id)) {
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

    components: {
      PostCard,
      SignUpAlert
    }
  };
</script>

<style lang="scss" scoped>

</style>
