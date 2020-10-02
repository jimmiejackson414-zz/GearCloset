<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Selected Pack
      </div>
      <v-menu
        bottom
        class="ellipsis-menu"
        nudge-bottom
        offset-y
        transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="ellipsis"
            icon
            :ripple="false"
            v-on="on">
            <custom-icon
              :fill="primaryColor"
              height="30px"
              name="ellipsis-v"
              width="30px" />
          </v-btn>
        </template>
        <v-list
          dense
          elevation="1">
          <v-list-item-group>
            <v-list-item dense>
              <span class="body-1 font-weight-medium">Change selected pack</span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <div
      v-if="!activePack"
      class="selected-pack-wrapper">
      <div class="text-body-1">
        Active Pack Graph
      </div>
    </div>
    <p v-else>
      You haven't added a pack to this trip yet! Click on the dots in the top right to get started.
    </p>
  </div>
</template>

<script>
  import currentUser from '~/mixins/currentUser';

  export default {
    mixins: [currentUser],

    data: () => ({
      primaryColor: ''
    }),
    computed: {
      activePack () {
        return this.currentUser.packs.forEach(pack => {
          if (pack.active) { return pack; }
        });
      }
    },

    mounted () {
      this.primaryColor = $nuxt.$vuetify.theme.themes.light.primary;
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
</style>
