<template>
  <sidebar-wrapper>
    <!-- Search Container -->
    <div class="search-container">
      <v-text-field
        v-model="searchQuery"
        background-color="#fff"
        clearable
        dense
        flat
        hide-details
        label="Search"
        placeholder="Search"
        solo-inverted
        @click:append="clearSearch">
        <template v-slot:prepend-inner>
          <custom-icon
            fill="#4a4a4a"
            height="20px"
            name="search"
            width="20px" />
        </template>
      </v-text-field>
    </div>

    <!-- Packs Container -->
    <div class="wrapper">
      <div class="header">
        <div class="header-divider">
          <h6 class="text-h6">
            My Packs
          </h6>
          <v-tooltip
            max-width="300"
            right>
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on">
                <custom-icon
                  fill="rgba(0, 0, 0, 0.25)"
                  height="20px"
                  name="info-circle"
                  width="20px" />
              </span>
            </template>
            <span>Create a new pack list or modify an existing one.</span>
          </v-tooltip>
        </div>
        <v-btn
          icon
          :ripple="false"
          @click="createPackModalOpen = true">
          <custom-icon
            :fill="darkGrey"
            height="35px"
            name="plus-circle"
            width="35px" />
        </v-btn>
      </div>
      <v-list v-if="packs.length">
        <transition-group
          mode="in-out"
          name="fade">
          <v-list-item
            v-for="pack in filteredPacks()"
            :key="pack.id"
            :class="{ selected: activeSelection(pack.id) }"
            :ripple="false"
            @click="handleSelectedPack(pack)">
            <v-list-item-content>
              <p class="mb-0 font-weight-medium">
                {{ pack.name }}
              </p>
            </v-list-item-content>
          </v-list-item>
        </transition-group>
      </v-list>
      <p v-else>
        You haven't created any packs yet!
      </p>
    </div>

    <!-- Items Container -->
    <div
      v-if="categories"
      class="wrapper">
      <div class="header">
        <div class="header-divider">
          <h6 class="text-h6">
            My Gear
          </h6>
          <v-tooltip
            max-width="300"
            right>
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on">
                <custom-icon
                  fill="rgba(0, 0, 0, 0.25)"
                  height="20px"
                  name="info-circle"
                  width="20px" />
              </span>
            </template>
            <span>Add a new piece of gear to your closet, or add one to the selected pack.</span>
          </v-tooltip>
        </div>
        <v-btn
          icon
          :ripple="false"
          @click="createItemModalOpen = true">
          <custom-icon
            :fill="darkGrey"
            height="35px"
            name="plus-circle"
            width="35px" />
        </v-btn>
      </div>
      <v-list>
        <v-list-group
          v-for="category in categories"
          :key="category.id"
          eager
          :ripple="false"
          :value="true">
          <template v-slot:activator>
            <v-list-item-title class="font-weight-medium mb-0">
              {{ category.name }}
            </v-list-item-title>
          </template>
          <transition-group
            mode="in-out"
            name="fade">
            <v-list-item
              v-for="item in filteredItems(category)"
              :key="item.id"
              class="pointer"
              dense
              :ripple="false">
              <custom-icon
                custom-class="gear-handle mr-2"
                fill="#4a4a4a"
                height="20px"
                name="grip-horizontal-line"
                width="20px" />
              <p class="mb-0">
                {{ item.name }}
              </p>
            </v-list-item>
          </transition-group>
        </v-list-group>
      </v-list>
    </div>
    <p v-else>
      You haven't added any items or categories yet!
    </p>
  </sidebar-wrapper>
</template>

<script>
  // import { sortBy } from 'lodash';
  import currentUser from '~/mixins/currentUser';
  import SidebarWrapper from '~/components/SidebarWrapper.vue';

  export default {
    mixins: [currentUser],

    data: () => ({
      createItemModalOpen: false,
      createPackModalOpen: false,
      darkGrey: '',
      searchQuery: ''
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
      this.darkGrey = $nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      SidebarWrapper
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/colors';

  .search-container {
    border-bottom: 1px solid $dark-grey;

    .wrapper {
      border-bottom: 1px solid $dark-grey;
      padding-bottom: 1rem;
    }
  }
</style>

<style lang="scss">
  @import '~/css/colors';

  .search-container {
    padding-bottom: 1rem;

    .v-input {
      &.v-input--is-focused {
        .v-input__slot {
          input {
            color: $dark-grey !important;
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

      .v-list-group {
        .v-list-group__header {
          .v-list-item__title {
            color: $dark-grey;
            font-size: 1rem;
            font-weight: 600;
          }
          .v-list-item__icon {
            i {
              color: $dark-grey !important;
            }
          }
        }

        .v-list-group__items {
          .v-list-item {
            .gear-handle {
              opacity: 0;
              transition: 0.2s opacity $cubic-bezier;
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
