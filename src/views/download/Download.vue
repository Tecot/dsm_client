<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-09-03 11:31:19
 * @Description: 
-->
<template>
  <div class="download-container">
    <!-- <div class="download-source">
      <DownloadDatabaseInformation></DownloadDatabaseInformation>
    </div> -->
    

    <div class="download-source">
      <DownloadInformation></DownloadInformation>
    </div>
    
  </div>
</template>

<script>
import DownloadDatabaseInformation from '@/components/download/DownloadDatabaseInformation.vue';
import DownloadInformation from '@/components/download/DownloadInformation.vue';

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
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  components: {
    DownloadDatabaseInformation,
    DownloadInformation
  },

  mounted() {
    
  },

  methods: {

  },
};
</script>

<style lang="scss"scoped>
.download-container {
  .download-source {
    margin-top: 10px;
  }
  .title-container {
    font-size: 18px;
    font-weight: 700;
    color: #36A3F7;
  }
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