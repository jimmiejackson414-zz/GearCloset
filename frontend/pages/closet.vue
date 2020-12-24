<template>
  <loading-page v-if="$apollo.loading" />
  <div
    v-else
    v-resize="onResize"
    class="closet-page-styles">
    <!-- Sidebar -->
    <closet-sidebar
      :is-mobile="isMobile"
      :packs="packs"
      :selected-pack-id="selectedPackId"
      @handle-selected-pack="handleSelectedPack" />

    <!-- Content -->

    <div class="content-container">
      <loading-page v-if="loadingPack" />
      <v-container
        v-else
        grid-list-lg>
        <div class="header mb-6">
          <h3 class="text-h3 font-weight-bold">
            {{ selectedPack.name || '' }}
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
                  class="settings-btn"
                  depressed
                  icon
                  :ripple="false"
                  text
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
            <totals-table
              v-if="selectedPack && selectedPack.categories"
              :selected-pack="selectedPack" />
          </v-col>
        </v-row>

        <!-- Data Tables -->
        <closet-data-table :active-pack="selectedPack" />
      </v-container>
    </div>

    <!-- Modals -->
    <share-pack-list-modal
      v-model="shareListModalOpen"
      :list="list" />

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
  import { calculateCategoryWeight, generateUUID } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import { generateThemeOptions } from '~/helpers';
  import isMobile from '~/mixins/isMobile';
  import { packService } from '~/services';
  import PACKS_QUERY from '~/apollo/queries/content/packs.gql';
  import SELECTED_PACK_QUERY from '~/apollo/queries/content/pack.gql';

  export default {
    name: 'ClosetPage',

    mixins: [currentUser, isMobile],

    middleware: 'authenticated',

    apollo: {
      packs: {
        query: PACKS_QUERY,
        result ({ data: { packs } }) {
          this.selectedPackId = packs.length ? packs[0].id : null;
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
      lightGrey: '',
      list: { // TODO: Generate dynamically instead of hard-coded
        id: 1,
        title: 'Summer',
        uuid: generateUUID()
      },
      loadingPack: false,
      localTheme: '',
      modalItem: '',
      packThemeModalOpen: false,
      resetPackModalOpen: false,
      selectedPackId: null,
      selectedPack: {},
      shareListModalOpen: false
    }),

    computed: {
      ...mapState({
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
      themeOptions () {
        return generateThemeOptions();
      }
    },

    methods: {
      ...mapActions('closet', [
        'toggleSidebarExpandOnHover'
      ]),
      async fetchPack (id) {
        this.loadingPack = true;
        const { data } = await this.$apollo.query({
          query: SELECTED_PACK_QUERY,
          variables: { id }
        });
        this.selectedPack = data.selectedPack;
        this.loadingPack = false;
      },
      async handleDeletePack (pack) {
        const payload = { id: pack.id, apollo: this.$apollo };
        await packService.destroy(payload);
      },
      handleDeletePackModal () {
        this.modalItem = 'pack';
        this.deleteConfirmOpen = true;
      },
      handleSelectedPack (pack) {
        this.selectedPackId = pack.id;
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
      selectedPackId (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadingPack = true;
          this.fetchPack(newVal);
        }
      },
      selectedPack (val) {
        this.setChartData();
      }
    },

    components: {
      ClosetDataTable: () => import(/* webpackPrefetch: true */ '~/components/closet/ClosetDataTable.vue'),
      ClosetSidebar: () => import(/* webpackPrefetch: true */ '~/components/closet/ClosetSidebar.vue'),
      CustomIcon: () => import(/* webpackPrefetch: true */ '~/components/icons/CustomIcon.vue'),
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal'),
      LoadingPage: () => import(/* webpackPrefetch: true */ '~/components/LoadingPage.vue'),
      SelectedPackGraph: () => import(/* webpackPrefetch: true */ '~/components/graphs/SelectedPackGraph.vue'),
      TotalsTable: () => import(/* webpackPrefetch: true */ '~/components/closet/TotalsTable.vue'),
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
