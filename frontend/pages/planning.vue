<template>
  <v-container
    v-if="!isLoading"
    class="planning-container"
    grid-list-lg
    mx-auto>
    <div class="header">
      <div class="page-title text-h4 text-center mt-8 mb-4">
        Planning
      </div>
      <div class="actions d-flex mt-8 mb-4">
        <!-- <v-select
          v-model="selectedTrip"
          dense
          hide-details
          item-text="name"
          item-value="id"
          :items="trips"
          label="Pick a Trip"
          outlined
          return-object />
        <ellipsis-button
          class="ellipsis"
          :items="listItems"
          @create-trip="handleCreateTrip"
          @delete-trip="handleDeleteTrip" /> -->
      </div>
    </div>
    <v-layout
      row
      wrap>
      <!-- Selected Pack Widget -->
      <v-flex
        md6
        xs12>
        <!-- <selected-pack
          :trip="selectedTrip"
          @handle-refetch-trips="refetchTrips" /> -->
      </v-flex>

      <!-- Friends Widget -->
      <v-flex
        md6
        xs12>
        <!-- <friends
          :current-user="currentUser"
          :trip="selectedTrip" /> -->
      </v-flex>

      <!-- Trip Details Widget -->
      <v-flex
        md6
        xs12>
        <!-- <trip-details :trip="selectedTrip" /> -->
      </v-flex>

      <v-flex
        md6
        xs12>
        <!-- <hike-details :trip="selectedTrip" /> -->
      </v-flex>

      <!-- Todo List Widget -->
      <v-flex
        md6
        xs12>
        <!-- <todo-list :trip="selectedTrip" /> -->
      </v-flex>

      <!-- Shopping List Widget -->
      <v-flex
        md6
        xs12>
        <!-- <shopping-list :trip="selectedTrip" /> -->
      </v-flex>
    </v-layout>

    <delete-confirm-modal
      v-model="deleteTripModalOpen"
      item="trip" />
  </v-container>

  <loading-page v-else />
</template>

<script>
  // import { handleCookies } from '~/helpers';
  // import { request } from 'graphql-request';
  import currentUser from '~/mixins/currentUser';
  // import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  // import Friends from '~/components/planning/widgets/Friends.vue';
  // import HikeDetails from '~/components/planning/widgets/HikeDetails.vue';
  import LoadingPage from '~/components/LoadingPage.vue';
  // import SelectedPack from '~/components/planning/widgets/SelectedPack.vue';
  // import ShoppingList from '~/components/planning/widgets/ShoppingList.vue';
  // import TodoList from '~/components/planning/widgets/TodoList.vue';
  // import TripDetails from '~/components/planning/widgets/TripDetails.vue';
  // import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';
  // import { userService } from '~/services';
  // import ME_QUERY from '~/apollo/queries/user/me.gql';

  export default {
    name: 'Planning',

    middleware: 'authenticated',

    mixins: [currentUser],

    data: () => ({
      deleteTripModalOpen: false,
      isLoading: true,
      listItems: [
        { title: 'Create trip', event: 'create-trip' },
        { title: 'Delete trip', event: 'delete-trip', customClass: 'error--text' }
      ],
      selectedTrip: null,
      trips: null
    }),

    methods: {
      handleData ({ data: { trips } }) {
        this.selectedTrip = trips[0];
        this.trips = trips;
      },
      handleCreateTrip () {
        console.log('createTrip');
      },
      handleDeleteTrip () {
        this.deleteTripModalOpen = true;
      },
      refetchTrips () {
        this.$refs.tripsQueryRef.getApolloQuery().refetch();
      }
    },

    components: {
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal.vue'),
      // EllipsisButton,
      // Friends,
      // HikeDetails,
      LoadingPage
      // SelectedPack,
      // ShoppingList,
      // TodoList,
      // TripDetails
    },

    head () {
      return {
        title: 'Planning'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    display: grid;
    grid-column-gap: 5px;
    grid-template-columns: 1fr auto 1fr;
    justify-items: center;

    .page-title {
      grid-column-start: 2;
    }

    .actions {
      margin-left: auto;
    }
  }
</style>
