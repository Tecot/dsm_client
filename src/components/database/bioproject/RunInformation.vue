<template>
  <div class="run-info-table">
    <el-table
      size="small"
      style="width: 100%;"
      max-height="200"
      :data="runData.data"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
    >
      <el-table-column prop="Run" label="Run"></el-table-column>
      <el-table-column prop="LibraryStrategy" label="Library strategy"></el-table-column>
      <el-table-column prop="LibrarySelection" label="Library selection"></el-table-column>
      <el-table-column prop="LibrarySource" label="Library source"></el-table-column>
      <el-table-column prop="LibraryLayout" label="Library layout"></el-table-column>
      <el-table-column prop="Platform" label="Platform"></el-table-column>
      <el-table-column prop="BioSample" label="Bio sample"></el-table-column>
      <el-table-column prop="geographic location" label="Geographic location"></el-table-column>
      <el-table-column prop="longitude" label="Longitude"></el-table-column>
      <el-table-column prop="latitude" label="Latitude"></el-table-column>
      <el-table-column prop="depth" label="Depth"></el-table-column>
      <el-table-column prop="collection date" label="Collection date"></el-table-column>

      <el-table-column label="Option" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleRowData(scope['row'])">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'RunInformation',

  props: {
    runData: {
      type: Object,
      required: true
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
    }
  },
  methods: {
    handleRowData($event) {
      this.$emit('output-value', $event)
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
}
</style>