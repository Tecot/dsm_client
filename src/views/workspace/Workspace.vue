<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-12-11 13:28:06
 * @Description: 
-->
<template>
  <div class="container">
    <div class="title">
      Task query
    </div>
    <div class="search">
      <div class="search-input">
        <el-input style="width: 40%;" v-model="searchData" placeholder="Please enter your task ID"></el-input>
        <el-button icon="el-icon-search" @click="handuleSearchData()">Search</el-button>
        <el-button icon="el-icon-help" @click="handuleReset()">Reset</el-button>
      </div>
      <div class="tip">
        You could check the submitted task by Task ID.
      </div>
    </div>
    <div class="submitted-tasks">
      <div class="up">
        Submitted task(s) <el-button icon="el-icon-refresh" size="mini" type="primary" @click="refreshTask()">Refresh status</el-button>
      </div>
      <div class="tip">
        You could check the submitted task by Task ID.
      </div>
    </div>
    <div class="task-table-container">
      <div class="table-container">
        <el-table
          size="small"
          style="width: 100%;"
          max-height="200"
          :data="tabelData"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column prop="id" label="Task ID" width="200px" fixed="left"></el-table-column>
          <el-table-column prop="createTime" label="Create Time"></el-table-column>
          <el-table-column label="Status">
            <template slot-scope="scope">
              <el-tag :type="processStatusesColor(scope.row['status'])">{{ scope.row['status'] | statusesFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Option" width="200px" fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="processResultButtonStatus(scope.row['status'])" @click="processDownloadResult(scope.row['id'])" type="success" size="mini">
                Result
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="tasks.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import Cookies from 'js-cookie';

export default {
  name: 'Workspace',

  data() {
    return {
      searchData: '',
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#C8D6DF', 
        color: '#000'
      },
      cellStyle: {
        textAlign: 'center'
      },
      tasks: [],
      memberTasks: [],
      tabelData: [],
      currentPage: 1,
      pageSize: 5
    };
  },

  mounted() {
    this.refreshTask()
  },

  methods: {
    refreshTask() {
      this.searchData = ''
      const cookies = Cookies.get();
      const tasks = []
      const keys = []
      for (let key in cookies) {
        if(key.startsWith('mmd')) {
          keys.push(key)
          tasks.push({
            id: key,
            createTime: this.processCreateTime(key.split('-')[1]),
          })
        }
      }
      // 请求状态
      if(keys.length) {
        showLoading()
        axios.get(config.baseUrl + config.uri.taskStatuesViewURI + '/' + keys.join('$'), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then((response) => {
          const data = response.data.data
          const ptasks = []
          tasks.forEach((item) => {
            for(let i = 0; i < data.length; i++) {
              if(item.id === data[i].key) {
                ptasks.push({
                  ...item,
                  status: data[i].status
                })
              }
            }
          })
          this.tasks = ptasks
          this.memberTasks = ptasks
          this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
        })
        .finally(() => {
          hideLoading()
        })
      }
    },
    processCreateTime(str_time) {
      const timeArray = str_time.split('__')
      let formatTime = timeArray[0].replaceAll('_', '-') + ' ' + timeArray[1].replaceAll('_', ':')
      return formatTime
    },
    handuleSearchData() {
      this.currentPage = 1
      this.pageSize = 5
      if(this.searchData) {
        const searchTasks = []
        this.memberTasks.forEach((task) => {
          if(task['id'].includes(this.searchData)) {
            searchTasks.push(task)
          }
        })
        this.tasks = searchTasks
      } else {
        this.tasks = this.memberTasks
      }
      this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
    },
    handuleReset() {
      this.refreshTask()
    },
    handleSizeChange(value) {
      this.currentPage = 1
      this.pageSize = value
      this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
    },
    handleCurrentChange(value) {
      this.currentPage = value
      this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
    },
    paginationControler(array, currentPage, pageSize) {
      const totle = array.length
      let sliceData = []
      if(totle - pageSize * currentPage > 0) {
        sliceData = array.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      } else {
        sliceData = array.slice(pageSize * (currentPage - 1), totle)
      }
      return sliceData
    },
    processStatusesColor(value) {
      if(value === 0) {
        return 'success'
      }
      if(value === 1) {
        return 'danger'
      }
      if(value === 2) {
        return 'warning'
      }
    },
    processResultButtonStatus(value) {
      if(value === 0) {
        return false
      }
      return true
    },
    processDownloadResult(id) {
      this.requestDownload(id)
    },
    async requestDownload(id) {
      const url = config.baseUrl + config.uri.downloadTaskreSultURI + '/' + id
      return axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        this.blobDownload(response, id)
      }).catch((e) => {
        this.$notify({
          title: 'Error',
          message: 'Download error',
          type: 'error'
        });
      })
    },
    blobDownload(blobObject, id) {
      const url = window.URL.createObjectURL(new Blob([blobObject.data]));
      const link = document.createElement('a');
      link.href = url;
      link.id = 'download_link'
      link.setAttribute('download', id + '.zip'); 
      document.body.appendChild(link);
      link.click();
      const elementToRemove = document.getElementById(link.id);
      const parentElement = elementToRemove.parentNode;
      parentElement.removeChild(elementToRemove);
    },
  },
  filters: {
    statusesFormat(value) {
      if(value === 0) {
        return 'Success'
      }
      if(value === 1) {
        return 'Faild'
      }
      if(value === 2) {
        return 'Processing'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }
  .tip {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    text-align: center;
  }
  .search {
    .search-input {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      .el-button {
        margin-left: 10px;
        color: #1371B9;
      }
    }
  }
  .submitted-tasks {
    margin-top: 100px;
    .up {
      height: 40px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        border-radius: 20px 20px 20px 20px;
        margin-left: 20px;
      }
    }
  }
  .task-table-container {
    margin-top: 20px;
    padding-left: 10%;
    padding-right: 10%;
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>