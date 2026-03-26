<template>
  <div class="search">
    <div class="search-option">
      <el-select 
        filterable
        v-model="srp" 
        size="mini"
        placeholder="Please select bioproject"
        @change="handleChangedSrp" 
      >
        <el-option
          v-for="item, index in srps"
          :key="index"
          :label="'SRAStudy: ' + item" 
          :value="item"
        >
        </el-option>
      </el-select>
      
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
      <div class="contigs-project-search-conditions-container">
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
            VFs
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.stitle" 
              :disabled="searchContent.ifSearchStitleUnknown"
              size="mini"
              placeholder="Please input stitle"
            >
            </el-input>
          </div>
          <div class="known-checked">
            <el-checkbox 
              v-model="searchContent.ifSearchStitleUnknown">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            ARGs
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.sseqid" 
              :disabled="searchContent.ifSearchSseqidUnknown"
              size="mini"
              placeholder="Please input sseqid"
            >
            </el-input>
          </div>
          <div class="known-checked">
            <el-checkbox 
              v-model="searchContent.ifSearchSseqidUnknown">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Genes
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.genes" 
              :disabled="searchContent.ifSearchGenesUnknown"
              size="mini"
              placeholder="Please input genes"
            >
            </el-input>
          </div>
          <div class="known-checked">
            <el-checkbox 
              v-model="searchContent.ifSearchGenesUnknown">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Bin
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.bin"
              :disabled="searchContent.ifSearchBinUnknown" 
              size="mini"
              placeholder="Please input bin"
            >
            </el-input>
          </div>
          <div class="known-checked">
            <el-checkbox 
              v-model="searchContent.ifSearchBinUnknown">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Taxonome
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.classification"
              :disabled="searchContent.ifSearchClassificationUnknown" 
              size="mini"
              placeholder="Please input classification"
            >
            </el-input>
          </div>
          <div class="known-checked">
            <el-checkbox 
              v-model="searchContent.ifSearchClassificationUnknown">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Secondary Metabolites
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.product"
              :disabled="searchContent.ifSearchProductUnknown" 
              size="mini"
              placeholder="Please input secondary metabolites"
            >
            </el-input>
          </div>
          <div class="known-checked">
            <el-checkbox 
              v-model="searchContent.ifSearchProductUnknown">
              Contain unknown?
            </el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Length range:  {{ '[' + searchContent.lengthRange[0] + ' bp , ' + searchContent.lengthRange[1] + ' bp]' }}
          </div>
          <div class="search-container">
            <el-slider
              range
              show-stops
              v-model="searchContent.lengthRange"
              :max="5000"
              :min="0"
              :format-tooltip="(value) => value + ' bp' "
            >
            </el-slider>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            GC content range:  {{ '[' + searchContent.gcRange[0] + '% , ' + searchContent.gcRange[1] + '%]' }}
          </div>
          <div class="search-container">
            <el-slider
              range
              show-stops
              v-model="searchContent.gcRange"
              :max="100"
              :min="0"
              :format-tooltip="(value) => value + '%' "
            >
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
import config from '@/config'
import axios from 'axios';

export default {
  name: 'ContigsProjectSearch',

  data() {
    return {
      srp: '',
      srps: [],
      searchConditionsVisible: false,

      searchContent: {
        name: '',
        id: '',
        description: '',
        stitle: '',
        sseqid: '',
        genes: '',
        bin: '',
        classification: '',
        product: '',
        lengthRange: [0, 6000],
        gcRange: [0, 100],
        ifSearchStitleUnknown: false,
        ifSearchSseqidUnknown: false,
        ifSearchGenesUnknown: false,
        ifSearchBinUnknown: false,
        ifSearchClassificationUnknown: false,
        ifSearchProductUnknown: false
      }
    };
  },

  mounted() {
    this.requestSrpDirNames()
  },

  methods: {
    async requestSrpDirNames() {
      const url = config.baseUrl + config.uri.srpDirNamesViewURI
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.srps = response.data.data
        this.srp = this.srps[0]
        this.$emit('outputSrp', this.srp)
      })
    },

    handleChangedSrp() {
      this.$emit('outputSrp', this.srp)
    },

    reset() {
      this.$emit('outputResetSignal', true)
    },

    searchConfirm() {
      this.searchConditionsVisible = false
      this.$emit('outputSearchData', {
        name: this.searchContent.name,
        id: this.searchContent.id,
        description: this.searchContent.description,
        stitle: this.searchContent.stitle,
        sseqid: this.searchContent.sseqid,
        genes: this.searchContent.genes,
        bin: this.searchContent.bin,
        classification: this.searchContent.classification,
        product: this.searchContent.product,
        lengthLow: this.searchContent.lengthRange[0],
        lengthHigh: this.searchContent.lengthRange[1],
        gcLow: this.searchContent.gcRange[0],
        gcHigh: this.searchContent.gcRange[1],
        ifSearchStitleUnknown: this.searchContent.ifSearchStitleUnknown,
        ifSearchSseqidUnknown: this.searchContent.ifSearchSseqidUnknown,
        ifSearchGenesUnknown: this.searchContent.ifSearchGenesUnknown,
        ifSearchBinUnknown: this.searchContent.ifSearchBinUnknown,
        ifSearchClassificationUnknown: this.searchContent.ifSearchClassificationUnknown,
        ifSearchProductUnknown: this.searchContent.ifSearchProductUnknown
      })
    },

    searchConditionsReset() {
      this.searchContent = {
          name: '',
          id: '',
          description: '',
          stitle: '',
          Sseqid: '',
          genes: '',
          bin: '',
          classification: '',
          product: '',
          lengthRange: [0, 6000],
          gcRange: [0, 100],
          ifSearchStitleUnknown: false,
          ifSearchSseqidUnknown: false,
          ifSearchGenesUnknown: false,
          ifSearchBinUnknown: false,
          ifSearchClassificationUnknown: false,
          ifSearchProductUnknown: false
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
    span {
      font-size: 18px;
    }
    .el-select {
      margin-right: 10px;
    }
  }
  .contigs-project-search-conditions-container {

    .known-checked {
      display: flex;
      justify-content: end;
    } 

    .search-condition-container {
      margin-top: 5px;
      .title {
        font-size: 14px;
      }
      .search-container {
        margin-top: 5px;
      }
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>