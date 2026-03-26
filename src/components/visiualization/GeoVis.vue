<template>
  <div>
    <div ref="echart" class="geo-vis" :style="{ width: width, height: height }"></div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-descriptions>
          <el-descriptions-item label="SRAStudy">
            <el-tag type="danger" size="small">{{ srp }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Run">
            <el-tag type="warning" size="small">{{ runs[0] }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Other run numbers">
            {{ runs.length - 1 }}
          </el-descriptions-item>
      </el-descriptions>
      <div>
        <el-alert
          :title="`Are you sure you want to enter the ${srp} details page?`"
          type="success"
          :closable="false"
        >
        </el-alert>
      </div>
      <div class="confirm">
        <el-button type="danger" size="mini" @click="handleRoutePush">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/map/js/world'
import elementResizeDetectorMaker from "element-resize-detector";

export default {
    name: 'GeoVis',

    data() {
      return {
        echart: null,
        option: null,
        dialogVisible: false,
        srp: '',
        runs: [],
        clickedPointObj: null
      }
    },

    props: {
      geoData: {
        type: Array,
        required: true
      },
      search: {
        type: Object,
        default() {
          return null
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
          return '600px'
        }
      },
      dataReset: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    mounted() {
      
    },

    watch: {
      geoData(newValue, oldValue) {
        if(newValue && newValue.length > 0) {
          this.initChart()
          this.chartResize()
          // this.addLinesWhenMouseEvent()
          this.addClickEvent()
        }
      },
      search(newValue, oldValue) {
        if(newValue) {
          const result = []
          this.geoData.forEach((item, index) => {
            if(
              item.value[0] >= newValue.weRange[0] &&
              item.value[0] <= newValue.weRange[1] &&
              item.value[1] >= newValue.snRange[0] &&
              item.value[1] <= newValue.snRange[1] &&
              item.value[2] >= newValue.depthRange[0] && 
              item.value[2] <= newValue.depthRange[1]
            ) {
              result.push(item) 
            }
          })
          this.option.series[0].data = result
          this.echart.setOption(this.option)
        }
      },
      dataReset(newValue, oldValue) {
        if(newValue && Object.keys(newValue).length && newValue.signal) {
          this.option.series[0].data = this.geoData
          this.echart.setOption(this.option)
        }
      }
    },

    methods: { 
      initChart() {
        this.echart = echarts.init(this.$refs.echart)
        this.option = {
          // backgroundColor: '#2C406A',
          backgroundColor: '#2C3964',
          lazyUpdate: true,
          animation: true,
          animationDuration:5000,
          animationEasing:'bounceOut',
          animationThreshold: 5,
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              return 'SRAStudy: ' + params.data['name'] + 
              '<br>Run: ' + params.data['run'] + 
              '<br>Geographic location: ' + params.data['geographic location'] + 
              '<br>Depth: ' + (params.data['depth'] === '-'? 'Unkown' : params.data['depth'] + 'm') + 
              '<br>Longitude: ' + params.data.value[1] + 
              '<br>Latitude: ' + params.data.value[0]
            }
          },
          visualMap: {
            min: 0,
            max: 12000,
            text: ['Depth'],
            realtime: true,
            calculable: true,
            hoverLink: true,
            itemWidth: 15,
            itemHeight: 400,
            seriesIndex: 0,
            inverse: true,
            bottom: 0,
            left: 0,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            },
            textStyle: {
              color: '#FFF'
            }
          },
          series: [
            {
              name: 'SRP',
              id: 'SRP',
              type: 'effectScatter',
              roam: true,
              coordinateSystem: 'geo',
              showEffectOn: 'emphasis',
              data: this.geoData,
              rippleEffect: {
                number: 5,
                period: 4,
                scale: 5,
                brushType: 'fill'
              },
              symbol: 'pin',
              symbolSize: 15,
              symbolKeepAspect: true,
              emphasisOnMouseOver: false,
            },
          ],

          geo: {
            id: 'worldGeo',
            map: 'world',
            show: true,
            left: 40, 
            top: 40, 
            right: 40, 
            bottom: 40,
            roam: true,
            animationDurationUpdate:0,
            zoom: 1,
            boundingCoords: [
              [-180, 90],
              [180, -90]
            ],
            label: {
              position: 'left',
              emphasis: {
                show: true, 
                color: '#FFF',
                fontStyle: 'italic',
                fontSize: 16
              },
            },
            itemStyle: {
              areaColor: '#323c48',
              borderColor: '#8ACFF2',
              borderWidth: 0.5,
              borderType: 'solid',
              borderCap: 'round',
              borderJoin: 'round', 
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 20,
              opacity: 0.8,
              emphasis: {
                areaColor: '#40B299',
                borderWidth: 1,
                opacity: 1,
              }
            }
          },
        }
        this.echart.setOption(this.option)
      },

      // 路由跳转
      handleRoutePush() {
        this.$router.push({
          name: 'runproject', 
          params: { 
            param: this.clickedPointObj
          }
        })
        // this.dialogVisible = false
      },

      // 点击事件
      addClickEvent() {
        const that = this
        this.echart.on('click', function (params) {
          if (params.seriesType === 'effectScatter') {
            that.srp = params.data.name
            const runs = [params.data.run]
            that.geoData.forEach(item => {
              if(item.name === that.srp) {
                runs.push(item.run)
              }
            })
            that.clickedPointObj = params.data.info
            that.runs = runs
            that.dialogVisible = true
          }
        })
      },

      // 当屏幕尺寸改变时，地图同时响应尺寸
      chartResize() {
        const erd = elementResizeDetectorMaker();
        const that = this
        erd.listenTo(this.$refs.echart, function(element) {
          that.$nextTick(() => {
            that.echart.resize();
          })
        })
      },

      // 当组件销毁时，清除echart对象
      beforeDestroy() {
        if (this.echart) {
          this.echart.dispose()
        }
      },
    } 
}
</script>
<style lang="scss" scoped>
// .geo-vis {
//   background: url('../../assets/images/geo_background.jpeg');
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
// }
.dialog-div {
  height: 40px;
  line-height: 40px;
}
.confirm {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>