<template>
  <v-container
    class="forums-container"
    grid-list-lg
    mx-auto>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2">
        <div class="header">
          <div class="page-title text-h4 text-center mt-8 mb-4">
            Forums
          </div>
          <div class="disclaimer text-center mb-6">
            Gear Closet forums are moderated, frequented by people from all over the world, and here primarily
            to foster helpful and positive discussions about backpacking.
            <span class="font-weight-bold">
              Please be respectful and review our
              <nuxt-link to="/forums/guidelines">
                Forum Guidelines
              </nuxt-link>
              prior to posting.</span>
          </div>
          <sign-up-alert />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2">
        <category-box
          v-for="category in categories"
          :key="category.id"
          :category="category" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import CategoryBox from '~/components/forums/CategoryBox.vue';
  import SignUpAlert from '~/components/forums/SignUpAlert.vue';

  export default {
    computed: {
      ...mapState({
        categories: state => state.forums.categories
      })
    },

    components: {
      CategoryBox,
      SignUpAlert
    },

    head () {
      return {
        title: 'Forums'
      };
    }
  };
</script>

<style lang="scss" scoped>

</style>
