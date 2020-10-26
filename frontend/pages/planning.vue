<template>
  <v-container
    class="planning-container"
    grid-list-lg
    mx-auto>
    <div class="page-title text-h4 text-center mt-8 mb-4">
      Planning
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
  </v-container>
</template>

<script>
  import Friends from '~/components/planning/widgets/Friends.vue';
  import HikeDetails from '~/components/planning/widgets/HikeDetails.vue';
  import SelectedPack from '~/components/planning/widgets/SelectedPack.vue';
  import ShoppingList from '~/components/planning/widgets/ShoppingList.vue';
  import TodoList from '~/components/planning/widgets/TodoList.vue';
  import TripDetails from '~/components/planning/widgets/TripDetails.vue';

  export default {
    name: 'Planning',

    components: {
      Friends,
      HikeDetails,
      SelectedPack,
      ShoppingList,
      TodoList,
      TripDetails
    }
  };
</script>

<style lang="scss" scoped>

</style>
