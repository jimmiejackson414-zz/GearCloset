<template>
  <apexchart
    :height="height"
    :options="chartOptions"
    :series="series"
    type="donut"
    width="100%" />
</template>

<script>
  export default {
    props: {
      height: {
        type: Number,
        default: () => 300
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
            },
            // doesn't work at this point
            states: {
              active: {
                filter: {
                  type: 'none'
                }
              }
            }
          },
          labels: ['Kitchen', 'Big 3', 'Water', 'Clothing'],
          dataLabels: {
            enabled: true,
            formatter (value, { seriesIndex, dataPointIndex, w }) {
              return `${w.config.series[seriesIndex]} lbs`;
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
              // color: $nuxt.$vuetify.theme.themes.light.primary, // wtf is happening?!?
              shadeTo: 'light',
              shadeIntensity: 0.65
            }
          },
          tooltip: {
            enabled: false
          }
        },
        series: [44, 55, 41, 17]
      };
    }
  };
</script>

<style lang="scss">
</style>
