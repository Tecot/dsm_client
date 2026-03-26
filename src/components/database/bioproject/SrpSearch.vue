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
            Bioproject
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.bioProjectText" 
              size="mini"
              placeholder="Please input bioproject"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            SRAStudy
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.srastudyText" 
              size="mini"
              placeholder="Please input SRAStudy"
            >
            </el-input>
          </div>
        </div>

        <!-- <div class="search-condition-container">
          <div class="title">
            Project ID
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.projectID" 
              size="mini"
              placeholder="Please input project ID"
            >
            </el-input>
          </div>
        </div> -->

        <!-- <div class="search-condition-container">
          <div class="title">
            Center name
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.centerName" 
              size="mini"
              placeholder="Please input center name"
            >
            </el-input>
          </div>
        </div> -->

        <!-- <div class="search-condition-container">
          <div class="title">
            Submission
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.submission" 
              size="mini"
              placeholder="Please input submission"
            >
            </el-input>
          </div>
        </div> -->

        <div class="search-condition-container">
          <div class="title">
            Gene
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.gene" 
              size="mini"
              placeholder="Please input gene"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Vfs
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.stitle" 
              size="mini"
              placeholder="Please input vfs"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            ARGs
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.sseqid" 
              size="mini"
              placeholder="Please input args"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Taxonome
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.classification" 
              size="mini"
              placeholder="Please input taxonome"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            AMPs
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.product" 
              size="mini"
              placeholder="Please input AMPs"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Depth range: {{ '[' + searchContent.depthRange[0] + 'm , ' + searchContent.depthRange[1] + 'm]' }}
          </div>
          <div class="search-container" style="padding-left: 10px; padding-right: 10px;">
            <el-slider
              range
              show-stops
              v-model="searchContent.depthRange"
              :max="12000"
              :format-tooltip="(value) => value + ' m' ">
            </el-slider>
          </div>
          <div class="known-checked">
            <el-checkbox v-model="searchContent.includeUnknownDepth">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Longitude and latitude range
          </div>
          <div class="search-container llr">
            <div class="left">
              <div class="sub-title">
                W~E: {{ '[' + searchContent.weRange[0] + '° , ' + searchContent.weRange[1] + '°]' }}
              </div>
              <el-slider
                range
                show-stops
                v-model="searchContent.weRange"
                :max="180"
                :min="-180"
                :format-tooltip="(value) => value + '°' ">
              </el-slider>
            </div>
            <div class="right">
              <div class="sub-title">
                S~N: {{ '[' + searchContent.snRange[0] + '° , ' + searchContent.snRange[1] + '°]' }}
              </div>
              <el-slider
                range
                show-stops
                v-model="searchContent.snRange"
                :max="90"
                :min="-90"
                :format-tooltip="(value) => value + '°' ">
              </el-slider>
            </div>
          </div>
          <div class="known-checked">
            <el-checkbox v-model="searchContent.includeUnknownll">
              Contain unknown?
            </el-checkbox>
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
  name: 'SrpSearch',

  components: {
    
  },

  data() {
    return {
      searchConditionsVisible: false,
      searchContent: {
        bioProjectText: '',
        srastudyText: '',
        // projectID: '',
        // centerName: '',
        // submission: '',
        gene: '',
        stitle: '',
        sseqid: '',
        classification: '',
        product: '',
        depthRange: [0, 12000],
        weRange: [-180, 180],
        snRange: [-90, 90],
        includeUnknownDepth: true,
        includeUnknownll: true
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
      this.$emit('outputSearchData', this.searchContent)
    },

    searchConditionsReset() {
      this.searchContent = {
        bioProjectText: '',
        srastudyText: '',
        // projectID: '',
        // centerName: '',
        // submission: '',
        gene: '',
        stitle: '',
        sseqid: '',
        classification: '',
        product: '',
        depthRange: [0, 12000],
        weRange: [-180, 180],
        snRange: [-90, 90],
        includeUnknownDepth: true,
        includeUnknownll: true
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