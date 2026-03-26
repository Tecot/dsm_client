<template>
<div class="bio-project-container">
  <div class="geo-container" v-show="geoData.length">
    <div class="geo-vis">
      <GeoVis :geoData="geoData" :height="'440px'" :search="geoSearchData" :dataReset="dataReset"></GeoVis>
    </div>

    <div class="tools-container">
      <el-tooltip class="item" effect="light" content="Search switch" placement="bottom-start">
        <el-button :type="searchVisable? 'danger' : 'info'" icon="el-icon-search" size="mini" circle @click="handleSearchVisable"></el-button>
      </el-tooltip>
    </div>
  
    <div class="search-container" v-show="searchVisable">
      <div class="title">
        Search tools
      </div>
      <GeoSearchConditions @outputSearchData="handleSearchData($event)" @dataReset="handleDataReset($event)"></GeoSearchConditions>
    </div>
  </div>
</div>
</template>

<script>
import GeoVis from '@/components/visiualization/GeoVis.vue'
import GeoSearchConditions from './GeoSearchConditions.vue';

export default {
  name: 'GeoWithSearch',

  components: {
    GeoVis,
    GeoSearchConditions
  },

  props: {
    geoData: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      searchVisable: true,
      geoSearchData: null,
      dataReset: {}
    }
  },

  mounted() {
    
  },

  methods: {
    // 获取查询数据
    handleSearchData(value) {
      this.geoSearchData = value
    },

    // 是否显示查询
    handleSearchVisable() {
      this.searchVisable = !this.searchVisable
    },

    // 重设数据
    handleDataReset(value) {
      this.dataReset = value
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