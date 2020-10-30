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
        <template #prepend-inner>
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
          <h6 class="text-h6 white--text">
            My Packs
          </h6>
          <v-tooltip
            max-width="300"
            right>
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on">
                <custom-icon
                  :fill="secondaryLight"
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
            fill="#fff"
            height="35px"
            name="plus-circle"
            width="35px" />
        </v-btn>
      </div>
      <v-list
        v-if="packs.length"
        class="packs-list mb-4">
        <transition-group
          mode="in-out"
          name="fade">
          <v-list-item
            v-for="pack in filteredPacks()"
            :key="pack.id"
            :class="[{ selected: activeSelection(pack.id) }, 'pr-8 pl-12' ]"
            :ripple="false"
            @click="handleSelectedPack(pack)">
            <v-list-item-content>
              <p class="mb-0 font-weight-medium white--text">
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
          <h6 class="text-h6 white--text">
            My Gear
          </h6>
          <v-tooltip
            max-width="300"
            right>
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on">
                <custom-icon
                  :fill="secondaryLight"
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
            fill="#fff"
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
          <template #activator>
            <v-list-item-content class="pl-8 pr-8">
              <v-list-item-title class="font-weight-medium mb-0 white--text">
                {{ category.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <transition-group
            mode="in-out"
            name="fade">
            <v-list-item
              v-for="item in filteredItems(category)"
              :key="item.id"
              class="pointer px-10"
              dense
              :ripple="false">
              <custom-icon
                custom-class="gear-handle mr-2"
                :fill="secondaryLight"
                height="20px"
                name="grip-horizontal-line"
                width="20px" />
              <p class="mb-0 white--text">
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
    },

    components: {
      SidebarWrapper
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
