<template>
  <div class="widget-wrapper">
    <div class="content-wrapper">
      <div
        class="widget-header">
        <div class="text-h6">
          Selected Pack: <span class="font-weight-regular">{{ packName }}</span>
        </div>
        <ellipsis-button
          :items="ellipsisItems"
          @change-pack="modalOpen = true"
          @change-theme="packThemeModalOpen = true" />
      </div>
      <div
        v-if="packState === 'SHOW_GRAPH' && chartData.labels && chartData.datasets"
        class="selected-pack-wrapper">
        <selected-pack-graph
          v-resize="onResize"
          :chart-data="chartData"
          :is-mobile="isMobile"
          :styles="graphStyles"
          :theme="localTheme" />
      </div>
      <p
        v-else-if="packState === 'ADD_CATEGORIES'"
        class="body-text-1">
        You haven't added anything to this pack yet! Head over to your <nuxt-link :to="{ name: 'closet' }">
          Closet
        </nuxt-link> to modify this pack.
      </p>
      <p
        v-else
        class="body-text-1">
        You haven't added a pack to this trip yet! Click on the dots in the top right to get started.
      </p>
    </div>

    <select-pack-modal
      v-model="modalOpen"
      :trip="trip"
      @handle-reset-modal="resetModal" />

    <pack-theme-modal
      v-model="packThemeModalOpen"
      :theme="localTheme"
      :theme-options="themeOptions"
      @handle-update="handleUpdatePackTheme" />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import convert from 'convert-units';
  import { calculateCategoryWeight } from '~/helpers/functions';
  import { generateThemeOptions } from '~/helpers';
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';
  import Trip from '~/database/models/trip';

  export default {
    data () {
      return {
        chartData: {
          labels: null,
          datasets: null
        },
        chartHeight: 300,
        chartWidth: 500,
        ellipsisItems: [
          { title: 'Change Selected Pack', event: 'change-pack' },
          { title: 'Change Pack Theme Colors', event: 'change-theme' }
        ],
        isMobile: true,
        loading: 0,
        localTheme: '',
        modalOpen: false,
        packThemeModalOpen: false
      };
    },

    computed: {
      ...mapState({
        selectedTripId: state => state.entities.trips.selectedTripId
      }),
      activePack () {
        if (!this.trip) { return null; }
        return this.trip.pack;
      },
      graphStyles () {
        return {
          height: `${this.chartHeight}px`,
          margin: '0 auto',
          position: 'relative',
          width: `${this.chartWidth}px`
        };
      },
      packName () {
        return this.trip?.pack?.name || 'None selected';
      },
      packState () {
        if (!this.activePack) {
          return 'ADD_PACK';
        } else if (this.activePack && !this.activePack?.categories?.length) {
          return 'ADD_CATEGORIES';
        }
        return 'SHOW_GRAPH';
      },
      themeOptions () {
        return generateThemeOptions();
      },
      trip () {
        return Trip.query().whereId(this.selectedTripId).with('pack.categories.items').first();
      }
    },

    methods: {
      ...mapActions('entities/packs', [
        'updatePack'
      ]),
      handleUpdatePackTheme (theme) {
        this.localTheme = theme;
        this.packThemeModalOpen = false;

        const payload = { variables: { id: this.activePack.id, theme } };
        this.update(payload);
      },
      resetModal () {
        this.modalOpen = false;
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
        if (this.activePack) {
          this.localTheme = this.activePack.theme;
          this.chartData.labels = this.activePack.categories.map(category => {
            return this.$options.filters.truncate(category.name, 20);
          });
          this.chartData.datasets = [{
            label: 'Selected Pack Graph',
            data: this.activePack.categories.map(category => {
              return parseFloat(convert(calculateCategoryWeight(category)).from('g').to(category.unit)).toFixed(2);
            })
          }];
        }
      },
      triggerRerender () {
        this.setChartData();
      }
    },

    mounted () {
      this.onResize();
      if (this.activePack) {
        this.setChartData();
      }
    },

    // TODO: This watch rerenders the chart on change of unrelated events, such as adding/removing a Trip Detail
    // Will need to modify so that only rerenders when category or item is modified.
    // watch: {
    //   trip (val, oldVal) {
    //     if (val !== oldVal) {
    //       this.setChartData();
    //     }
    //   }
    // },

    components: {
      EllipsisButton,
      PackThemeModal: () => import(/* webpackPrefetch: true */ '~/components/modals/PackThemeModal'),
      SelectedPackGraph,
      SelectPackModal: () => import(/* webpackPrefetch: true */ '~/components/modals/SelectPackModal')
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
</style>
