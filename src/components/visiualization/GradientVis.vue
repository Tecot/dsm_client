<template>
  <div ref="echart" class="funnel-vis" :style="{ width: width,height: height }"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'GradientVis',

  props: {
    funnelData: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    width: {
      type: String,
      default() {
        return '400px'
      }
    },
    height: {
      type: String,
      default() {
        return '300px'
      }
    }
  },

  data() {
    return {
      echart: null,
      option: null,
      color: ['lightskyblue', '#057EC1',]
    };
  },

  mounted() {
    
  },

  watch: {
    funnelData(newValue, oldValue) {
      if(newValue && newValue.data.length > 0) {
        this.initChart()
      }
    }
  },
  
  methods: {
    initChart() {
      this.echart = echarts.init(this.$refs.echart);
      this.option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        visualMap: {
          min: 0,
          max: this.funnelData.maxValue,
          text: ['Numbers'],
          align: 'right',
          realtime: false,
          calculable: true,
          inRange: {
            color: this.color
          },
          textStyle: {
            color: '#FFF'
          }
        },
        series: [{
          name: 'Depth range',
          type: 'funnel',
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          width: '100%',
          min: 0,
          max: this.funnelData.maxValue,
          minSize: '0%',
          maxSize: '70%',
          sort: 'none',
          gap: 5,
          color: this.color,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontWeight: 'bold'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'dashed'
            }
          },
          itemStyle: {
              borderWidth: 0,
          },
          emphasis: {
            label: {
              fontSize: 12
            }
          },
          data: this.funnelData.data
          }
        ]
      };
      this.option && this.echart.setOption(this.option);
    }
  },
};
</script>