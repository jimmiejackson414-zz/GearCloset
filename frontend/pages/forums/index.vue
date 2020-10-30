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
            GearCloset forums are moderated, frequented by people from all over the world, and here primarily
            to foster helpful and positive discussions about backpacking.
            <span class="font-weight-bold">
              Please be respectful and review our
              <nuxt-link to="/forum/guidelines">
                Forum Guidelines
              </nuxt-link>
              prior to posting.</span>
          </div>
          <v-alert
            v-if="showJoin"
            border="top"
            color="accentDarkest"
            outlined>
            <template #prepend>
              <custom-icon
                custom-class="mr-4"
                :fill="accentColor"
                height="30px"
                name="info-circle"
                width="30px" />
            </template>
            <p class="body-text-1 mb-0 grey8--text">
              Posting in these forums requires a membership. Sign up today to enjoy all the benefits of joining GearCloset!
            </p>
          </v-alert>
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
  import currentUser from '~/mixins/currentUser';
  import CategoryBox from '~/components/forums/CategoryBox.vue';

  export default {
    mixins: [currentUser],

    data: () => ({
      accentColor: ''
    }),

    computed: {
      ...mapState({
        categories: state => state.forums.categories
      }),
      showJoin () {
        return this.currentUser && this.currentUser.subscription_level === 'free';
      }
    },

    created () {
      this.accentColor = this.$nuxt.$vuetify.theme.themes.light.accent;
    },

    components: {
      CategoryBox
    }
  };
</script>

<style lang="scss" scoped>

</style>
