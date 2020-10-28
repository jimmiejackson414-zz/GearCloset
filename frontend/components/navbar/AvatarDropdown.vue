<template>
  <v-menu
    bottom
    class="avatar-menu"
    close-on-click
    nudge-bottom
    offset-y
    open-on-focus
    open-on-hover
    transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        v-on="on">
        <avatar
          class="ml-5"
          :initials="currentUser | initials"
          :size="40" />
      </v-btn>
    </template>
    <v-list
      dense
      elevation="1">
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in dropdownItems"
          :key="i"
          dense>
          <nuxt-link
            class="body-1 font-weight-medium"
            :to="item.to">
            {{ item.title }}
          </nuxt-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
  import Avatar from '~/components/Avatar.vue';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      dropdownItems: [
        { title: 'Profile', to: '/profile' },
        { title: 'Logout', to: '/login' }
      ]
    }),

    components: {
      Avatar
    }
  };
</script>

<style lang="scss" scoped>

</style>
