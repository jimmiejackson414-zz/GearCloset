<template>
  <div>
    <v-card
      :class="['pa-4', {'op-card': isOriginalPost}, isOriginalPost ? 'mb-8' : 'mb-2']"
      :flat="!isOriginalPost"
      :outlined="isOriginalPost">
      <v-row>
        <v-col cols="12 d-flex align-center justify-space-between">
          <div class="left d-flex">
            <v-avatar
              color="primary"
              size="50">
              <img
                v-if="author.avatar_url"
                alt="avatar"
                :src="author.avatar_url">
              <span
                v-else
                class="white--text text-body-1 font-weight-bold">{{ author | initials }}</span>
            </v-avatar>
            <div class="author-information ml-6 d-flex flex-column">
              <div class="d-flex align-center">
                <p class="body-text-2 mb-0 mr-2 grey7--text font-weight-bold">
                  {{ author | prettyName('noTrailName') }}
                </p>
                <membership-chip :user="author" />
              </div>
              <p class="body-text-2 mb-0 grey6--text">
                {{ author.country }}
              </p>
            </div>
          </div>
          <div class="right">
            <ellipsis-button
              class="ellipsis"
              :items="ellipsisItems"
              @delete-post="deletePost"
              @edit-post="editPost"
              @report-post="reportPost" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="favorite-wrapper"
          cols="1">
          <favorite-item />
        </v-col>
        <v-col
          class="post-text"
          cols="9">
          <p class="body-text-1 mb-0">
            {{ post.text }}
          </p>
        </v-col>
        <v-col cols="2">
          <div class="right d-flex flex-column align-end">
            <p class="body-text-2 mb-0 grey6--text text-right">
              {{ postDate }}
            </p>
            <p class="body-text-2 mb-0 grey6--text text-right">
              {{ postTime }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-divider v-if="!isOriginalPost" />
  </div>
</template>

<script>
  import * as dayjs from 'dayjs';
  import currentUser from '~/mixins/currentUser';
  import EllipsisButton from '~/components/icons/EllipsisButton';
  import FavoriteItem from '~/components/icons/FavoriteItem';

  export default {
    mixins: [currentUser],

    props: {
      author: {
        type: Object,
        default: () => {}
      },
      isOriginalPost: {
        type: Boolean,
        default: false
      },
      post: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        postLocal: this.post
      };
    },

    computed: {
      ellipsisItems () {
        const items = [];

        if (this.post.author !== this.currentUser.id) { items.push({ title: 'Report', event: 'report-post' }); }
        if (this.post.author === this.currentUser.id) { items.push({ title: 'Edit', event: 'edit-post' }, { title: 'Delete', event: 'delete-post', customClass: 'error--text' }); }

        return items;
      },
      postDate () {
        return dayjs(this.post.created_at).format('MM/DD/YYYY');
      },
      postTime () {
        return dayjs(this.post.created_at).format('h:mm A');
      }
    },

    methods: {
      deletePost () {
        this.$emit('toggle-delete-confirm-modal', this.postLocal);
      },
      editPost () {
        console.log('editPost');
      },
      reportPost () {
        this.$emit('toggle-report-post-modal', this.postLocal);
      }
    },

    components: {
      EllipsisButton,
      FavoriteItem
    }
  };
</script>

<style lang="scss" scoped>
  .op-card {
    border-color: $primary!important;
  }

  .favorite-wrapper {
    padding-left: 18px;
  }
</style>
