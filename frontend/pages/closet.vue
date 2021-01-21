<template>
  <div class="page-wrapper">
    <loading-page v-if="isLoading" />

    <div
      v-else
      v-resize.quiet="onResize"
      class="closet-page-styles">
      <!-- Sidebar -->
      <closet-sidebar
        :is-mobile="isMobile"
        :packs="packs"
        :selected-pack-id="selectedPackId"
        @handle-delete-item="handleDeleteItemModal"
        @handle-selected-pack="handleSelectedPack" />

      <!-- Content -->

      <div class="content-container">
        <loading-page v-if="loadingPack" />
        <v-container
          v-else
          grid-list-lg>
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
                  @click="handleSharePackListModal">
                  <client-only>
                    <unicon
                      :fill="lightGrey"
                      height="20"
                      name="share"
                      width="20" />
                  </client-only>
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
                    class="settings-btn"
                    depressed
                    icon
                    :ripple="false"
                    text
                    v-on="on">
                    <unicon
                      :fill="lightGrey"
                      height="25"
                      name="setting"
                      width="25" />
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
                :chart-data="chartData"
                :is-mobile="isMobile"
                :styles="graphStyles"
                :theme="selectedPack.theme" />
            </v-col>
            <v-col class="wrapper col-12 col-md-6 col-lg-5">
              <totals-table
                v-if="selectedPack && selectedPack.categories"
                :selected-pack="selectedPack" />
            </v-col>
          </v-row>

          <!-- Data Tables -->
          <closet-data-table
            v-if="selectedPack"
            :active-pack="selectedPack"
            @handle-delete-category="handleDeleteCategoryModal" />
        </v-container>
      </div>

      <!-- Modals -->
      <share-pack-list-modal
        v-model="shareListModalOpen"
        :pack-list="packList" />

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
        :selected-item="deleteItem"
        @handle-remove-item="handleDelete" />
    </div>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import { mapActions, mapMutations, mapState } from 'vuex';
  import convert from 'convert-units';
  import { calculateCategoryWeight, generateUUID } from '~/helpers/functions';
  import { generateThemeOptions } from '~/helpers';
  import isMobile from '~/mixins/isMobile';
  import ClosetDataTable from '~/components/closet/ClosetDataTable.vue';
  import ClosetSidebar from '~/components/closet/ClosetSidebar.vue';
  import LoadingPage from '~/components/LoadingPage.vue';
  import Pack from '~/database/models/pack';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';
  import TotalsTable from '~/components/closet/TotalsTable.vue';

  export default {
    name: 'ClosetPage',

    mixins: [isMobile],

    middleware: 'authenticated',

    async fetch () {
      await this.fetchPacks();
      if (this.packs.length) {
        this.$store.commit('entities/packs/setSelectedPackId', this.packs[0].id);
        this.setChartData();
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
      deleteItem: null,
      isMobile: true,
      lightGrey: '',
      packList: {},
      loadingPack: 0,
      localTheme: '',
      modalItem: '',
      packThemeModalOpen: false,
      resetPackModalOpen: false,
      shareListModalOpen: false
    }),

    computed: {
      ...mapState({
        isLoading: state => state.entities.packs.isLoading,
        selectedPackId: state => state.entities.packs.selectedPackId,
        sidebarExpandOnHover: state => state.closet.sidebarExpandOnHover
      }),
      graphStyles () {
        return {
          returnheight: `${this.chartHeight}px`,
          margin: '0 auto',
          position: 'relative',
          width: `${this.chartWidth}px`
        };
      },
      packs: () => Pack.query().with('categories.items').all(),
      selectedPack () {
        return Pack.selectedPack();
      },
      themeOptions () {
        return generateThemeOptions();
      }
    },

    methods: {
      ...mapActions('closet', [
        'toggleSidebarExpandOnHover'
      ]),
      ...mapActions('entities/packs', [
        'destroyPack',
        'fetchPacks',
        'updatePack'
      ]),
      ...mapActions('entities/categories', [
        'destroyCategory'
      ]),
      ...mapActions('entities/items', [
        'destroyItem'
      ]),
      handleDelete (data) {
        switch (this.modalItem) {
        case 'pack':
          this.handleDeletePack(data);
          break;
        case 'category':
          this.handleDeleteCategory(data);
          break;
        case 'item':
          this.handleDeleteItem(data);
          break;
        default:
          break;
        }
      },
      handleDeleteCategory (category) {
        const payload = { variables: { category } };
        this.destroyCategory(payload);
      },
      handleDeleteCategoryModal (category) {
        this.deleteItem = category;
        this.modalItem = 'category';
        this.deleteConfirmOpen = true;
      },
      handleDeleteItemModal (item) {
        this.deleteItem = item;
        this.modalItem = 'item';
        this.deleteConfirmOpen = true;
      },
      async handleDeleteItem (item) {
        const payload = { variables: { item, pack_id: this.selectedPackId } };
        await this.destroyItem(payload);
      },
      async handleDeletePack (pack) {
        const payload = { variables: { id: pack.id } };
        await this.destroyPack(payload);
      },
      handleDeletePackModal () {
        this.modalItem = 'pack';
        this.deleteItem = this.selectedPack;
        this.deleteConfirmOpen = true;
      },
      handleSelectedPack (pack) {
        this.selectedPackId = pack.id;
      },
      handleSharePackListModal () {
        this.packList = {
          ...this.selectedPack,
          uuid: generateUUID()
        };
        this.shareListModalOpen = true;
      },
      async handleUpdatePackTheme (theme) {
        this.localTheme = theme;
        this.packThemeModalOpen = false;

        const payload = { variables: { id: this.selectedPack.id, theme } };
        await this.updatePack(payload);
      },
      onResize () {
        console.log('onResize');
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
            return parseFloat(convert(calculateCategoryWeight(category)).from('g').to(category.unit)).toFixed(2);
          })
        }];
      }
    },

    mounted () {
      this.lightGrey = this.$nuxt.$vuetify.theme.themes.light.grey7;
    },

    watch: {
      selectedPack (val) {
        this.setChartData();
      }
    },

    components: {
      ClosetDataTable,
      ClosetSidebar,
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal'),
      LoadingPage,
      SelectedPackGraph,
      TotalsTable,
      ResetPackModal: () => import(/* webpackPrefetch: true */ '~/components/modals/ResetPackModal'),
      PackThemeModal: () => import(/* webpackPrefetch: true */ '~/components/modals/PackThemeModal'),
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
    height: 100%;

    .content-container {
      padding-left: 56px;
      width: 100%;

      .header {
        align-items: center;
        display: flex;
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
              background-color: transparent;

              p, svg {
                transition: 0.2s color ease-in-out;
              }

              &:hover {
                p {
                  color: $primary !important;
                }
              }
            }
          }

          .settings-btn {
            background-color: transparent;
          }
        }
      }
    }
  }
</style>
