<template>
  <div class="bio-project-container">

    <div class="decription-container">
      <div ref="descriptionContainer" class="decription-title-container" @click="ifShowDescription = !ifShowDescription">
        Description
      </div>
      <div class="decription-content-container" v-show="ifShowDescription">
        The Sample View section aims to depict the geographical distribution and environmental information of ocean samples currently available on the website. This section allows users to check each dataset and its metadata. Users either can select datasets directly from the sample list, or they can use the navigation panel on the right side. Users are able to use sample ID, Habitat source, Location, longitude and latitude as well as sampling depth to carry out the search. These selected datasets can be viewed on a global map to estimate their distribution.
      </div>
    </div>
    

    <div class="information-container">
      <div class="title-and-search-container">
        <div class="title-container">
          {{ ifSearchedSrp? 'Searched bioproject list' : 'Bioproject list'}}
        </div>
        <SrpSearch @outputSearchData="handleSearchData($event)" @outputResetSignal="handleResetSignal($event)"></SrpSearch>
      </div>

      <div class="srp-infomation" v-if="!ifSearchedSrp">
        <SrpInformation></SrpInformation>
      </div>

      <div class="srp-infomation" v-else>
        <SrpSearchedInformation :tableData="searchedSrptableData"></SrpSearchedInformation>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import SrpSearch from '@/components/database/bioproject/SrpSearch.vue'
import SrpInformation from '@/components/database/bioproject/SrpInformation.vue'
import SrpSearchedInformation from '@/components/database/bioproject/SrpSearchedInformation.vue'

export default {
  name: 'SrpProject',

  components: {
    SrpSearch,
    SrpInformation,
    SrpSearchedInformation 
  },

  data() {
    return {
      ifShowDescription: true,
      searchedSrptableData: [],
      ifSearchedSrp: false
    }
  },

  mounted() {
   
  },

  methods: {
    handleSearchData(value) {
      this.requestBioProjectInfo(value)
      this.ifSearchedSrp = true
    },

    handleResetSignal(value) {
      this.ifSearchedSrp = false
    },

    requestBioProjectInfo(searchData) {
      showLoading()
      const url = config.baseUrl + config.uri.srpSearchedProjectViewUIR
      axios.get(url, {
        params: {
          bioProjectText: searchData.bioProjectText,
          centerName: searchData.centerName,
          srastudyText: searchData.srastudyText,
          submission: searchData.submission,
          projectID: searchData.projectID,
          lowDepth: searchData.depthRange[0],
          highDepth: searchData.depthRange[1],
          includeUnknownDepth: searchData.includeUnknownDepth,
          includeUnknownll: searchData.includeUnknownll,
          s: searchData.snRange[0],
          n: searchData.snRange[1],
          w: searchData.weRange[0],
          e: searchData.weRange[1],
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.searchedSrptableData = response.data.data
      }).finally(() => {
        hideLoading()
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.bio-project-container {
  padding-left: 100px;
  padding-right: 100px;
  .decription-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #888888;
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

  .information-container {
    background-color: #FFF;
    margin-top: 10px;
    padding: 20px 10px 20px 10px;
    border-radius: 5px 5px 5px 5px;
    box-shadow: 5px 5px 5px #ccc;
    margin-bottom: 20px;
    .title-and-search-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-container {
        font-size: 18px;
        font-weight: 700;
        color: #36A3F7;
      }
    }
  }
}
</style>