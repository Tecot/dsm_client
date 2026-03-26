<template>
<div class="bio-project-container">
  <div class="geo-container" :style="{ height: geoContainerHeight }" v-show="geoData.length">
    <div class="geo-vis">
      <GeoVis :geoData="geoData" :height="'800px'" :search="geoSearchData"></GeoVis>
    </div>

    <div class="tools-container">
      <el-tooltip class="item" effect="light" content="Statistics switch" placement="bottom-start">
        <el-button :type="statisticsVisable? 'danger' : 'info'" icon="el-icon-s-data" size="mini" circle @click="handleStatisticsVisable"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="Search switch" placement="bottom-start">
        <el-button :type="searchVisable? 'danger' : 'info'" icon="el-icon-search" size="mini" circle @click="handleSearchVisable"></el-button>
      </el-tooltip>
    </div>

    <div class="statistics-container" :style="{ height: geoContainerHeight }" v-show="statisticsVisable">
      <div class="title">
        Statistics of collected samples
      </div>
      <div class="gradient-vis">
        <GradientPieVis :pieData="gradientData" :width="'90%'" :height="'350px'"></GradientPieVis>
      </div>
      <div class="position-bar-vis">
        <PositionBarVis :barData="positionBarData" :width="'95%'" :height="'350px'"></PositionBarVis>
      </div>
    </div>
  
    <div class="search-container" v-show="searchVisable">
      <div class="title">
        Search tools
      </div>
      <GeoSearchConditions @outputSearchData="handleSearchData($event)"></GeoSearchConditions>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import GeoVis from '@/components/visiualization/GeoVis.vue'
import GradientVis from '@/components/visiualization/GradientVis.vue'
import GradientPieVis from '@/components/visiualization/GradientPieVis.vue'
import PositionBarVis from '@/components/visiualization/PositionBarVis.vue'
import GeoSearchConditions from './GeoSearchConditions.vue'

export default {
  name: 'GeoStatisticsCopy',

  components: {
    GeoVis,
    GradientVis,
    GradientPieVis,
    PositionBarVis,
    GeoSearchConditions,
  },

  data() {
    return {
      geoContainerHeight: '800px',
      statisticsVisable: true,
      searchVisable: true,



      geoData: [],
      gradientData: [],
      positionBarData: {},
      geoSearchData: null
    }
  },

  mounted() {
    const geoDataInfoStore = this.$store.state.geoInfoData
    if(geoDataInfoStore) {
      this.geoData = geoDataInfoStore.geoData
      this.gradientData = geoDataInfoStore.gradientData
      this.positionBarData = geoDataInfoStore.positionBarData
    } else {
      this.requestGeoData()
    }
},

  methods: {
    // 获取查询数据
    handleSearchData(value) {
      this.geoSearchData = value
    },

    // 是否显示地图统计
    handleStatisticsVisable() {
      this.statisticsVisable = !this.statisticsVisable
    },

    // 是否显示查询
    handleSearchVisable() {
      this.searchVisable = !this.searchVisable
    },

    async requestGeoData() {
      showLoading()
      const url = config.baseUrl + config.uri.geoDataViewURI
      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.geoData = response.data.data
        this.gradientData = this.processGradientData(this.geoData)
        this.positionBarData = this.processPositionBarData(this.geoData)
        this.$store.dispatch('setGeoInfoData', {
          geoData: this.geoData,
          gradientData: this.gradientData,
          positionBarData: this.positionBarData
        })
      }).finally(() => {
          hideLoading()
      })
    },

    processPositionBarData(objData = []) {
      const gls = Array.from(new Set(objData.map((item) => {
        if(item['geographic location'].includes(':')) {
          return item['geographic location'].split(':')[0]
        }
        return item['geographic location']
      })))
      const values = gls.map((item, index) => 0)
      objData.forEach((item) => {
        values[gls.indexOf(item['geographic location'].includes(':')? item['geographic location'].split(':')[0] : item['geographic location'])]++
      })
      return {
        x: gls,
        y: values
      }
    },

    processGradientData(objData = []) {
      const meta = {
        'Unknow': { value: 0, name: 'Unknow'},
        '0~2000': { value: 0, name: '0~2000' },
        '2000~4000': { value: 0, name: '2000~4000' },
        '4000~6000': { value: 0, name: '4000~6000' },
        '6000~8000': { value: 0, name: '6000~8000' },
        '8000~10000': { value: 0, name: '8000~10000' },
        '8000~10000': { value: 0, name: '8000~10000' },
        '10000~12000': { value: 0, name: '10000~12000' }
      }
      const data = {
          maxValue: 0,
          data: [],
      }
      objData.forEach((item) => {
        if(item.depth === '-') {
          meta['Unknow'].value++
        } else {
          if(item.depth >= 0 && item.depth < 2000) {
            meta['0~2000'].value++
          }
          if(item.depth >= 2000 && item.depth < 4000) {
            meta['2000~4000'].value++
          }
          if(item.depth >= 4000 && item.depth < 6000) {
            meta['4000~6000'].value++
          }
          if(item.depth >= 6000 && item.depth < 8000) {
            meta['6000~8000'].value++
          }
          if(item.depth >= 8000 && item.depth < 10000) {
            meta['8000~10000'].value++
          }
          if(item.depth >= 10000 && item.depth < 12000) {
            meta['10000~12000'].value++
          }
        }
      })
      const result = []
      Object.keys(meta).forEach(key => {
        result.push(meta[key])
      })

      return result
    }
  },
};
</script>

<style lang="scss" scoped>
.bio-project-container {
  .geo-container {
    position: relative;

    .tools-container {
      position: absolute;
      width: 300px;
      height: 40px;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: end;
      padding-right: 10px;
      background-color: transparent;
    }

    .statistics-container {
      position: absolute;
      width: 500px;
      top: 0;
      left: 0;
      background-color: #3b4157;
      opacity: 0.7;
        
      .title {
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        color: #FFF;
        font-weight: 700;
      }
      .gradient-vis, .position-bar-vis {
        display: flex;
        justify-content: center;
      }
    }

    .search-container {
      position: absolute;
      width: 400px;
      top: 40px;
      right: 10px;
      background-color: #3b4157;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      opacity: 0.95;
      border-radius: 10px 10px 10px 10px;
      .title {
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        color: #FFF;
        font-weight: 700;
      }
    }
  }
}
</style>