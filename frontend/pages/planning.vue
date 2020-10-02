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
  import Friends from '~/components/planning/widgets/Friends';
  import SelectedPack from '~/components/planning/widgets/SelectedPack';
  import ShoppingList from '~/components/planning/widgets/ShoppingList';
  import TodoList from '~/components/planning/widgets/TodoList';

  export default {
    name: 'Planning',

    // data: () => ({
    //   todos: [
    //     { id: 28, title: 'Book Car Rental', checked: 0, created_at: '2020-03-08 11:31:27', updated_at: '2020-03-08 11:31:27' },
    //     { id: 29, title: 'Call hostel', checked: 1, created_at: '2020-04-08 11:31:27', updated_at: '2020-04-08 11:31:27' }
    //   ]
    // }),

    components: {
      Friends,
      SelectedPack,
      ShoppingList,
      TodoList
    }
  };
</script>

<style lang="scss" scoped>

</style>
