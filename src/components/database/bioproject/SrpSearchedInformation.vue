<template>
  <div class="srp-information-container">
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        max-height="600"
        style="width: 100%"
      >
      <el-table-column prop="BioProject" label="Bioproject" width="200"></el-table-column>
      <el-table-column prop="SRAStudy" label="SRAStudy" width="200"></el-table-column>
      <el-table-column prop="ProjectID" label="Project ID" width="200"></el-table-column>
      <el-table-column prop="Submission" label="Submission" width="200"></el-table-column>
      <el-table-column prop="Depth range" label="Depth range" width="200"></el-table-column>
      <el-table-column prop="Longitude and latitude range" label="Longitude and latitude range"  width="350"></el-table-column>
      <el-table-column prop="CenterName" label="Center name" width="500"></el-table-column>
      <el-table-column prop="genes" label="Genes" width="200">
          <template slot-scope="scope">
            {{ scope.row['genes']? scope.row['genes'].split(';').slice(0, 3).join(';') + '......' : '' }}
          </template>
      </el-table-column>
      <el-table-column prop="vfs" label="VFs" width="400">
        <template slot-scope="scope">
            {{ scope.row['vfs']? scope.row['vfs'].split(';').slice(0, 3).join(';') + '......' : '' }}
          </template>
      </el-table-column>
        <el-table-column prop="args" label="ARGs" width="600"></el-table-column> 
      <el-table-column prop="taxonome" label="Taxonome" width="600"></el-table-column>
      <el-table-column prop="product" label="Product" width="600"></el-table-column>
      
          
        <el-table-column label="Option" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row)">
              Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'SrpSearchedInformation',

  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },

  components: {
    
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
    };
  },

  mounted() {
    
  },

  methods: {
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
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>