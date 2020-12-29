<template>
  <v-menu
    bottom
    class="avatar-menu"
    close-on-click
    nudge-bottom
    offset-y
    transition="slide-y-transition">
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        v-on="on">
        <avatar
          class="ml-5"
          :size="40"
          :user="currentUser" />
      </v-btn>
    </template>
    <v-list
      dense
      elevation="1">
      <v-list-item
        active-class="no-active"
        class="py-2">
        <div class="text-right">
          <v-list-item-title class="title justify-end">
            {{ formatCurrentUser.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ formatCurrentUser.email }}
          </v-list-item-subtitle>
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in dropdownItems"
          :key="i"
          active-class="no-active"
          class="justify-end"
          dense>
          <nuxt-link
            class="body-1 font-weight-medium"
            :to="item.to">
            {{ item.title }}
          </nuxt-link>
        </v-list-item>
        <v-list-item
          active-class="no-active"
          class="justify-end"
          dense>
          <button
            class="body-1 font-weight-medium"
            @click="handleLogout">
            Logout
          </button>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
  import logoutMutation from '~/apollo/mutations/auth/logout.gql';
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
        { title: 'Profile', to: '/profile' }
      ]
    }),

    computed: {
      formatCurrentUser () {
        if (this.currentUser) {
          return {
            name: this.$options.filters.prettyName(this.currentUser),
            email: this.currentUser.email
          };
        }
        return {
          name: '',
          email: ''
        };
      }
    },

    methods: {
      async handleLogout () {
        try {
          await this.$apollo.mutate({
            mutation: logoutMutation
          });

          this.$router.push({ path: '/login' });
        } catch (e) {

        }
      }
    },

    components: {
      Avatar
    }
  };
</script>

<style lang="scss" scoped>
  .no-active {
    &:before {
      opacity: 0;
    }
  }
</style>
