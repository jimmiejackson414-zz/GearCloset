<script>
  import { Doughnut, mixins } from 'vue-chartjs';
  import Chart from 'chart.js';
  import 'chartjs-plugin-colorschemes';
  const { reactiveProp } = mixins;

  export default {
    extends: Doughnut,

    mixins: [reactiveProp],

    props: {
      isMobile: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        default: ''
      }
    },

    data () {
      const vm = this;
      return {
        options: {
          cutoutPercentage: 75,
          legend: {
            display: true,
            position: 'right'
          },
          plugins: {
            colorschemes: {
              scheme: this.theme,
              override: true
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: false
          },
          onHover (e, element) {
            if (element.length) {
              const i = element[0]._index;
              const label = vm.chartData.labels[i];
              const value = vm.chartData.datasets[0].data[i];
              const data = { label, value };
              vm.textCenter(data);
            } else {
              vm.textCenter(null);
            }
          }
        }
      };
    },

    methods: {
      textCenter (data) {
        Chart.pluginService.register({
          beforeDraw (chart) {
            const { ctx, currentDevicePixelRatio: ratio, height, width } = chart.chart;
            const legendWidth = chart.legend.width;

            if (data) {
              const { label, value } = data;
              ctx.clearRect(0, 0, width, height);

              for (let index = 0; index < 2; index++) {
                const isTopText = index === 0;
                ctx.font = `${isTopText ? '' : 'bold'} 16px 'Avenir Next', 'Lato', Roboto, 'Helvetica Neue', sans-serif`;
                ctx.fillStyle = 'rgba(73, 79, 87, 1)';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';

                const text = isTopText ? label : `${value}lbs`;
                const textX = ((width - legendWidth) * ratio) / 2;
                const yVal = ((height * ratio) / 2);
                const textY = isTopText ? yVal - 10 : yVal + 10;
                ctx.fillText(text, textX, textY, width);
              }
              ctx.save();
            } else {
              ctx.restore();
              ctx.clearRect(0, 0, height, width);
              ctx.save();
            }
          }
        });
      }
    },

    mounted () {
      this.renderChart(this.chartData, this.options);
    },

    watch: {
      chartData: {
        deep: true,
        handler () {
          this.$data._chart.update();
        }
      },
      isMobile (val) {
        const chart = this.$data._chart;
        if (val) {
          chart.options.legend.position = 'bottom';
          chart.update();
        } else {
          chart.options.legend.position = 'right';
          chart.update();
        }
      },
      theme: {
        deep: true,
        handler (val) {
          this.$data._chart.options.plugins.colorschemes.scheme = val;
          this.$data._chart.update();
        }
      }
    }
  };
</script>
