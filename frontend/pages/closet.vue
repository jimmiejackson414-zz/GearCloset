<template>
  <div
    v-resize="onResize"
    class="closet-page-styles">
    <!-- Sidebar -->
    <closet-sidebar
      :is-mobile="isMobile"
      :packs="packs" />

    <!-- Content -->
    <div class="content-container">
      <v-container grid-list-lg>
        <div class="header mb-6">
          <h3 class="text-h3 font-weight-bold">
            {{ activePack.name }}
          </h3>
          <div class="actions">
            <div class="share-wrapper">
              <v-btn
                class="share-btn"
                icon
                :ripple="false"
                @click="shareListModalOpen = true">
                <custom-icon
                  :fill="lightGrey"
                  :height="20"
                  name="share"
                  :width="20" />
                <p class="body-2 mb-0 grey7--text">
                  Share
                </p>
              </v-btn>
            </div>
            <!-- Options Button -->
            <v-menu
              v-if="!isMobile"
              :close-on-content-click="false"
              nudge-bottom
              offset-x
              offset-y>
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  depressed
                  icon
                  :ripple="false"
                  v-on="on">
                  <custom-icon
                    :fill="lightGrey"
                    :height="25"
                    name="setting"
                    :width="25" />
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-switch
                    class="ma-0"
                    color="accent"
                    flat
                    hide-details
                    inset
                    :ripple="false"
                    :value="!sidebarExpandOnHover"
                    @change="toggleSidebarExpandOnHover">
                    <template #label>
                      <p class="body-text-1 mb-0">
                        Lock sidebar
                      </p>
                    </template>
                  </v-switch>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <v-row class="closet-pack-graph-wrapper">
          <v-col class="wrapper col-12 col-md-6 offset-md-3">
            <selected-pack-graph :height="300" />
          </v-col>
        </v-row>

        <!-- Data Tables -->
        <closet-data-table
          :active-pack="activePack" />

        <!-- Share Pack List Modal -->
        <share-pack-list-modal
          v-model="shareListModalOpen"
          :list="list" />
      </v-container>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import ClosetDataTable from '~/components/closet/ClosetDataTable.vue';
  import ClosetSidebar from '~/components/closet/ClosetSidebar.vue';
  import { convertToDollars, generateUUID } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import isMobile from '~/mixins/isMobile';
  import packsQuery from '~/apollo/queries/content/packs.gql';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';

  export default {
    name: 'Closet',

    mixins: [currentUser, isMobile],

    middleware: 'authenticated',

    apollo: {
      packs: {
        prefetch: false,
        fetchPolicy: 'network-only',
        query: packsQuery,
        update (data) {
          console.log({ data });
        }
      }
    },

    data: () => ({
      deleteConfirmOpen: false,
      lightGrey: '',
      list: {
        id: 1,
        title: 'Summer',
        uuid: generateUUID()
      },
      selectedItem: null,
      shareListModalOpen: false
    }),

    computed: {
      ...mapState({
        sidebarExpandOnHover: state => state.closet.sidebarExpandOnHover
      }),
      activePack () {
        if (this.packs?.length) {
          return this.packs.find(pack => pack.active);
        }
        return {};
      }
    },

    methods: {
      ...mapActions('closet', [
        'toggleSidebarExpandOnHover'
      ]),
      convertCurrency (amount) {
        return convertToDollars(amount);
      },
      handleRemoveModalOpen (item) {
        this.selectedItem = item;
        this.deleteConfirmOpen = true;
      },
      update (item, field, value) {
        const payload = { id: item.id, [field]: value };
        console.log('update payload: ', payload);
        // await itemService.update(payload);
      },
      updateBooleanItem (item, action) {
        // if (action === 'consumable' || action === 'worn') { item[action] = !item[action]; }
        this.update(item, action, item[action]);
      }

    },

    mounted () {
      this.lightGrey = this.$nuxt.$vuetify.theme.themes.light.grey7;
    },

    components: {
      ClosetDataTable,
      ClosetSidebar,
      CustomIcon,
      SelectedPackGraph,
      SharePackListModal: () => import(/* webpackPrefetch: true */ '~/components/modals/SharePackListModal.vue')
    },

    head () {
      return {
        title: 'Closet'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .closet-page-styles {
    display: flex;
    height : 100%;

    .content-container {
      padding-left: 56px;
      width: 100%;

      @include breakpoint(smallDisplay) {
        padding-left: 0;
      }

      .header {
        align-items    : center;
        display        : flex;
        justify-content: space-between;

        .actions {
          align-items: center;
          display: flex;
          margin-right: 0;

          @include breakpoint(smallDisplay) {
            margin-right: 2rem;
          }

          .share-wrapper {
            display: flex;
            margin-right: 2rem;

            .share-btn {
              p, svg {
                transition: 0.2s color ease-in-out;
              }

              &:hover {
                p {
                  color: $primary;
                }

                svg {
                  fill: $primary;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .closet-page-styles {
    .content-container {
      .items-list-styles {
        .categories-container {
          &.last {
            border-bottom: 1px solid $grey5;
            padding-bottom: 24px;
          }
        }

        .items-table-container {
          tr {
            td {
              padding: 0 4px;

              .price-column {
                .click-to-edit {
                  .v-input__slot {
                    input {
                      text-align: center;
                    }
                  }
                }
              }

              .weight-column {
                display: grid;
                grid-template-columns: auto minmax(auto, 57px);

                .v-select {
                  .v-input__slot {
                    &:before, &:after {
                      border: none;
                    }
                  }
                }

                .click-to-edit {
                  .v-input__slot {
                    input {
                      text-align: right;
                    }
                  }
                }
              }

              .v-btn {
                &.active {
                  &.worn-btn {
                    background-color: $accentDarkest;
                    svg {
                      fill: white;
                    }
                  }

                  &.consumable-btn {
                    background-color: darken($secondaryLight, 10%);

                    svg {
                      fill: white;
                    }
                  }
                }

                &.remove {
                  svg {
                    fill: $error;
                  }
                }
              }

              &:last-child svg, &:first-child svg {
                opacity   : 0;
                transition: 0.2s opacity $cubicBezier;
              }
            }

            &:hover {
              td:first-child svg, td:last-child svg {
                opacity: 1;
              }
            }
          }

          .new-category-container {
            border-top: 1px solid $grey5;
          }
        }
      }
    }
  }
</style>
