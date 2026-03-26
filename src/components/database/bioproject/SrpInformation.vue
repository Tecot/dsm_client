<template>
  <div class="srp-information-container">
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        max-height="500"
        style="width: 100%"
      >
        <el-table-column prop="BioProject" label="Bioproject" width="200"></el-table-column>
        <el-table-column prop="SRAStudy" label="SRAStudy" width="200"></el-table-column>
        <!-- <el-table-column prop="ProjectID" label="Project ID" width="200"></el-table-column> -->
        <!-- <el-table-column prop="Submission" label="Submission" width="200"></el-table-column> -->
        <el-table-column prop="Depth range" label="Depth range" width="200"></el-table-column>
        <el-table-column prop="Longitude and latitude range" label="Longitude and latitude range"  width="350"></el-table-column>
        <!-- <el-table-column prop="CenterName" label="Center name" width="400"></el-table-column> -->
        <el-table-column label="Genes" width="200">
          <template slot-scope="scope">
            {{ scope.row['genes']? scope.row['genes'].split(';').slice(0, 3).join(';') + '......' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="taxonome" label="Taxonome" width="600"></el-table-column>
        <el-table-column prop="vfs" label="VFs" width="400">
          <template slot-scope="scope">
              {{ scope.row['vfs']? scope.row['vfs'].split(';').slice(0, 3).join(';') + '......' : '' }}
            </template>
          </el-table-column>
        <el-table-column prop="args" label="ARGs" width="600"></el-table-column> 
        <el-table-column prop="product" label="Secondary Metabolites" width="600"></el-table-column>

        <!-- amps -->
        
        <el-table-column label="Option" width="100" class-name="header-end-cell" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row)">
              Detail
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
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'


export default {
  name: 'SrpInformation',

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
      displayOriginalTable: true,
      tableData: [],
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  mounted() {
    this.requestBioProjectInfo(this.currentPage, this.pageSize)
  },

  methods: {
    requestBioProjectInfo(currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.srpProjectViewURI + '/' + currentPage + '/' + pageSize
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
      this.requestBioProjectInfo(this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      this.requestBioProjectInfo(this.currentPage, this.pageSize)
    },

    handleDetail(value) {
      this.$router.push({
        name: 'runproject', 
        params: { 
          param: value
        }
      })
    }
  },
};
</script>

<style lang="scss"scoped>
.srp-information-container {
  .table-container {
    margin-top: 20px;
    ::v-deep .header-end-cell>.cell {
      color: #409EFF;
      font-size: 14px;
    }
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>