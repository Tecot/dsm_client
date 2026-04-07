<template>
  <div class="overview-container" v-show="show">
    <!-- <dv-decoration-7 style="width:100%;height:40px; color: #FFFFFF;font-size: 24px; display: flex; ">
      <dv-decoration-4 :reverse="true" style="width:100px;height:5px; color: #7ACAEC;" />
        Distribution and statistics of deep-sea microbial data
      <dv-decoration-4 :reverse="true" style="width:100px;height:5px;" />
    </dv-decoration-7> -->
    <div class="up">
      <div class="left">
        <div class="statistics">
          <div class="row">
            <div class="item">
              <div class="title">Metagenome</div>
              <div class="num" style="color: #C0676C;">164</div>
            </div>
            <div class="item">
              <div class="title">Taxonomy</div>
              <div class="num" style="color: #73A3C2;">3,370</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="title">ARGS</div>
              <div class="num" style="color: #CBB16C;">508</div>
            </div>
            <div class="item">
              <div class="title">VFs</div>
              <div class="num" style="color: #5085D3;">13,718</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="title">Second Metabilites</div>
              <div class="num" style="color: #72BC79;">10,963</div>
            </div>
            <div class="item">
              <div class="title">AMPs</div>
              <div class="num" style="color: #C434A0;">342,906</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="title">Secondary Metabolites</div>
              <div class="num" style="color: #24EDB7;">10,994,552</div>
            </div>
            <div class="item">
              <div class="title">Protein Structure</div>
              <div class="num" style="color: #A15EC1;">233,245</div>
            </div>
          </div>
          <div style="margin: 20px 20px auto 20px;">
            <el-button type="primary" style="width: 100%;" @click="handleGoToDownload()">Download Database</el-button>
          </div>
        </div>
      </div>

      <div class="right">
        <GeoWithSearch :geoData="geoData" :geoHeight="'500px'"></GeoWithSearch>
      </div>
    </div>




    <div class="down">
      <div class="box">
        <div class="name border_1">
          Statistical of Samples from Various Regions
        </div>
        <PositionBarVis :barData="positionBarData" :height="'330px'" :width="'300px'"></PositionBarVis>
      </div>
      <div class="box">
        <div class="name border_1">
          Depth range distribution of samples
        </div>
        <GradientPieVis :pieData="gradientData" :height="'330px'" :width="'300px'"></GradientPieVis>
      </div>
      <div class="box">
        <div class="name border_2" style="margin-bottom: 30px;">
          Taxonome
        </div>
        <WordCloudVis :words="taxonomeWordCloudData"></WordCloudVis>
      </div>
      <div class="box">
        <div class="name border_2" style="margin-bottom: 30px;">
          VFs
        </div>
        <WordCloudVis :words="vfsWordCloudData"></WordCloudVis>
      </div>
      <div class="box">
        <div class="name border_2" style="margin-bottom: 30px;">
          ARGs
        </div>
        <WordCloudVis :words="argsWordCloudData"></WordCloudVis>
      </div>
      <div class="box">
        <div class="name border_3" style="margin-bottom: 30px;">
          Secondary Metabolites
        </div>
        <WordCloudVis :words="productWordCloudData" :fontColor="'#5AD86A'"></WordCloudVis>
      </div>
      <div class="box">
        <div class="name border_3" style="margin-bottom: 30px;">
          AMPs
        </div>
        <WordCloudVis :words="ampsWordCloudData" :fontColor="'#5AD86A'"></WordCloudVis>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import NavAside from '@/components/database/overview/NavAside.vue'
import GradientPieVis from '@/components/visiualization/GradientPieVis.vue'
import PositionBarVis from '@/components/visiualization/PositionBarVis.vue'
import GeoWithSearch from '@/components/database/overview/GeoWithSearch.vue'
import WordCloudVis from '@/components/visiualization/WordCloudVis.vue'

export default {
  name: 'Overview',

  components: {
    NavAside,
    GradientPieVis,
    PositionBarVis,
    GeoWithSearch,
    WordCloudVis,
  },

  data() {
    return {
      geoData: [],
      gradientData: [],
      positionBarData: {},
			vfsWordCloudData: [],
			argsWordCloudData: [],
			productWordCloudData: [],
      taxonomeWordCloudData: [],
      ampsWordCloudData: [],
      show: false
    }
  },

  mounted() {
    const geoDataInfoStore = this.$store.state.geoInfoData
    if(geoDataInfoStore) {
      this.geoData = geoDataInfoStore.geoData
      this.gradientData = geoDataInfoStore.gradientData
      this.positionBarData = geoDataInfoStore.positionBarData
			this.vfsWordCloudData = geoDataInfoStore.vfsWordCloudData
			this.argsWordCloudData = geoDataInfoStore.argsWordCloudData
			this.productWordCloudData = geoDataInfoStore.productWordCloudData
      this.taxonomeWordCloudData = geoDataInfoStore.taxonomeWordCloudData
      this.ampsWordCloudData = geoDataInfoStore.ampsWordCloudData
      this.show = geoDataInfoStore.ifShow
    } else {
      this.requestGeoData()
    }
  },

  methods: {
    async requestGeoData() {
      showLoading()
      const url = config.baseUrl + config.uri.geoDataViewURI
      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        },
        timeout: 300000,
        withCredentials: false
      }).then((response) => {
        this.geoData = response.data.data
        this.gradientData = this.processGradientData(this.geoData)
        this.positionBarData = this.processPositionBarData(this.geoData)
				this.vfsWordCloudData = this.processVFsData(this.geoData)
				this.argsWordCloudData = this.processArgsData(this.geoData)
				this.productWordCloudData = this.processProductData(this.geoData)
        this.taxonomeWordCloudData = this.processTaxonomeWordCloudData(this.geoData)
        this.ampsWordCloudData = this.processAmpsWordCloudData(this.geoData)
        this.show = true
        this.$store.dispatch('setGeoInfoData', {
          geoData: this.geoData,
          gradientData: this.gradientData,
          positionBarData: this.positionBarData,
					vfsWordCloudData: this.vfsWordCloudData,
					argsWordCloudData: this.argsWordCloudData,
					productWordCloudData: this.productWordCloudData,
          taxonomeWordCloudData: this.taxonomeWordCloudData,
          ampsWordCloudData: this.ampsWordCloudData,
          ifShow: this.show
        })
      }).finally(() => {
        hideLoading()
      })
    },

    processProductData(objData=[]) {
      let arr = []
      for(let i = 0; i < objData.length; i++) {
        if(objData[i].info.product) {
          const productArr = objData[i].info.product.split(';')
          arr = [...arr, ...productArr]
          if(Array.from(new Set(arr)).length > 20) {
            return Array.from(new Set(arr)).splice(0, 20)
          }
        }
        
      }
      return Array.from(new Set(arr))
    },

    processArgsData(objData=[]) {
      let arr = []
      for(let i = 0; i < objData.length; i++) {
        if(objData[i].info.product) {
          const argsArr = objData[i].info.args.split(';')
          arr = [...arr, ...argsArr]
          if(Array.from(new Set(arr)).length > 20) {
            return Array.from(new Set(arr)).splice(0, 20)
          }
        }
      }
      return Array.from(new Set(arr))
    },

    processVFsData(objData=[]) {
      let arr = []
      for(let i = 0; i < objData.length; i++) {
        if(objData[i].info.product) {
          const vfsArr = objData[i].info.vfs.split(';')
          arr = [...arr, ...vfsArr]
          if(Array.from(new Set(arr)).length > 20) {
            return Array.from(new Set(arr)).splice(0, 20)
          }
        }
      }
      return Array.from(new Set(arr))
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
      const arr = {
        x: gls,
        y: values
      }
      const combined = arr.x.map((value, index) => [value, arr.y[index]])
      combined.sort((a, b) => b[1] - a[1])
      arr.x = combined.map(item => item[0])
      arr.y = combined.map(item => item[1])
      return arr
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
    },

    processTaxonomeWordCloudData(objData = []) {
      let arr = []
      for(let i = 0; i < objData.length; i++) {
        if(objData[i].info.product) {
          const taxonomesArr = objData[i].info.taxonome.replace(/s__/g, '').split(';')
          arr = [...arr, ...taxonomesArr]
          if(Array.from(new Set(arr)).length > 20) {
            return Array.from(new Set(arr)).splice(0, 20)
          }
        }
      }
      return Array.from(new Set(arr))
    },

    processAmpsWordCloudData(objData = []) {
      // let tempArr = []
      // objData.forEach(item => {
      //   if(item.info.amps && item.info.amps !== '-') {
      //     const strs = item.info.amps.split(';')
      //     tempArr = [...tempArr, ...strs]
      //   }
      // })
      // const setArr = [...new Set(tempArr)].splice(1, 20)
      // return setArr
      return ['ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP']
    },

    goToLink(value) {
      this.$router.push({
        name: value
      })
    },

    handleGoToDownload() {
      this.$router.push({
        name: 'download'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-container {
  background-color: #2C3964;
  height: calc(100vh - 80px);
  .up {
    display: flex;
    background-color: #2C3964;
    .left {
      width: 360px;
      padding: 10px 10px 0 10px;
      .statistics {
        // background-color: #3a4569;
        background: rgba(58, 69, 105, 0.8);
        height: 100%;
        border-radius: 10px 10px 10px 10px;
        .row {
          display: flex;
          justify-content: space-around;
          padding: 10px 10px 10px 10px;
          margin-top: 10px;
          .item {
            width: 100px;
            .title {
              font-weight: 700;
              font-size: 18px; 
              color: #FFF; 
              text-align: center; 
            }
            .num {
              font-weight: 700;
              font-size: 24px; 
              color: #409AF7;  
              text-align: center;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .right {
      width: 100%;
    }
  }
  .down {
    display: flex;
    justify-content: space-around;
    background-color: #2C3964;
    margin-top: 40px;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .name {
        height: 40px;
        width: 95%;
        line-height: 40px;
        text-align: center;
        font-family: 'Times New Roman', Times, serif;
        font-size: 18px;
        color: #FFF;
        box-sizing: border-box;
      }
      .border_1 {
        border-top: 4px solid #FF7575;
      }
      .border_2 {
        border-top: 4px solid #03B5F4;
      }
      .border_3 {
        border-top: 4px solid #58CF6A;
      }
    }
  }
}
</style>