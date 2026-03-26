<template>
  <div class="overview-container">
    <!-- <dv-decoration-7 style="width:100%;height:40px; color: #FFFFFF;font-size: 24px; display: flex; ">
      <dv-decoration-4 :reverse="true" style="width:100px;height:5px; color: #7ACAEC;" />
        Distribution and statistics of deep-sea microbial data
      <dv-decoration-4 :reverse="true" style="width:100px;height:5px;" />
    </dv-decoration-7> -->
    <div class="up">
      <div class="left">
        <div class="statistics">
          <div class="row">
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">Metagenome</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #F76B6B;  text-align: center;margin-top: 10px; ">1,243,243</div>
            </div>
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">WGS</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #73C0DE;  text-align: center;margin-top: 10px; ">244,321</div>
            </div>
          </div>

          <div class="row">
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">Genes</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #FCD05B;  text-align: center;margin-top: 10px; ">342,211,322</div>
            </div>
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">Taxonomy</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #409AF7;  text-align: center;margin-top: 10px; ">4,032</div>
            </div>
          </div>

          <div class="row">
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">ARGs</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #5FE073;  text-align: center;margin-top: 10px; ">234,212</div>
            </div>
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">VFs</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #CB62E0;  text-align: center;margin-top: 10px; ">66,432</div>
            </div>
          </div>

          <div class="row">
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">Secondary Metabolites</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #FF00B4;  text-align: center;margin-top: 10px; ">15,755</div>
            </div>
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">AMPs</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #FFFB00;  text-align: center;margin-top: 10px; ">234,233</div>
            </div>
          </div>

          <div class="row">
            <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">Protein Structure</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #00FF74;  text-align: center;margin-top: 10px; ">233,245</div>
            </div>
            <!-- <div class="item" style="width: 100px;">
              <div class="title" style="font-weight: 700;font-size: 18px; color: #FFF; text-align: center; ">IMG/VR</div>
              <div class="num" style="font-weight: 700;font-size: 16px; color: #8355E8;  text-align: center;margin-top: 10px; ">178765</div>
            </div> -->
          </div>

          <div style="margin-left: 20px; margin-right: 20px;">
            <el-button type="primary" style="width: 100%;" @click="handleGoToDownload()">Download Database</el-button>
          </div>
          
        </div>
      </div>
      <div class="right">
        <GeoWithSearch :geoData="geoData"></GeoWithSearch>
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
      <!-- <div class="box">
        <div class="name border_3" style="margin-bottom: 30px;">
          Secondary Metabolites
        </div>
        <WordCloudVis :words="productWordCloudData" :fontColor="'#5AD86A'"></WordCloudVis>
      </div> -->
      <!-- <div class="box">
        <div class="name border_3" style="margin-bottom: 30px;">
          AMPs
        </div>
        <WordCloudVis :words="ampsWordCloudData" :fontColor="'#5AD86A'"></WordCloudVis>
      </div> -->
      
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
      ampsWordCloudData: []
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
        }
      }).then((response) => {
        this.geoData = response.data.data
        this.gradientData = this.processGradientData(this.geoData)
        this.positionBarData = this.processPositionBarData(this.geoData)
				this.vfsWordCloudData = this.processVFsData(this.geoData)
				this.argsWordCloudData = this.processArgsData(this.geoData)
				this.productWordCloudData = this.processProductData(this.geoData)
        this.taxonomeWordCloudData = this.processTaxonomeWordCloudData(this.geoData)
        this.ampsWordCloudData = this.processAmpsWordCloudData(this.geoData)
        this.$store.dispatch('setGeoInfoData', {
          geoData: this.geoData,
          gradientData: this.gradientData,
          positionBarData: this.positionBarData,
					vfsWordCloudData: this.vfsWordCloudData,
					argsWordCloudData: this.argsWordCloudData,
					productWordCloudData: this.productWordCloudData,
          taxonomeWordCloudData: this.taxonomeWordCloudData,
          ampsWordCloudData: this.ampsWordCloudData
        })
      }).finally(() => {
        hideLoading()
      })
    },

    processProductData(objData=[]) {
      let arr = []
      objData.forEach(item => {
        if(item.info.product) {
			const productArr = item.info.product.split(';')
			arr = [...arr, ...productArr]
        }
      })
      const products = Array.from(new Set(arr)).splice(1, 20)
      return products
    },

    processArgsData(objData=[]) {
      let arr = []
      objData.forEach(item => {
        if(item.info.args) {
          const argsArr = item.info.args.split(';')
          arr = [...arr, ...argsArr]
        }
      })
      const args = Array.from(new Set(arr)).splice(1, 20)
      return args
    },

    processVFsData(objData=[]) {
      let arr = []
      objData.forEach(item => {
        if(item.info.vfs) {
          const vfArr = item.info.vfs.split(';')
          arr = [...arr, ...vfArr]
        }
      })
      const vfs = Array.from(new Set(arr)).splice(1, 20)
      return vfs
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
      let tempArr = []
      objData.forEach(item => {
        if(item.info.taxonome) {
          const strs = item.info.taxonome.replace(/s__/g, '').split(';')
          tempArr = [...tempArr, ...strs]
        }
      })
      const setArr = [...new Set(tempArr)].splice(1, 20)
      return setArr
    },

    processAmpsWordCloudData(objData = []) {
      let tempArr = []
      objData.forEach(item => {
        if(item.info.amps && item.info.amps !== '-') {
          const strs = item.info.amps.split(';')
          tempArr = [...tempArr, ...strs]
        }
      })
      const setArr = [...new Set(tempArr)].splice(1, 20)
      return setArr
      // return ['ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP','ALP','ADP','CDP','CLP',]
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
  background-color: #282C34;
  .up {
    display: flex;
    background-color: #2C3964;
    .left {
      width: 360px;
      padding: 10px 10px 0 10px;
      .statistics {
        background-color: #3a4569;
        opacity: 0.8;
        height: 100%;
        border-radius: 10px 10px 10px 10px;
        .row {
          display: flex;
          justify-content: space-around;
          padding: 10px 10px 10px 10px;
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
    .box {
      margin-top: 10px;
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