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
        <client-only>
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
        </client-only>
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
        <trip-details />
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
  import { mapActions, mapState } from 'vuex';
  import currentUser from '~/mixins/currentUser';
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import Friends from '~/components/planning/widgets/Friends.vue';
  import HikeDetails from '~/components/planning/widgets/HikeDetails.vue';
  import LoadingPage from '~/components/LoadingPage.vue';
  import SelectedPack from '~/components/planning/widgets/SelectedPack.vue';
  import ShoppingList from '~/components/planning/widgets/ShoppingList.vue';
  import TodoList from '~/components/planning/widgets/TodoList.vue';
  import TripDetails from '~/components/planning/widgets/TripDetails.vue';
  import Trip from '~/database/models/trip';

  export default {
    name: 'Planning',

    middleware: 'authenticated',

    mixins: [currentUser],

    async fetch () {
      await this.fetchTrips();
    },

    data: () => ({
      deleteTripModalOpen: false,
      listItems: [
        { title: 'Create trip', event: 'create-trip' },
        { title: 'Delete trip', event: 'delete-trip', customClass: 'error--text' }
      ]
    }),

    computed: {
      ...mapState({
        isLoading: state => state.entities.trips.isLoading,
        selectedTripId: state => state.entities.trips.selectedTripId
      }),
      selectedTrip: {
        get () {
          return Trip.selectedTrip();
        },
        set (newValue) {
          this.$store.commit('entities/trips/setSelectedTripId', newValue.id);
        }
      },
      trips: () => Trip.all()
    },

    methods: {
      ...mapActions('entities/trips', [
        'createTrip',
        'fetchTrips'
      ]),
      handleData ({ data: { trips } }) {
        this.selectedTrip = trips[0];
        this.trips = trips;
      },
      async handleCreateTrip () {
        const payload = { variables: { owner_id: this.currentUser.id } };
        const results = await this.createTrip(payload);
        console.log({ results });
      },
      handleDeleteTrip () {
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
