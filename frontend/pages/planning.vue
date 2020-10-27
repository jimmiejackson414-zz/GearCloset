<template>
  <v-container
    class="planning-container"
    grid-list-lg
    mx-auto>
    <div class="header">
      <div class="page-title text-h4 text-center mt-8 mb-4">
        Planning
      </div>
      <div class="actions d-flex mt-8 mb-4">
        <v-select
          dense
          hide-details
          :items="items"
          label="Pick a Trip"
          outlined
          value="Foo"
          @change="handleUpdateList($event)" />
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
        <selected-pack />
      </v-flex>

      <!-- Friends Widget -->
      <v-flex
        md6
        xs12>
        <friends />
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
        <hike-details />
      </v-flex>

      <!-- Todo List Widget -->
      <v-flex
        md6
        xs12>
        <todo-list />
      </v-flex>

      <!-- Shopping List Widget -->
      <v-flex
        md6
        xs12>
        <shopping-list />
      </v-flex>
    </v-layout>

    <delete-confirm-modal
      v-model="deleteTripModalOpen"
      item="trip" />
  </v-container>
</template>

<script>
  import currentUser from '~/mixins/currentUser';
  import DeleteConfirmModal from '~/components/modals/DeleteConfirmModal.vue';
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import Friends from '~/components/planning/widgets/Friends.vue';
  import HikeDetails from '~/components/planning/widgets/HikeDetails.vue';
  import SelectedPack from '~/components/planning/widgets/SelectedPack.vue';
  import ShoppingList from '~/components/planning/widgets/ShoppingList.vue';
  import TodoList from '~/components/planning/widgets/TodoList.vue';
  import TripDetails from '~/components/planning/widgets/TripDetails.vue';

  export default {
    name: 'Planning',

    mixins: [currentUser],

    data: () => ({
      deleteTripModalOpen: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      listItems: [
        { title: 'Create trip', event: 'create-trip' },
        { title: 'Delete trip', event: 'delete-trip', customClass: 'secondary--text' }
      ]
    }),

    computed: {
      // TODO: Need to create db table to tie all of a trip's elements
      // together (selectedPack, friends, details, etc) and return here
      // trips () {
      //   return this.currentUser.trips;
      // }
    },

    methods: {
      handleCreateTrip () {
        console.log('createTrip');
      },
      handleDeleteTrip () {
        console.log('deleteTrip');
        this.deleteTripModalOpen = true;
      },
      handleUpdateList (e) {
        console.log('handleUpdateList', e);
      }
    },

    components: {
      DeleteConfirmModal,
      EllipsisButton,
      Friends,
      HikeDetails,
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
