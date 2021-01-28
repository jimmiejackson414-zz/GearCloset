<template>
  <loading-page v-if="isLoading" />
  <v-container
    v-else
    class="friends-container"
    mx-auto>
    <div class="header">
      <div class="page-title text-h4 text-center mt-8 mb-4">
        Friends
      </div>
      <div class="actions d-flex mt-8 mb-4">
        <v-btn
          color="primary"
          depressed
          :ripple="false">
          Invite
        </v-btn>
      </div>
    </div>
    <v-layout
      row
      wrap>
      <v-flex
        v-for="friend in friends"
        :key="friend.id"
        md8
        xs12>
        <p>{{ friend.first_name }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import currentUser from '~/mixins/currentUser';
  import LoadingPage from '~/components/LoadingPage.vue';
  import User from '~/database/models/user';

  export default {
    name: 'Friends',

    middleware: 'authenticated',

    mixins: [currentUser],

    async fetch () {
      await this.fetchFriends();
    },

    computed: {
      ...mapState({
        isLoading: state => state.entities.users.isLoading
      }),
      friends () {
        return User.query().where(user => user.id !== this.currentUser.id).all();
      }
    },

    methods: {
      ...mapActions('entities/users', [
        'fetchFriends'
      ])
    },

    components: {
      LoadingPage
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
