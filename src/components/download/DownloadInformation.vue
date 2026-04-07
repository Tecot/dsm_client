<template>
  <div class="download-container">
    <div class="title-container">
      <el-card>
        <p>The following datasets are available for download, including VFGs (Virulence Factors), ARGs (Antibiotic Resistance Genes), taxonomic annotations, AMP (Antimicrobial Peptide) results, BGCs (Biosynthetic Gene Clusters) results, and protein structures.</p>
        <p><strong><i>Note</i></strong>: Protein structure files are stored in compressed archives named using the format: Bioproject_ID_Quantity.</p>
      </el-card>
    </div>
    
    <div class="table-container">
      <el-card class="table_up">
        <el-table
          :data="tableData.analysis"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
          size="small"
          style="width: 100%"
        >
          <el-table-column prop="file" label="Dataset"></el-table-column>
          <el-table-column prop="size" label="Size"></el-table-column>
          <el-table-column label="Download">
            <template slot-scope="scope">
              <a :href="scope.row.url" class="download-btn">
                <i  class="el-icon-download" style="font-size: 20px; color: #1890ff;"></i>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="table-down">
        <el-table
          :data="tableData.datasets"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
          size="small"
          style="width: 100%"
        >
          <el-table-column prop="file" label="Dataset"></el-table-column>
          <el-table-column prop="size" label="Size"></el-table-column>
          <el-table-column label="Download">
            <template slot-scope="scope">
              <a :href="scope.row.url" class="download-btn">
                <i  class="el-icon-download" style="font-size: 20px; color: #1890ff;"></i>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'DownloadInformation',

  data() {
    return {
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#324277', 
        color: '#FFFFFF',
        fontSize: '18px'
      },
      cellStyle: {
        textAlign: 'center',
        fontSize: '16px'
      },
      tableData: [],
    };
  },

  mounted() {
    const downloadList = this.$store.state.downloadFiles
    if(downloadList) {
      this.tableData = downloadList
    } else {
      this.requestDownloadListInfo()
    }
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
        const datasets = []
        const analysis = []
        response.data.data.forEach(item => {
          if(['BGCs.zip', 'AMPs.zip', 'vf_res.zip', 'taxnome.zip'].includes(item.file)) {
            analysis.push({
              file: item.file,
              size: item.size,
              url: config.baseUrl + config.uri.downloadURI + '/' + item.file
            })
          } else {
            datasets.push({
              file: item.file,
              size: item.size,
              url: config.baseUrl + config.uri.downloadURI + '/' + item.file
            })
          }
        })
        this.$store.dispatch('setDownloadFiles', {
          datasets: datasets,
          analysis: analysis
        })
        this.tableData = {
          datasets: datasets,
          analysis: analysis
        }
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
  padding: 20px 20% 20px 20%;

  .title-container {
    .el-card {
      font-size: 18px;
      font-weight: 700;
      color: #36A3F7;
    }
    
  }


  .table-container {
    margin-top: 20px;

    .table_up {
      margin-bottom: 20px;
    }
  }
}
</style>