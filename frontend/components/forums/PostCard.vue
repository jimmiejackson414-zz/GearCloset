<template>
  <div>
    <v-card
      :class="['pa-4', 'mx-2', {'op-card': isOriginalPost}, isOriginalPost ? 'mb-8' : 'mb-2']"
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
          <div class="right d-flex flex-column align-center">
            <p class="body-text-2 mb-0 grey6--text text-right">
              {{ postDate }}
            </p>
            <p class="body-text-2 mb-0 grey6--text text-right">
              {{ postTime }}
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="post-text"
          cols="12">
          <p class="body-text-1 mb-0">
            {{ post.text }}
          </p>
        </v-col>
      </v-row>
    </v-card>
    <v-divider v-if="!isOriginalPost" />
  </div>
</template>

<script>
  import * as dayjs from 'dayjs';

  export default {
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

    computed: {
      postDate () {
        return dayjs(this.post.created_at).format('MM/DD/YYYY');
      },
      postTime () {
        return dayjs(this.post.created_at).format('h:mm A');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .op-card {
    border-color: $primary!important;
  }

  .post-text {
    padding-left: 87px;
  }
</style>
