<template>
  <v-container
    class="forums-container"
    grid-list-lg
    mx-auto>
    <div class="header">
      <div class="page-title text-h4 text-center mt-8 mb-4">
        Forums
      </div>
    </div>
    <v-layout row>
      <v-flex
        md8
        offset-md2
        xs12>
        <category-box
          v-for="category in categories"
          :key="category.id"
          :category="category" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import CategoryBox from '~/components/forums/CategoryBox.vue';

  export default {
    computed: {
      ...mapState({
        categories: state => state.forums.categories
      })
    },

    components: {
      CategoryBox
    }
  };
</script>

<style lang="scss" scoped>

</style>
