<template>
  <div class="srp-detail-container">
    <div class="srp-description-container">
      <div class="title">
        SRP description
      </div>
      <SrpDescription :srpData="srpInfo"></SrpDescription>
    </div>

    <div class="run-info-container">
      <div class="title-container">
        <div class="title">
          Run informations
        </div>
        <div class="statistics">
          {{ 'Run numbers: ' + (Object.keys(runInfo).length? runInfo.data.length : 0) }}
        </div>
      </div>
      
      <RunInformation :runData="runInfo" @output-value="viewDetail($event)"></RunInformation>
    </div>
    
    <div class="geneome-information-container">
      <ContigsInformation :srp="srpInfo['SRAStudy']"></ContigsInformation>
    </div>

    <el-dialog :visible.sync="runDetailVisible">
      <RunInfoDescription :runDetailData="runDetailData"></RunInfoDescription>
    </el-dialog>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'
import SrpDescription from '@/components/database/bioproject/SrpDescription.vue'
import RunInformation from '@/components/database/bioproject/RunInformation.vue'
import RunInfoDescription from '@/components/database/bioproject/RunInfoDescription.vue'
import ContigsInformation from '@/components/database/bioproject/ContigsInformation.vue';

export default {
  name: 'RunProject',

  data() {
    return {
      srp: '',
      srpInfo: {},
      runInfo: {},
      runDetailData: {},
      runDetailVisible: false
    };
  },

  components: {
    SrpDescription,
    RunInformation,
    RunInfoDescription,
    ContigsInformation
  },

  mounted() {
    const param = this.$route.params['param']
    const databaseRunProjectData = this.$store.state.databaseRunProjectData
    if(param['SRAStudy']) {
      if(databaseRunProjectData) {
        if(databaseRunProjectData.srpInfo['SRAStudy'] == param['SRAStudy']) {
          this.srpInfo = databaseRunProjectData.srpInfo
          this.runInfo = databaseRunProjectData.runInfo
        } else {
          this.srpInfo = param
          this.requestRunProjectInfo(this.srpInfo['SRAStudy'])
        }
      } else {
        this.srpInfo = param
        this.requestRunProjectInfo(this.srpInfo['SRAStudy'])
      }
      
    } else {
      this.srpInfo = databaseRunProjectData.srpInfo
      this.runInfo = databaseRunProjectData.runInfo
    }
  },

  methods: {

    requestRunProjectInfo(srp) {
      showLoading()
      const url = config.baseUrl + config.uri.runProjectViewURI + '/' + srp
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.runInfo = response.data
        this.$store.dispatch('setDatabaseRunProjectData', {
          'srpInfo': this.srpInfo, 
          'runInfo': this.runInfo
        })
      }).finally(() => {
        hideLoading()
      })
    },

    viewDetail(value) {
      this.runDetailData = value
      this.runDetailVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
.srp-detail-container {
  padding-left: 100px;
  padding-right: 100px;

  .srp-description-container, .run-info-container, .geneome-information-container {
    margin-top: 10px;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding: 10px 10px 10px 10px;
    box-shadow: 5px 5px 5px #ccc;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #36A3F7;
    }
    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .statistics {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
    }
    
  }

  .geneome-information-container {
    margin-bottom: 20px;
  }
}

</style>