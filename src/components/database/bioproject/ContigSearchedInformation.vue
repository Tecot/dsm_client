<template>
  <div class="search">
    
    <div class="search-option">
      <el-button 
        size="mini" 
        type="danger" 
        style="width: 200px;"
        @click="searchConditionsVisible = true"
      >
        Search
      </el-button>
      <el-button 
        size="mini"
        type="primary"
        @click="reset"
      >
        Reset
      </el-button>
    </div>
    <!-- Search dialog -->
    <el-dialog 
      :visible.sync="searchConditionsVisible" 
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="srp-search-conditions-container">
        <div class="search-condition-container">
          <div class="title">
            Name
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.name" 
              size="mini"
              placeholder="Please input name"
            >
            </el-input>
          </div>
        </div>
    
        <div class="search-condition-container">
          <div class="title">
            ID
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.id" 
              size="mini"
              placeholder="Please input ID"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Description
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.description" 
              size="mini"
              placeholder="Please input description"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Length range: {{ '[' + searchContent.lengthRange[0] + ' bp, ' + searchContent.lengthRange[1] + ' bp]' }}
          </div>
          <div class="search-container" style="padding-left: 10px; padding-right: 10px;">
            <el-slider
              range
              show-stops
              v-model="searchContent.lengthRange"
              :max="6000"
							:min="0"
              :format-tooltip="(value) => value + ' bp' ">
            </el-slider>
          </div>
        </div>

        
        <div class="search-condition-container">
          <div class="title">
            GC range: {{ '[' + searchContent.gcRange[0] + '% , ' + searchContent.gcRange[1] + '%]' }}
          </div>
          <div class="search-container" style="padding-left: 10px; padding-right: 10px;">
            <el-slider
              range
              show-stops
              v-model="searchContent.gcRange"
              :max="100"
							:min="0"
              :format-tooltip="(value) => value + '%' ">
            </el-slider>
          </div>
        </div>

        <div class="button-container">
          <el-button size="mini" type="danger" @click="searchConfirm">
            Confirm
          </el-button>
          <el-button size="mini" type="primary" @click="searchConditionsReset">
            Reset
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContigSearchedInformation',

  components: {
    
  },

  data() {
    return {
      searchConditionsVisible: false,
      searchContent: {
        name: '',
        id: '',
        description: '',
				lengthRange: [0, 6000],
        gcRange: [0, 100],
      }
    };
  },

  mounted() {
    
  },

  methods: {
    reset() {
      this.$emit('outputResetSignal', true)
    },

    searchConfirm() {
      this.searchConditionsVisible = false
      this.$emit('outputSearchData', {
        name: this.searchContent.name,
        id: this.searchContent.id,
        description: this.searchContent.description,
        lengthLow: this.searchContent.lengthRange[0],
        lengthHigh: this.searchContent.lengthRange[1],
        gcLow: this.searchContent.gcRange[0],
        gcHigh: this.searchContent.gcRange[1]
      })
    },

    searchConditionsReset() {
      this.searchContent = {
        name: '',
        id: '',
        description: '',
				lengthRange: [0, 6000],
        gcRange: [0, 100],
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  .search-option {
    display: flex;
    justify-content: right;
  }
  .srp-search-conditions-container {

    .search-condition-container {
      margin-top: 5px;
      .title {
        font-size: 14px;
      }
      .search-container {
        margin-top: 5px;
      }

      .known-checked {
        display: flex; 
        justify-content: end;
      }

      .llr {
        display: flex;
        .sub-title {
          font-size: 12px;
          color: #351c1c;
          margin-top: 10px;
        }
        .left {
          width: 50%;
          padding-left: 10px;
          padding-right: 20px;
        }
        .right {
          width: 50%;
          padding-left: 20px;
          padding-right: 10px;
        }
      }

      
    }

    .button-container {
      display: flex;
      margin-top: 20px;
      justify-content: center;
    }
  }
}
</style>