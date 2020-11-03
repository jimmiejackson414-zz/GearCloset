<template>
  <v-navigation-drawer
    class="primary"
    :expand-on-hover="expandOnHover"
    floating
    permanent>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            Sandra Adams
          </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      dense
      nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Files</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Shared with me</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Starred</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // import { sortBy } from 'lodash';
  import currentUser from '~/mixins/currentUser';

  export default {
    mixins: [currentUser],

    data: () => ({
      createItemModalOpen: false,
      createPackModalOpen: false,
      expandOnHover: true,
      searchQuery: '',
      secondaryLight: ''
    }),

    computed: {
      categories () {
        // TODO: will need to update this
        return this.packs[0].categories;
      },
      packs () {
        return this.currentUser.packs;
      }
    },

    methods: {
      activeSelection (id) {
        // TODO: will need to update this
        return true;
      },
      clearSearch () {
        this.searchQuery = '';
      },
      filteredItems (category) {
        let filteredItems = [];
        if (this.searchQuery) {
          const text = this.searchQuery.toLowerCase();
          filteredItems = category.items.filter(item => item.name && item.name.toLowerCase().includes(text));
        } else {
          filteredItems = category.items;
        }
        return filteredItems;
      },
      filteredPacks () {
        let filteredPacks = [];
        if (this.searchQuery) {
          const text = this.searchQuery.toLowerCase();
          filteredPacks = this.packs.filter(pack => pack.name.toLowerCase().includes(text));
        } else {
          filteredPacks = this.packs;
        }
        // return sortBy(filteredPacks, 'name');
        return filteredPacks;
      },
      handleSelectedPack (pack) {
        console.log('handleSelectedPack');
      }
    },

    mounted () {
      this.secondaryLight = $nuxt.$vuetify.theme.themes.light.secondaryLight;
    }
  };
</script>

<style lang="scss" scoped>
  .search-container {
    border-bottom: 1px solid $grey8;
    margin: 2rem 2rem 1rem;

    .wrapper {
      border-bottom: 1px solid $grey8;
      padding-bottom: 1rem;
    }
  }
</style>

<style lang="scss">
  .search-container {
    .v-input {
      &.v-input--is-focused {
        .v-input__slot {
          input {
            color: $grey8 !important;
          }
        }
      }
    }
  }

  .wrapper {
    .header {
      align-items    : center;
      display        : flex;
      justify-content: space-between;
      margin: 0 2rem;

      .header-divider {
        align-items    : center;
        display        : flex;
        justify-content: flex-start;

        .text-h6 {
          padding     : 1rem 0;
          margin-right: 0.5rem;
        }
      }
    }

    .v-list {
      background-color: transparent;
      box-shadow: none;
      padding: 0;

      &.packs-list {
        .v-list-item {
          &.selected {
            background-color: $primaryDark;
          }
        }
      }

      .v-list-group {
        .v-list-group__header {
          .v-list-item__title {
            font-size: 1rem;
            font-weight: 600;
          }
          .v-list-item__icon {
            margin-right: 20px;

            i {
              color: $secondaryLight;
            }
          }
        }

        .v-list-group__items {
          .v-list-item {
            .gear-handle {
              opacity: 0;
              transition: 0.2s opacity $cubicBezier;
            }

            &:hover {
              .gear-handle {
                cursor: grab;
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
</style>
