<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Friends <span class="text-caption grey7--text ml-3">({{ friendCount }})</span>
      </div>
      <plus-button @handle-click="handleInviteFriend" />
    </div>
    <div
      v-if="friends.length"
      class="friends-wrapper">
      <v-tooltip
        v-for="friend in friends"
        :key="friend.id"
        color="dark-grey"
        nudge-top
        top>
        <template #activator="{ on, attrs }">
          <div
            v-if="isPendingInvite(friend)"
            v-bind="attrs"
            class="pending"
            v-on="on">
            <v-avatar
              color="info"
              size="75">
              <span
                class="white--text text-body-1 font-weight-bold">
                {{ friendInitials(friend) }}
              </span>
            </v-avatar>
            <div
              class="pending-wrapper">
              <p>Pending</p>
            </div>
          </div>
          <v-btn
            v-else
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
              <cld-image
                v-if="friend.avatar_url"
                crop="scale"
                :public-id="friend.avatar_url"
                width="75" />
              <span
                v-else
                class="white--text text-body-1 font-weight-bold">
                {{ friendInitials(friend) }}
              </span>
            </v-avatar>
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
      :friends="friends"
      :trip="trip"
      @handle-reset-modal="resetModal" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import currentUser from '~/mixins/currentUser';
  import PlusButton from '~/components/icons/PlusButton.vue';
  import Trip from '~/database/models/trip';

  export default {
    mixins: [currentUser],

    data: () => ({
      modalOpen: false
    }),

    computed: {
      ...mapState({
        selectedTripId: state => state.entities.trips.selectedTripId
      }),
      friends () {
        return this.trip.users.filter(user => user.id !== this.currentUser.id); ;
      },
      friendCount () {
        return this.friends.length;
      },
      trip () {
        return Trip.query().whereId(this.selectedTripId).with('users').first();
      }
    },

    methods: {
      friendInitials (friend) {
        return this.isPendingInvite(friend) ? '@' : `${this.$options.filters.initials(friend)}`;
      },
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
      InviteFriendModal: () => import(/* webpackPrefetch: true */ '~/components/modals/InviteFriendModal.vue'),
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
    }

    .pending {
      display: flex;
      position: relative;

      .pending-wrapper {
        background-color: $accentDarkest;
        border-radius: 5px;
        bottom: 0;
        left: 12%;
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
