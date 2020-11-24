<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Friends <span class="text-caption grey7--text ml-3 mb-1">({{ friendCount }})</span>
      </div>
      <plus-button @handle-click="handleInviteFriend" />
    </div>
    <div
      v-if="trip.friends.length"
      class="friends-wrapper">
      <v-tooltip
        v-for="friend in filteredFriends"
        :key="friend.id"
        color="dark-grey"
        nudge-top
        top>
        <template #activator="{ on, attrs }">
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
                v-if="isPendingInvite(friend)"
                class="white--text text-h5 font-weight-regular">@</span>
              <span
                v-else
                class="white--text text-body-1 font-weight-bold">{{ friend | initials }}</span>
            </v-avatar>
            <div
              v-if="isPendingInvite(friend)"
              class="pending-wrapper">
              <p>Pending</p>
            </div>
          </v-btn>
        </template>
        <span class="text-body-2">{{ friend | prettyName }}</span>
      </v-tooltip>
    </div>
    <p v-else>
      You haven't added any friends yet! Click on the plus button in the top right to get started.
    </p>
    <invite-friend-modal
      v-model="modalOpen"
      :friends="filteredFriends"
      :trip="trip"
      @handle-reset-modal="resetModal" />
  </div>
</template>

<script>
  import PlusButton from '~/components/icons/PlusButton';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      },
      // friends: {
      //   type: Array,
      //   default: () => []
      // },
      trip: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      modalOpen: false
    }),

    computed: {
      friendCount () {
        return this.filteredFriends.length;
      },
      filteredFriends () {
        return this.trip.friends.filter(friend => friend.id !== this.currentUser.id);
      }
    },

    methods: {
      handleInviteFriend () {
        this.modalOpen = true;
      },
      isPendingInvite (friend) {
        return friend.pending_invite;
      },
      resetModal () {
        this.modalOpen = false;
      }
    },

    components: {
      InviteFriendModal: () => import(/* webpackPrefetch: true */ '~/components/modals/InviteFriendModal'),
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
        transition: transform 0.15s $cubicBezier;
      }

      &:hover {
        box-shadow: 0 15px 20px 0 rgba(42, 51, 83, 0.12), 0 5px 15px rgba(0, 0, 0, 0.06) !important;

        .v-avatar {
          transform: scale(1.1);
        }
      }

      .pending-wrapper {
        background-color: $primary;
        border-radius: 5px;
        bottom: 0;
        padding: 5px;
        position: absolute;

        p {
          color: white;
          font-size: 0.7rem;
          margin: 0;
        }
      }
    }
  }
</style>
