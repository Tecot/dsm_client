<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-08-13 12:10:01
 * @Description: 
-->
<template>
  <div class="mop-information-container">
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        max-height="300"
        style="width: 100%"
      >
        <el-table-column prop="Access" label="Access"></el-table-column>
        <el-table-column prop="AMP_family" label="AMP family"></el-table-column>
        <el-table-column prop="AMP_probability" label="AMP probability"></el-table-column>
        <el-table-column prop="Hemolytic" label="Hemolytic"></el-table-column>
        <el-table-column prop="Hemolytic_probability" label="Hemolytic probability"  width="350"></el-table-column>
        <el-table-column label="Sequence">
          <template slot-scope="scope">
            {{ scope.row['Sequence']? scope.row['Sequence'].slice(0, 10) + '......' : '' }}
          </template>
        </el-table-column>
        
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
  name: 'MacrelOuPredictionInformation',

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
			displayOriginalTable: true,
      tableData: [],
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        this.requestMacrelOutPredictionInfo(newValue, this.currentPage, this.pageSize)
      }
    }
  },

  methods: {
    async requestMacrelOutPredictionInfo(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.macrelOutPredictionViewURI + '/' + srp + '/' + currentPage + '/' + pageSize
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
      this.requestMacrelOutPredictionInfo(this.srp, this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      this.requestMacrelOutPredictionInfo(this.srp, this.currentPage, this.pageSize)
    },

    handleDetail(value) {
      this.$emit('mopData', value)
    }
  },
};
</script>

<style lang="scss"scoped>
.mop-information-container {
  .table-container {
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