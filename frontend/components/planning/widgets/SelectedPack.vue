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
          :options="chartOptions"
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
  import convert from 'convert-units';
  import { calculateCategoryWeight } from '~/helpers/functions';
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  // import Pack from '~/data/models/pack';
  import PackThemeModal from '~/components/modals/PackThemeModal.vue';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';
  import { generateThemeOptions } from '~/helpers';

  export default {
    props: {
      trip: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        chartData: {
          labels: null,
          datasets: null
        },
        chartHeight: 300,
        chartOptions: {
          cutoutPercentage: 75,
          legend: {
            display: true,
            position: 'right'
          },
          plugins: {
            colorschemes: {
              scheme: this.localTheme,
              override: true
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: false
          }
        },
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
      }
    },

    methods: {
      handleUpdatePackTheme (theme) {
        this.localTheme = theme;
        this.packThemeModalOpen = false;
        // const pack = await Pack.update({
        //   where: Number(this.activePack.id),
        //   data: {
        //     theme: this.localTheme
        //   }
        // });
        // pack.$push();
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
      }
    },

    mounted () {
      this.onResize();
      if (this.activePack) {
        this.localTheme = this.activePack.theme;
        this.chartData.labels = this.activePack.categories.map(category => {
          return this.$options.filters.truncate(category.name, 20);
        });
        this.chartData.datasets = [{
          label: 'Selected Pack Graph',
          data: this.activePack.categories.map(category => {
            return parseFloat(convert(calculateCategoryWeight(category)).from('g').to('oz')).toFixed(2);
          })
        }];
      }
    },

    watch: {
      localTheme (val) {
        if (val) {
          this.chartOptions.plugins.colorschemes.scheme = val;
        }
      }
    },

    components: {
      EllipsisButton,
      PackThemeModal,
      SelectedPackGraph,
      SelectPackModal: () => import(/* webpackPrefetch: true */ '~/components/modals/SelectPackModal')
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
</style>
