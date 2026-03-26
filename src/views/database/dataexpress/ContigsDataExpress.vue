<template>
  <div class="data-visual-container">
    <div class="decription-container">
      <div ref="descriptionContainer" class="decription-title-container" @click="ifShowDescription = !ifShowDescription">
        Description
      </div>
      <div class="decription-content-container" v-show="ifShowDescription">
        The Sample View section aims to depict the geographical distribution and environmental information of ocean samples currently available on the website. This section allows users to check each dataset and its metadata. Users either can select datasets directly from the sample list, or they can use the navigation panel on the right side. Users are able to use sample ID, Habitat source, Location, longitude and latitude as well as sampling depth to carry out the search. These selected datasets can be viewed on a global map to estimate their distribution.
      </div>
    </div>

    <div class="contig-description-container">
      <div class="title-container">
        {{ `${contigDetail.srp}: ${contigDetail.ID} contigs information` }}
      </div>
      <div class="contig-description-information">
        <ContigDescription :contigDetail="contigDetail" @viewProteinStructSignal="handleProteinStructSignal($event)"></ContigDescription>
      </div>
      <GeneStructVis 
        :inputData="multiArrowData"
        @viewVfAndResfinderSignal="handleViewVfAndResfinderSignal($event)"
      >
      </GeneStructVis>
    </div>

    <div class="bin-container">
      <div class="title-container">
        {{ contigDetail.srp + ': The results of binning' }}
      </div>
      <BinInformation :srp="contigDetail.srp" :binData="binData" @binDescriptionSignal="handleBinDescriptionSignal($event)"></BinInformation>
    </div>

    <div class="mop-container">
      <div class="title-container">
        {{ contigDetail.srp + ': The predicted results of AMP' }}
      </div>
      <MacrelOuPredictionInformation :srp="this.contigDetail.srp" @mopData="processMopData($event)"></MacrelOuPredictionInformation>
    </div>

    <el-dialog :visible.sync="dialog3DmolVisible" width="50%">
      <div v-show="proteinSeqInfo && Object.keys(proteinSeqInfo).length">
        <ProteinSeqDescription :proteinSeqInfo="proteinSeqInfo"></ProteinSeqDescription>
        <ProteinStructVis :structData="proteinStruckData"></ProteinStructVis>
      </div>
      <div class="temp-information" v-show="!(proteinSeqInfo && Object.keys(proteinSeqInfo).length)">
        No protein struct information
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVfAndResfinderDataVisible" width="50%">
      <VfAndResfinderDescription :inputData="vfAndResfinderData"></VfAndResfinderDescription>
    </el-dialog>

    <el-dialog :visible.sync="dialogBinDataVisible" width="50%">
      <BinDescription :srp="contigDetail.srp" :binDescription="binDescription"></BinDescription>
    </el-dialog>
    
    <el-dialog :visible.sync="dialogMopDataVisible" width="50%">
      <MacrelOutPredictionDescription :mopInfo="mopData"></MacrelOutPredictionDescription>
    </el-dialog>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
import BinInformation from '@/components/database/dataexpress/BinInformation.vue';
import ContigDescription from '@/components/database/dataexpress/ContigDescription.vue'
import ProteinSeqDescription from '@/components/database/dataexpress/ProteinSeqDescription.vue'
import ProteinStructVis from '@/components/visiualization/ProteinStructVis.vue'
import VfAndResfinderDescription from '@/components/database/dataexpress/VfAndResfinderDescription.vue';
import BinDescription from '@/components/database/dataexpress/BinDescription.vue';
import GeneStructVis from '@/components/visiualization/GeneStructVis.vue';
import MacrelOuPredictionInformation from '@/components/database/dataexpress/MacrelOuPredictionInformation.vue';
import MacrelOutPredictionDescription from '@/components/database/dataexpress/MacrelOutPredictionDescription.vue';

export default {
  name: 'ContigsDataExpress',

  components: {
    ContigDescription,
    BinInformation,
    ProteinSeqDescription,
    ProteinStructVis,
    VfAndResfinderDescription,
    GeneStructVis,
    BinDescription,
    MacrelOuPredictionInformation,
    MacrelOutPredictionDescription
  },

  data() {
    return {
      ifShowDescription: true,

      contigName: '',
      contigDetail: {},
      multiArrowData: {},

      dialog3DmolVisible: false,
      proteinSeqInfo: {},
      proteinStruckData: '',

      dialogVfAndResfinderDataVisible: false,
      vfAndResfinderData: null,

      dialogBinDataVisible: false,
      binData: {},
      binDescription: {},

      dialogMopDataVisible: false,
      mopData: {},
    };
  },

  mounted() {
    const param = this.$route.params['param']
    if(param) {
      this.contigDetail = param
      this.$store.dispatch('setContigDetailData', { ...param })
    } else {
      this.contigDetail = this.$store.state.contigDetailData
    }
    this.requestCdsVfResfinderData(this.contigDetail.srp, this.contigDetail.ID)
  },

  methods: {
    // 请求cds vf resfinder数据
    async requestCdsVfResfinderData(srp, contigID) {
      showLoading()
      const url = config.baseUrl + config.uri.cdsVfResfinderViewURI + '/' + srp + '/' + contigID
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        const newData = {}
        newData['length'] = response.data.length
        newData['data'] = {}
        
        if(response.data.meta.cdsGenes.length) {
          newData['data']['Genes'] = response.data.meta.cdsGenes
        }
        if(response.data.meta.vfGenes.length) {
          newData['data']['VFs'] = response.data.meta.vfGenes
        }
        if(response.data.meta.resfinderGenes.length) {
          newData['data']['ARGs'] = response.data.meta.resfinderGenes
        }
        if(response.data.meta.region.length) {
          newData['data']['AMPs'] = response.data.meta.region
        }
        this.multiArrowData = newData
      }).finally(() => {
        hideLoading()
      })
    },

    // 查看蛋白质信息
    async handleProteinStructSignal(signal) {
      const code = this.contigDetail.ID.split('_')[1]
      this.requestProteinSeqData(this.contigDetail.srp, code)
      this.requestProteinStructData(this.contigDetail.srp, code)
      this.dialog3DmolVisible = signal
    },

    async handleViewVfAndResfinderSignal(value) {
      this.vfAndResfinderData = value
      this.dialogVfAndResfinderDataVisible = true
    },

    async handleBinDescriptionSignal(value) {
      this.dialogBinDataVisible = true
      this.binDescription = value
    },

    async requestProteinStructData(srp, code) {
      // SRP121432_17256
      const url = config.baseUrl + config.uri.proteinPdbViewURI + '/' + srp + '/' + code
      // const url = config.baseUrl + config.uri.proteinPdbViewURI + '/' + 'SRP121432' + '/' + '17256'
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => { 
        this.proteinStruckData = response.data.data? response.data.data : ''
      })
    },

    async requestProteinSeqData(srp, code) {
      // SRP121432_17256
      const url = config.baseUrl + config.uri.proteinOneSeqViewURI + '/' + srp + '/' + code
      // const url = config.baseUrl + config.uri.proteinOneSeqViewURI + '/' + 'SRP121432' + '/' + '17256'
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.proteinSeqInfo = response.data.data? response.data.data : {}
      })
    },

    processMopData(mopData) {
      this.mopData = mopData
      this.dialogMopDataVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
.data-visual-container {
  padding-left: 100px;
  padding-right: 100px;

  .decription-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    .decription-title-container {
      height: 50px;
      line-height: 50px;
      color: #36A3F7;
      font-weight: bold;
      font-size: 18px;
      padding-left: 10px;
      border-radius: 5px 5px 5px 5px;
      background-color: #FFF;
      cursor: pointer;
    }
    .decription-content-container {
      padding: 10px 10px 10px 10px;
      background-color: #FFF;
      font-size: 14px;
      border-radius: 0 0 5px 5px;
      border-top: 1px solid #efeeee;
    }
  }

  .contig-description-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding: 0 10px 20px 10px;
    .title-container {
      font-size: 18px;
      font-weight: 700;
      height: 50px;
      line-height: 50px;
      color: #36A3F7;
    }
    ::v-deep textarea {
      font-size: 12px;
      border: none;
    }
  }

  .bin-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding: 0 10px 20px 10px;
    .title-container {
      font-size: 18px;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      color: #36A3F7;
    }
  }

  .mop-container {
    margin-top: 10px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px #ccc;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding: 0 10px 20px 10px;
    .title-container {
      font-size: 18px;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      color: #36A3F7;
    }
  }

  .temp-information {
    text-align: center;
    
  }
}
</style>