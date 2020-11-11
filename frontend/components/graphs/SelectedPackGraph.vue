<template>
  <client-only>
    <apexchart
      :height="height"
      :options="chartOptions"
      :series="series"
      type="donut"
      width="100%" />
  </client-only>
</template>

<script>
  import { calculateCategoryWeight } from '~/helpers/functions';

  export default {
    props: {
      height: {
        type: Number,
        default: () => 300
      },
      selectedPack: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        chartOptions: {
          chart: {
            id: 'selected-pack-graph',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 400,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          labels: [],
          dataLabels: {
            enabled: true,
            formatter (value, { seriesIndex, dataPointIndex, w }) {
              return `${w.config.series[seriesIndex]} oz`;
            },
            style: {
              fontFamily: 'Avenir Next, Lato, Roboto, Helvetica Neue'
            }
          },
          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '20px',
                    fontFamily: 'Avenir Next, Lato, Roboto, Helvetica Neue, sans-serif',
                    fontWeight: 700
                  },
                  value: {
                    show: true,
                    fontFamily: 'Avenir Next, Lato, Roboto, Helvetica Neue, sans-serif',
                    formatter (val) {
                      return `${val} lbs`;
                    }
                  }
                }
              }
            }
          },
          theme: {
            // palette: 'palette1' // default theme
            monochrome: {
              enabled: true,
              color: '',
              shadeTo: 'light',
              shadeIntensity: 0.65
            }
          },
          tooltip: {
            enabled: false
          }
        },
        series: []
      };
    },

    methods: {
      // chart doesn't load correctly when being updated
      updateChart () {
        if (this.selectedPack) {
          this.series = this.selectedPack.categories.map(category => calculateCategoryWeight(category).toFixed(0));
          this.chartOptions.labels = this.selectedPack.categories.map(category => category.name);
        }
      }
    },

    created () {
      this.chartOptions.theme.monochrome.color = this.$nuxt.$vuetify.theme.themes.light.accentDarkest;
      this.updateChart();
    },

    watch: {
      selectedPack () {
        this.updateChart();
      }
    }
  };
</script>

<style lang="scss">
</style>
