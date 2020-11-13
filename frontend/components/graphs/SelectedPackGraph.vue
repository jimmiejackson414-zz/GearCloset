<template>
  <client-only>
    <div v-resize="resize">
      <div
        ref="currentPackChart"
        :style="chartStyles" />
    </div>
  </client-only>
</template>

<script>
  import convert from 'convert-units';
  import echarts from 'echarts';
  import theme from './chart-theme.json';
  import { calculateCategoryWeight } from '~/helpers/functions';

  echarts.registerTheme('custom-theme', theme);

  export default {
    props: {
      selectedPack: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        chartInstance: null,
        chartLegend: {
          orient: 'vertical',
          x: 'right',
          type: 'scroll',
          top: 20,
          bottom: 20,
          left: 0
        },
        chartStyles: 'width: 100%; height: 400px',
        otherChartStyles: {
          center: ['75%', '50%']
        },
        windowSize: {
          x: 0,
          y: 0
        }
      };
    },

    methods: {
      resize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        if (this.windowSize.x < 850) {
          this.chartLegend = {
            orient: 'horizontal',
            x: 'center',
            type: 'scroll',
            top: 0,
            bottom: 0,
            left: 0
          };
          this.otherChartStyles.center = ['50%', '50%'];
          this.chartStyles = 'width: 100%; height: 200px';
        } else {
          this.chartLegend = {
            orient: 'vertical',
            x: 'right',
            type: 'scroll',
            top: 20,
            bottom: 20,
            left: 0
          };
          this.otherChartStyles.center = ['75%', '50%'];
        }
        if (this.chartInstance) {
          this.chartInstance.resize();
          this.setChart();
        }
      },
      setChart () {
        const packRef = this.$refs.currentPackChart;
        const currentPackChart = echarts.init(packRef, 'custom-theme');
        this.chartInstance = currentPackChart;
        const data = this.selectedPack.categories.map(category => ({
          value: parseFloat(convert(calculateCategoryWeight(category)).from('g').to('lb')).toFixed(2),
          name: this.$options.filters.truncate(category.name, 25)
        }));

        // specify chart configuration item and data
        const option = {
          tooltip: {
            show: false
          },
          legend: this.chartLegend,
          series: [
            {
              name: 'Category',
              type: 'pie',
              center: this.otherChartStyles.center,
              radius: ['50%', '70%'],
              avoidLabelOverlap: true,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '15',
                    color: '#4a4a4a'
                  }
                },
                formatter: '{b}: {d}'
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data,
              itemStyle: {
                normal: {
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    formatter: '{b}\n{c} lbs'
                  }
                }
              },
              selectedMode: true
            }
          ]
        };

        // use configuration item and data specified to show chart
        currentPackChart.setOption(option);
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.resize();
        this.setChart();
      });
    },

    watch: {
      selectedPack () {
        this.setChart();
      }
    },

    components: {
    }
  };
</script>

<style lang="scss">
  .chart-wrapper {
    position: relative;

    .selected-pack-graph {
      svg {
        g {
          cursor: pointer;
        }
      }

    }

    .overlay-label {
      height: 200px;
      left: 188px;
      position: absolute;
      text-align: center;
      top: 175px;
      width: 200px;

      .category-name {
      }

      .category-weight {
        font-weight: bold;
      }
    }
  }

</style>
