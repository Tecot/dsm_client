<template>
  <div class="srp-search-conditions-container">
    <div class="depth-search-item">
      <div class="title">
        Depth range
      </div>
      <div class="search-condition">
        <el-slider
          range
          show-stops
          v-model="depthRange"
          :max="6000"
          :format-tooltip="(value) => value + ' m' ">
        </el-slider>
      </div>
    </div>

    <div class="ll-search-item">
      <div class="title">
        Longitude and latitude range
      </div>
      <div class="up">
        <div class="left">
          <div class="sub-title">W~E: {{ '[' + weRange[0] + '° , ' + weRange[1] + '°]' }}</div>
          <el-slider
            range
            show-stops
            v-model="weRange"
            :max="180"
            :min="-180"
            :format-tooltip="(value) => value + '°' ">
          </el-slider>
        </div>
        <div class="right">
          <div class="sub-title">
            S~N: {{ '[' + snRange[0] + '° , ' + snRange[1] + '°]' }}
          </div>
          <el-slider
            range
            show-stops
            v-model="snRange"
            :max="90"
            :min="-90"
            :format-tooltip="(value) => value + '°' ">
          </el-slider>
        </div>
      </div>
    </div>

    <div class="button-container">
      <el-button size="mini" type="danger" @click="searchConfirm">
        Search
      </el-button>
      <el-button size="mini" type="primary" @click="searchConditionsReset">
        Reset conditions
      </el-button>
      <el-button size="mini" type="primary" @click="dataReset">
        Reset data
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoSearchConditions',

  data() { 
    return {
      depthRange: [0, 6000],
      weRange: [-180, 180],
      snRange: [-90, 90],
      searchMemory: {
        depthRange: [0, 6000],
        weRange: [-180, 180],
        snRange: [-90, 90]
      },
    };
  },

  mounted() {
    
  },

  methods: {
    searchConfirm() {
      const depthFalg = this.searchMemory.depthRange[0] === this.depthRange[0] && this.searchMemory.depthRange[1] === this.depthRange[1]
      const weRangeFlag = this.searchMemory.weRange[0] === this.weRange[0] && this.searchMemory.weRange[1] === this.weRange[1]
      const snRangeFlag = this.searchMemory.snRange[0] === this.snRange[0] && this.searchMemory.snRange[1] === this.snRange[1]
      if(!(depthFalg && weRangeFlag && snRangeFlag)) {
        const searchData = {
          depthRange: this.depthRange,
          weRange: this.weRange,
          snRange: this.snRange
        }
        this.searchMemory = searchData
        this.$emit('outputSearchData', searchData)
      }
    },

    searchConditionsReset() {
      this.depthRange = [0, 6000]
      this.weRange = [-180, 180]
      this.snRange = [-90, 90]
    },

    dataReset() {
      this.$emit('dataReset', { signal: true })
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-slider__bar {
  background-color: #5DE06C;
}

::v-deep .el-slider__button {
  background-color: #FFD000;
  border: none;
}

.srp-search-conditions-container {
  .depth-search-item {
    .title {
      font-size: 14px;
      color: #FFF;
    }
    .search-condition {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .ll-search-item {
    .title {
      font-size: 14px;
      color: #FFF;
    }
    .sub-title {
      font-size: 12px;
      color: #FFF;
      margin-top: 10px;
    }
    .up {
      display: flex;
      padding-left: 10px;
      padding-right: 10px;
      justify-content: space-between;
      .left {
        width: 45%;
      }
      .right {
        width: 45%;
      }
    }
  }



  .button-container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
}
</style>