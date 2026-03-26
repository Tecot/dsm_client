<template>
  <el-descriptions
    :column="6" 
    direction="vertical" 
    size="small"
    border
  >
    <el-descriptions-item label="ID" :labelStyle="descriptionsItemStyle">
      {{ contigDetail['ID'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Name" :labelStyle="descriptionsItemStyle">
      {{ contigDetail['Name'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Length (bp)" :labelStyle="descriptionsItemStyle">
      {{ contigDetail['Length'] }}
    </el-descriptions-item>
    <el-descriptions-item label="GC (%)" :labelStyle="descriptionsItemStyle">
      {{ contigDetail['GC'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Description" :labelStyle="descriptionsItemStyle">
      {{ contigDetail['Description'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Protein struct" :labelStyle="descriptionsItemStyle">
      <el-button type="primary" size="mini" @click="viewProteinStructSignal">View</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="Sequence" :span="5" :labelStyle="descriptionsItemStyle">
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 2, maxRows: 10 }"
        :value="getCompleteSeq(contigDetail)"
        :spellcheck="false"
      >
      </el-input>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: 'ContigDescription',

  props: {
    contigDetail: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      descriptionsItemStyle: {
        backgroundColor: '#E9ECEF',
        color: '#44546A'
      }
    };
  },

  mounted() {
    
  },

  methods: {
    getCompleteSeq(contigDetail) {
      return '>' + contigDetail['Description'] + '\n' + contigDetail['Sequence']
    },
    viewProteinStructSignal() {
      this.$emit('viewProteinStructSignal', true)
    }
  },
};
</script>