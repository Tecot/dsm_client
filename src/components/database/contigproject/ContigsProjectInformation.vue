<template>
  <div class="table-container">
    <div class="search-container">
      <div class="title-container">
        {{ ifSearchedContigsProject? 'Searched contig list' : 'Contig list' }}
      </div>
      <div class="search-conditions-container">
        <ContigsProjectSearch 
          @outputSrp="handleSrp($event)" 
          @outputSearchData="handleSearchData($event)"
          @outputResetSignal="handleResetSignal($event)"
        >
        </ContigsProjectSearch>
      </div>
      
    </div>
    
    <el-table
      :data="tableData"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      size="small"
      max-height="600"
      style="width: 100%"
    >

      <el-table-column prop="name" label="Name" width="200"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="description" label="Description" width="300"></el-table-column>
      <el-table-column prop="length" label="Length"></el-table-column>
      <el-table-column prop="gc" label="GC"></el-table-column>
      <el-table-column prop="genes" label="Genes"></el-table-column>
      <el-table-column prop="bin" label="Bin"></el-table-column>
      <el-table-column prop="classification" label="Taxonome"></el-table-column>
      <el-table-column prop="stitle" label="VFs"></el-table-column>
      <el-table-column prop="sseqid" label="ARGs"></el-table-column>
      <el-table-column prop="product" label="Secondary Metabolites" width="200"></el-table-column>
      <el-table-column prop="amps" label="AMPs"></el-table-column>
      <el-table-column label="Option" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
              View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import ContigsProjectSearch from '@/components/database/contigproject/ContigsProjectSearch.vue';

export default {
  name: 'ContigsProjectInformation',

  components: {
    ContigsProjectSearch
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

      srp: '',
      ifSearchedContigsProject: false,
      searchData: {},
      displayOriginalTable: true,
      tableData: [],
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  mounted() {
    
  },

  methods: {
    /**
     * 
     * 查询处理
     */
    handleSrp(value) {
      this.srp = value
      this.currentPage = 1
      this.pageSize = 20
      this.ifSearchedContigsProject = false
      this.requestContigProjectInfo(this.srp, this.currentPage, this.pageSize)
    },
    handleSearchData(value) {
      this.currentPage = 1
      this.pageSize = 20
      this.ifSearchedContigsProject = true
      this.searchData = { 
        ...value, 
        srp: this.srp,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.requestSerchedContigProjectInformation(this.searchData)
    },
    handleResetSignal(value) {
      if(this.ifSearchedContigsProject) {
        this.currentPage = 1
        this.pageSize = 20
        this.ifSearchedContigsProject = false
        this.requestContigProjectInfo(this.srp, this.currentPage, this.pageSize)
      }
    },
    async requestSerchedContigProjectInformation(searchConditions) {
      showLoading()
      const url = config.baseUrl + config.uri.contigProjectSearchedViewURI
      return axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        },
        params: {
          ...searchConditions
        }
      }).then((response) => {
        this.header = response.data.header
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },

    /**
     * 处理未查询
     */
    async requestContigProjectInfo(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.contigProjectViewURI + '/' + srp + '/' + currentPage + '/' + pageSize
      return axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.header = response.data.header
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },

    handleSizeChange(value) {
      this.pageSize = value
      this.currentPage = 1
      if(this.ifSearchedContigsProject) {
        this.requestSerchedContigProjectInformation({
          ...this.searchData,
          srp: this.srp,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      } else {
        this.requestContigProjectInfo(this.srp, this.currentPage, this.pageSize)
      }
      
    },

    handleCurrentChange(value) {
      this.currentPage = value
      if(this.ifSearchedContigsProject) {
        this.requestSerchedContigProjectInformation({
          ...this.searchData,
          srp: this.srp,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      } else {
        this.requestContigProjectInfo(this.srp, this.currentPage, this.pageSize)
      }
    },

    handleView(value) {
      // TODO
      // const facdeSRP = value.name.split('_')[0]
      this.$router.push({
        name: 'contigsdataexpress',
        params: { 
          param: {
            Name: value.name,
            ID: value.id,
            Description: value.description,
            GC: value.gc,
            Length: value.length,
            Sequence: value.sequence,
            // srp: this.srp
            srp: this.srp
          }
        }
      })
    }
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
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>