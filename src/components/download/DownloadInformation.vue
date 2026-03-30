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
        style="width: 100%"
      >
        <el-table-column prop="file" label="SRA project"></el-table-column>
        <el-table-column prop="size" label="Size"></el-table-column>
        <el-table-column label="Download">
          <template slot-scope="scope">
            <a :href="scope.row.url" class="download-btn">
              <i  class="el-icon-download" style="font-size: 20px; color: #1890ff;"></i>
            </a>
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
        },
        timeout: 300000,
        withCredentials: false
      }).then((response) => {
        const result = response.data.data
        result.forEach(item => {
          this.tableData.push({
            file: item.file,
            size: item.size,
            url: config.baseUrl + config.uri.downloadURI + '/' + item.file
          })
        })
      }).finally(() => {
        hideLoading()
      })
    },

    async requestDownload(srp) {
      try {
        await axios({
          url: config.baseUrl + config.uri.downloadURI + '/' + srp,
          method: 'GET',
          timeout: 300000,
          method: 'GET',
          responseType: 'blob',
        });

        const blob = new Blob([res.data], { type: 'application/zip' })
        const downloadUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = srp
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(downloadUrl)
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