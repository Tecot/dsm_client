<template>
    <div class="table-container">
      <div class="search-container">
        <div class="title-container">
          {{ ifSearchedContigList? 'Searched contig list' : 'Contig list' }}
        </div>
        <div class="search-conditions-container">
          <ContigSearchedInformation
            @outputSearchData="handleSearchData($event)"
            @outputResetSignal="handleResetSignal($event)"
          >
          </ContigSearchedInformation>
        </div>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        height="300"
        style="width: 100%"
      >
        <el-table-column prop="Name" label="Name"></el-table-column>
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="Description" label="Description"></el-table-column>
        <el-table-column prop="Length" label="Length (bp)"></el-table-column>
        <el-table-column prop="GC" label="GC (%)"></el-table-column>
        <el-table-column label="Sequence">
          <template slot-scope="scope">
            {{ scope.row['Sequence'].slice(0, 10) + ' ...' }}
          </template>
        </el-table-column>

        <el-table-column label="Option" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleView(scope.row)">
              View
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="number">
        Number: {{ tableData.length }}
      </div>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'
import ContigSearchedInformation from './ContigSearchedInformation.vue';

export default {
  name: 'ContigsInformation',

  components: {
    ContigSearchedInformation
  },

  props: {
    srp: {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  },

  data() {
    return {
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#E9ECEF', 
        color: '#44546A'
      },
      cellStyle: {
        textAlign: 'center'
      },

      ifSearchedContigList: false,

      tableData: [],
      total: 0,
    };
  },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        this.requestContigsInformation(this.srp)
      }
    }
  },

  mounted() { },

  methods: {
    handleSearchData(value) {
      this.ifSearchedContigList = true
      this.searchData = { 
        ...value, 
        srp: this.srp
      }
      this.requestContigsSearchedInformation(this.searchData)
    },

    handleResetSignal(value) {
      if(this.ifSearchedContigList) {
        this.ifSearchedContigList = false
        this.requestContigsInformation(this.srp)
      }
    },

    requestContigsSearchedInformation(searchConditions) {
      showLoading()
      const url = config.baseUrl + config.uri.contigsSearchedInformationViewURI
      axios.get(url, {
        headers: {
        'Content-Type': 'application/json; charset=utf-8' 
        },
        params: {
          ...searchConditions
        }
      }).then((response) => {
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },


    requestContigsInformation(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.contigsInformationViewURI + '/' + srp
      axios.get(url, {
        headers: {
        'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },

    handleView(value) {
      // TODO
      this.$router.push({
        name: 'contigsdataexpress',
        params: { 
          param: {
            ...value,
            srp: this.srp
          }
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-container {
      font-size: 18px;
      font-weight: 700;
      color: #36A3F7;
    }
  }
  .el-table {
    margin-top: 20px;
  }
  .number {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 20px;
    color: #44546A;
  }
}
</style>