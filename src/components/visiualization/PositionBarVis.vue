<template>
  <div ref="echart" class="var-vis" :style="{ width: width,height: height }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PositionBarVis',

  props: {
    barData: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: String,
      default() {
        return '100%'
      }
    },
    height: {
      type: String,
      default() {
        return '100%'
      }
    }
  },


  data() {
    return {
      echart: null,
      option: null
    };
  },

  mounted() {
    
  },

  watch: {
    barData(newValue, oldValue) {
      if(newValue) {
        this.initChart()
      }
    }
  },

  methods: {
    initChart() {
      this.echart = echarts.init(this.$refs.echart);
      this.option = {
        backgroundColor: '#2C3964',
        center: ['50%', '50%'],
        itemStyle: {
          color: '#F76B6B',
          borderRadius: [5, 5, 0, 0]
        },
        label: {
          show: false,
          color: '#FFF',
          position: 'top'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br/>Numbers : {c}'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          borderColor: '#FFF'
        },
        xAxis: {
          type: 'category',
          // name: 'Geographic location',
          data: this.barData.x,
          nameLocation: 'center',
          nameGap: 30,
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 14,
            color: '#FFF',
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
            lineStyle: {
              color: '#FFF',
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            },
          },
          axisLabel: {
            color: '#FFF',
            rotate: 20,
            fontSize: 12,
            formatter: (value, index) => {
              if (value.length > 6) {
                  return value.slice(0, 6) + '...';
              } else {
                  return value;
              }
            }
          },
        },
        yAxis: {
          type: 'value',
          // name: 'Number of SRP',
          nameLocation: 'center',
          nameGap: 24,
          distance: [0, '80%'],
          nameGap: 30,
          scale: true,
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 14,
            color: '#FFF',
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
            lineStyle: {
              color: '#FFF'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            },
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 12,
          },
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 1000;
            },
            data: this.barData.y
          }
        ]
      };

      this.option && this.echart.setOption(this.option);
    }
  },
};
</script>