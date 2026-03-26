<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      size="small"
      max-height="300"
      style="width: 100%"
    >								
        <el-table-column prop="bin" label="Bin"></el-table-column>
        <el-table-column prop="species" label="Species" width="200"></el-table-column>
        <el-table-column prop="genus" label="Genus" width="200"></el-table-column>
        <el-table-column prop="family" label="Family" width="200"></el-table-column>
        <el-table-column prop="order" label="Order" width="200"></el-table-column>
        <el-table-column prop="class" label="Class" width="200"></el-table-column>
        <el-table-column prop="phylum" label="Phylum" width="200"></el-table-column>
        <el-table-column prop="domain" label="Domain" width="200"></el-table-column>
        <el-table-column prop="fastaniReference" label="Fastani reference" width="200"></el-table-column>
        <el-table-column prop="closestPlacementReference" label="Closest placement reference" width="200"></el-table-column>
        <el-table-column prop="completeness" label="Completeness" width="200"></el-table-column>
        <el-table-column prop="contamination" label="Contamination" width="200"></el-table-column>
        <el-table-column prop="gc" label="GC" width="200"></el-table-column>
        <el-table-column prop="n50" label="N50" width="200"></el-table-column>
        <el-table-column prop="size" label="Size" width="200"></el-table-column>
        <el-table-column prop="fastaniAni" label="Fastani ani" width="200"></el-table-column>
        <el-table-column prop="fastaniAf" label="Fastani af" width="200"></el-table-column>
        <el-table-column prop="closestPlacementAni" label="Closest placement ani" width="200"></el-table-column>
        <el-table-column prop="closestPlacementAf" label="Closest placement af" width="200"></el-table-column>
        <el-table-column prop="msaPercent" label="Msa percent" width="200"></el-table-column>
        
      <el-table-column label="Option" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';

export default {
  name: 'BinInformation',

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
      tableData: []
    };
  },

  mounted() { },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        this.requestBinInfo(newValue)
      }
    }
  },

  methods: {
    async requestBinInfo(srp) {
      const url = config.baseUrl + config.uri.binViewURI + '/' + srp
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.tableData = response.data.data
      })
    },
    handleView(value) {
      this.$emit('binDescriptionSignal', value)
    }
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
}
</style>