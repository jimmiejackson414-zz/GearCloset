<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Friends <span class="text-caption light-grey--text ml-3 mb-1">({{ friendCount }})</span>
      </div>
      <plus-button @handle-click="handleInviteFriend" />
    </div>
    <div
      v-if="currentUser.friends.length"
      class="friends-wrapper">
      <v-tooltip
        v-for="friend in currentUser.friends"
        :key="friend.id"
        color="dark-grey"
        nudge-top
        top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="friend-btn"
            elevation="0"
            fab
            icon
            nuxt
            :ripple="false"
            :to="`/friends/${friend.id}`"
            x-large
            v-on="on">
            <v-avatar
              class="pointer"
              color="info"
              size="75">
              <img
                v-if="friend.avatar_url"
                alt="avatar"
                :src="friend.avatar_url">
              <span
                v-else
                class="white--text text-body-1 font-weight-bold">{{ friend | initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <span class="text-body-2">{{ friend | prettyName }}</span>
      </v-tooltip>
    </div>
    <p v-else>
      You haven't added any friends yet! Click on the plus button in the top right to get started.
    </p>
    <invite-friend-modal v-model="modalOpen" />
  </div>
</template>

<script>
  import currentUser from '~/mixins/currentUser';
  import InviteFriendModal from '~/components/modals/InviteFriendModal';
  import PlusButton from '~/components/icons/PlusButton';

  export default {
    mixins: [currentUser],

    data: () => ({
      modalOpen: false
    }),

    computed: {
      friendCount () {
        return this.currentUser.friends.length;
      }
    },

    methods: {
      handleInviteFriend () {
        this.modalOpen = true;
      }
    },

    components: {
      InviteFriendModal,
      PlusButton
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';

  .friends-wrapper {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));

    .friend-btn {
      .v-avatar {
        transition: transform 0.15s cubic-bezier(0.57, 0.06, 0, 1.06);
      }
      &:hover {
        box-shadow: 0 15px 20px 0 rgba(42, 51, 83, 0.12), 0 5px 15px rgba(0, 0, 0, 0.06) !important;

        .v-avatar {
          transform: scale(1.1);
        }
      }
    }
  }
</style>
