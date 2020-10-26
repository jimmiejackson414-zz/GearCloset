<template>
  <div class="closet-page-styles">
    <!-- Sidebar -->
    <closet-sidebar />

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
                  fill="#4a4a4a"
                  height="20px"
                  name="share"
                  width="20px" />
                <p class="body-2 mb-0">
                  Share
                </p>
              </v-btn>
            </div>
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
  import ClosetDataTable from '~/components/closet/ClosetDataTable.vue';
  import ClosetSidebar from '~/components/closet/ClosetSidebar.vue';
  import { convertToDollars, generateUUID } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';
  import SharePackListModal from '~/components/modals/SharePackListModal.vue';

  export default {
    name: 'Closet',

    mixins: [currentUser],

    data: () => ({
      deleteConfirmOpen: false,
      list: {
        id: 1,
        title: 'Summer',
        uuid: generateUUID()
      },
      selectedItem: null,
      shareListModalOpen: false
    }),

    computed: {
      activePack () {
        return this.currentUser.packs.find(pack => pack.active);
      }
    },

    methods: {
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

    components: {
      ClosetDataTable,
      ClosetSidebar,
      CustomIcon,
      SelectedPackGraph,
      SharePackListModal
    },

    head () {
      return {
        title: 'Closet'
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/colors';

  .closet-page-styles {
    display: flex;
    height : 100%;

    .content-container {
      width: 100%;

      .header {
        align-items    : center;
        display        : flex;
        justify-content: space-between;

        .actions {
          margin-right: 2rem;

          .share-wrapper {
            display: flex;

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
  @import '~/css/colors';

  .closet-page-styles {
    .content-container {
      .items-list-styles {
        .categories-container {
          &.last {
            border-bottom: 1px solid $light-grey;
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
                    background-color: $success;
                    svg {
                      fill: white;
                    }
                  }

                  &.consumable-btn {
                    background-color: $warning;

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
                transition: 0.2s opacity $cubic-bezier;
              }
            }

            &:hover {
              td:first-child svg, td:last-child svg {
                opacity: 1;
              }
            }
          }

          .new-category-container {
            border-top: 1px solid $light-grey;
          }
        }
      }
    }
  }
</style>
