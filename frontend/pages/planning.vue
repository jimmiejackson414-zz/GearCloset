<template>
  <v-container
    v-if="!loading"
    class="planning-container"
    grid-list-lg
    mx-auto>
    <div class="header">
      <div class="page-title text-h4 text-center mt-8 mb-4">
        Planning
      </div>
      <div class="actions d-flex mt-8 mb-4">
        <v-select
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
          @delete-trip="handleDeleteTrip" />
      </div>
    </div>
    <v-layout
      row
      wrap>
      <!-- Selected Pack Widget -->
      <v-flex
        md6
        xs12>
        <selected-pack :trip="selectedTrip" />
      </v-flex>

      <!-- Friends Widget -->
      <v-flex
        md6
        xs12>
        <friends
          :current-user="currentUser"
          :trip="selectedTrip" />
      </v-flex>

      <!-- Trip Details Widget -->
      <v-flex
        md6
        xs12>
        <trip-details :trip="selectedTrip" />
      </v-flex>

      <v-flex
        md6
        xs12>
        <hike-details :trip="selectedTrip" />
      </v-flex>

      <!-- Todo List Widget -->
      <v-flex
        md6
        xs12>
        <todo-list :trip="selectedTrip" />
      </v-flex>

      <!-- Shopping List Widget -->
      <v-flex
        md6
        xs12>
        <shopping-list :trip="selectedTrip" />
      </v-flex>
    </v-layout>

    <delete-confirm-modal
      v-model="deleteTripModalOpen"
      item="trip" />
  </v-container>

  <loading-page v-else />
</template>

<script>
  import currentUser from '~/mixins/currentUser';
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import Friends from '~/components/planning/widgets/Friends.vue';
  import HikeDetails from '~/components/planning/widgets/HikeDetails.vue';
  import LoadingPage from '~/components/LoadingPage.vue';
  import SelectedPack from '~/components/planning/widgets/SelectedPack.vue';
  import ShoppingList from '~/components/planning/widgets/ShoppingList.vue';
  import TodoList from '~/components/planning/widgets/TodoList.vue';
  import TripDetails from '~/components/planning/widgets/TripDetails.vue';
  import tripsQuery from '~/apollo/queries/content/trips.gql';

  export default {
    name: 'Planning',

    middleware: 'authenticated',

    mixins: [currentUser],

    apollo: {
      trips: {
        $loadingKey: 'loading',
        query: tripsQuery,
        result ({ data: { trips } }) {
          console.log('planning page initial query');
          this.selectedTrip = trips[0];
          return trips;
        }
      }
    },

    data: () => ({
      deleteTripModalOpen: false,
      loading: 0,
      listItems: [
        { title: 'Create trip', event: 'create-trip' },
        { title: 'Delete trip', event: 'delete-trip', customClass: 'error--text' }
      ],
      selectedTrip: null
    }),

    methods: {
      handleCreateTrip () {
        console.log('createTrip');
      },
      handleDeleteTrip () {
        console.log('deleteTrip');
        this.deleteTripModalOpen = true;
      }
    },

    components: {
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal.vue'),
      EllipsisButton,
      Friends,
      HikeDetails,
      LoadingPage,
      SelectedPack,
      ShoppingList,
      TodoList,
      TripDetails
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
