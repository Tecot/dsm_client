<template>
    <div ref="echart" class="pie-vis" :style="{ width: width, height: height }"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'GradientPieVis',
  
    props: {
      pieData: {
        type: Array,
        required: true,
        default() {
          return []
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
      pieData(newValue, oldValue) {
        if(newValue && newValue.length > 0) {
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // legend: {
          //   orient: 'vertical',
          //   x: 'right',
          //   y: 'bottom'
          // },
          series: [
            {
              name: 'Depth range',
              type: 'pie',
              radius: '50%',
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                color: '#FFF',
              },
              labelLine: {
                smooth: 0.2,
                length: 5,
              },
              color: [
                '#ccc', 
                '#F76B6B', 
                '#FCD05B',
                '#73C0DE', 
                '#3BA272', 
                '#FC8452', 
                '#9A60B4'
              ],
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 1000;
              },
              data: this.pieData
            }
          ]
        };
        this.option && this.echart.setOption(this.option);
      }
    },
  };
  </script>