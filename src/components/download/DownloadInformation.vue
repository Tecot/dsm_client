<template>
  <div class="download-container">
    <div class="title-container">
      <span>Download SRA project</span>
    </div>
    
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        max-height="600"
        style="width: 100%"
      >
        <el-table-column prop="file" label="SRA project"></el-table-column>
        
        <el-table-column label="Download">
          <template slot-scope="scope">
            <el-button size="large" @click="handleDownload(scope.row)" icon="el-icon-download" style="border: none;"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'BioProject',

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
      tableData: [],
    };
  },

  mounted() {
    this.requestDownloadListInfo()
  },

  methods: {
    async requestDownloadListInfo() {
      showLoading()
      const url = config.baseUrl + config.uri.downloadListViewURI
      return axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.tableData = response.data.data
      }).finally(() => {
        hideLoading()
      })
    },

    async requestDownload(srp) {
      try {
        const response = await axios({
          url: config.baseUrl + config.uri.downloadURI + '/' + srp,
          method: 'GET',
          responseType: 'blob', // 关键：指定响应类型为二进制
        });

        // 创建下载链接
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', srp); // 设置文件名
        document.body.appendChild(link);
        link.click();
        
        // 清理资源
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        this.$notify({
          title: 'Error',
          message: 'Download error',
          type: 'error'
        })
      }
    },

    blobDownload(blobObject) {
      const url = window.URL.createObjectURL(new Blob([blobObject.data]));
      const link = document.createElement('a');
      link.href = url;
      link.id = 'download_link'
      link.setAttribute('download', 'file.zip'); 
      document.body.appendChild(link);
      link.click();
      const elementToRemove = document.getElementById(link.id);
      const parentElement = elementToRemove.parentNode;
      parentElement.removeChild(elementToRemove);
    },

    handleDownload(value) {
      const file = value.file
      this.requestDownload(file)
    }
  },
};
</script>

<style lang="scss"scoped>
.download-container {
padding-left: 40px;
padding-right: 40px;

.title-container {
  line-height: 60px;
  height: 60px;
  font-size: 18px;
  font-weight: 700;
  color: #36A3F7;
  border-radius: 5px 5px 0 0;
  background-color: #FFF;
  padding-left: 10px;
}


.pagination-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #FFF;
}
}
</style>