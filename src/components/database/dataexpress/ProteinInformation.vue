<template>
  <div class="protein-seq-container">
    <div class="title-container">
        <span>{{ srp + ' protein sequences' }}</span>
      </div>
    <el-divider></el-divider>
    <el-table
      :data="proteinSeqTableData"
      :header-cell-style="{textAlign: 'center', backgroundColor: 'gray', color: 'white'}"
      :cell-style="{textAlign: 'center'}"
      size="small"
      height="300"
      style="width: 100%"
    >
      <el-table-column prop="ID" label="ID"></el-table-column>
      <el-table-column prop="Name" label="Name"></el-table-column>
      <el-table-column prop="Length" label="Length"></el-table-column>
      <el-table-column prop="Description" label="Description"></el-table-column>
      <el-table-column label="Sequence">
        <template slot-scope="scope">
          {{ scope.row['Sequence'].slice(0, 10) + ' ...' }}
        </template>
      </el-table-column>

      <el-table-column label="Option" width="100">
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
  name: 'ProteinInformation',

  props: {
    srp: String,
    required: true
  },

  data() {
    return {
      proteinSeqTableData: []
    };
  },

  mounted() {
    this.requestProteinSeqInfo(this.srp)
  },

  methods: {
    // 请求蛋白质序列
    requestProteinSeqInfo(srp) {
      const url = config.baseUrl + config.uri.proteinSeqViewURI + '/' + srp
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.proteinSeqTableData = response.data.data
      })
    },

    handleView($event) {
      this.$emit('output-value', $event)
    }
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  font-size: 18px;
  font-weight: 700;
}
</style>