<template>
  <v-card
    :class="['pa-4', {'op-card': isOriginalPost}, isOriginalPost ? 'mb-8' : 'mb-2']"
    outlined>
    <v-row>
      <v-col cols="12 d-flex align-center justify-space-between">
        <div class="left d-flex">
          <v-avatar
            color="accent"
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
            <p class="body-text-2 mb-0 grey7--text font-weight-bold">
              {{ author | prettyName('noTrailName') }}
            </p>
            <p class="body-text-2 mb-0 grey6--text">
              {{ author.country }}
            </p>
          </div>
        </div>
        <div class="right">
          <p class="body-text-2 mb-0 grey6--text text-right">
            {{ topicDate }}
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
</template>

<script>
  import * as dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

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
      topicDate () {
        return dayjs(this.post.created_at).fromNow();
      }
    },

    created () {
      dayjs.extend(relativeTime);
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
