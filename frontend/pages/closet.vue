<template>
  <loading-page v-if="isLoading && !selectedPack" />
  <div
    v-else
    v-resize="onResize"
    class="closet-page-styles">
    <!-- Sidebar -->
    <closet-sidebar
      :is-mobile="isMobile"
      :packs="packs"
      :selected-pack="selectedPack"
      @handle-selected-pack="handleSelectedPack" />

    <!-- Content -->
    <div class="content-container">
      <v-container grid-list-lg>
        <div class="header mb-6">
          <h3 class="text-h3 font-weight-bold">
            {{ selectedPack ? selectedPack.name : '' }}
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
              close-on-content-click
              left
              nudge-bottom
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
                <v-list-item-group>
                  <v-list-item @click="packThemeModalOpen = true">
                    Change Pack Theme Colors
                  </v-list-item>
                  <v-list-item @click="resetPackModalOpen = true">
                    Reset Pack
                  </v-list-item>
                  <v-divider />
                  <v-list-item
                    :style="{color: '#db3030 !important'}"
                    @click="handleDeletePackModal">
                    Delete Pack
                  </v-list-item>
                  <!-- <v-list-item>
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
                      </v-list-item> -->
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>
        </div>
        <v-row class="closet-pack-graph-wrapper">
          <v-col class="wrapper col-12 col-md-6 col-lg-7">
            <selected-pack-graph
              v-if="selectedPack"
              v-resize="onResize"
              :chart-data="chartData"
              :is-mobile="isMobile"
              :styles="graphStyles"
              :theme="selectedPack.theme" />
          </v-col>
          <v-col class="wrapper col-12 col-md-6 col-lg-5">
            <totals-table :selected-pack="selectedPack" />
          </v-col>
        </v-row>

        <!-- Data Tables -->
        <closet-data-table :active-pack="selectedPack" />

        <!-- Share Pack List Modal -->
        <share-pack-list-modal
          v-model="shareListModalOpen"
          :list="list" />
      </v-container>
    </div>

    <pack-theme-modal
      v-model="packThemeModalOpen"
      :theme="localTheme"
      :theme-options="themeOptions"
      @handle-update="handleUpdatePackTheme" />

    <reset-pack-modal
      v-model="resetPackModalOpen"
      :pack="selectedPack" />

    <delete-confirm-modal
      v-model="deleteConfirmOpen"
      :item="modalItem"
      :selected-item="selectedPack"
      @handle-remove-item="handleDeletePack" />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import convert from 'convert-units';
  import { calculateCategoryWeight, convertToDollars, generateUUID } from '~/helpers/functions';
  import ClosetDataTable from '~/components/closet/ClosetDataTable.vue';
  import ClosetSidebar from '~/components/closet/ClosetSidebar.vue';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import isMobile from '~/mixins/isMobile';
  import LoadingPage from '~/components/LoadingPage.vue';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';
  import TotalsTable from '~/components/closet/TotalsTable.vue';
  import { generateThemeOptions } from '~/helpers';
  import { packService } from '~/services';
  import PACKS_QUERY from '~/apollo/queries/content/packs.gql';

  export default {
    name: 'Closet',

    mixins: [currentUser, isMobile],

    middleware: 'authenticated',

    apollo: {
      packs: {
        query: PACKS_QUERY,
        result ({ data: { packs } }) {
          this.selectedPack = packs[0];
        }
      }
    },

    data: () => ({
      chartData: {
        labels: null,
        datasets: null
      },
      chartHeight: 300,
      chartWidth: 500,
      deleteConfirmOpen: false,
      isMobile: true,
      isLoading: true,
      localTheme: '',
      lightGrey: '',
      list: {
        id: 1,
        title: 'Summer',
        uuid: generateUUID()
      },
      modalItem: '',
      packThemeModalOpen: false,
      resetPackModalOpen: false,
      selected: null,
      selectedPack: null,
      shareListModalOpen: false
    }),

    computed: {
      ...mapState({
        sidebarExpandOnHover: state => state.closet.sidebarExpandOnHover
      }),
      graphStyles () {
        return {
          height: `${this.chartHeight}px`,
          margin: '0 auto',
          position: 'relative',
          width: `${this.chartWidth}px`
        };
      },
      isSelected () {
        return this.selected === this.selectedPack;
      },
      themeOptions () {
        return generateThemeOptions();
      }
    },

    methods: {
      ...mapActions('closet', [
        'toggleSidebarExpandOnHover'
      ]),
      convertCurrency (amount) {
        return convertToDollars(amount);
      },
      handleDeletePack (pack) {
        const payload = { id: pack.id, apollo: this.$apollo };
        packService.destroy(payload);
      },
      handleDeletePackModal () {
        this.modalItem = 'pack';
        this.deleteConfirmOpen = true;
      },
      handleRemoveModalOpen (item) {
        this.modalItem = item;
        this.deleteConfirmOpen = true;
      },
      handleSelectedPack (pack) {
        this.selectedPack = pack;
      },
      handleUpdatePackTheme (theme) {
        this.localTheme = theme;
        this.packThemeModalOpen = false;

        const payload = {
          fields: { id: this.selectedPack.id, theme },
          apollo: this.$apollo
        };
        packService.update(payload);
      },
      onResize () {
        const width = window.innerWidth;
        if ((width < 560) || (width < 1264 && width > 959)) {
          this.chartWidth = 400;
          this.isMobile = true;
        } else {
          this.chartWidth = 500;
          this.isMobile = false;
        }
      },
      setChartData () {
        this.localTheme = this.selectedPack.theme;
        this.chartData.labels = this.selectedPack.categories.map(category => {
          return this.$options.filters.truncate(category.name, 20);
        });
        this.chartData.datasets = [{
          label: 'Selected Pack Graph',
          data: this.selectedPack.categories.map(category => {
            return convert(calculateCategoryWeight(category)).from('mg').to('lb').toFixed(2);
          })
        }];
      }
    },

    mounted () {
      this.lightGrey = this.$nuxt.$vuetify.theme.themes.light.grey7;
      this.onResize();
    },

    watch: {
      selectedPack (val) {
        this.setChartData();
      }
    },

    components: {
      ClosetDataTable,
      ClosetSidebar,
      CustomIcon,
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal'),
      LoadingPage,
      ResetPackModal: () => import(/* webpackPrefetch: true */ '~/components/modals/ResetPackModal'),
      PackThemeModal: () => import(/* webpackPrefetch: true */ '~/components/modals/PackThemeModal'),
      SelectedPackGraph,
      SharePackListModal: () => import(/* webpackPrefetch: true */ '~/components/modals/SharePackListModal.vue'),
      TotalsTable
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

            &.totals {
              .weight-column {
                align-items: center;
                display: flex;
                margin: 0 0 0 auto;
                width: 100%;

                .v-input {
                  margin: 0 0 0 10px;
                  max-width: 57px;

                  .v-select__selection {
                    margin-bottom: 0;
                    margin-top: 0;
                  }

                  .v-icon {
                    margin-top: 0;
                  }
                }
              }

              .price-total {
                display: flex;
                justify-content: center;
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
