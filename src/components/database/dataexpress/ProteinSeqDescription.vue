<template>
  <div class="protein-seq-detail">
    <el-descriptions
      :title="proteinSeqInfo['ID'] + ' protein detail'" 
      direction="vertical" 
      :column="2" 
      size="small" 
      border
    >
      <el-descriptions-item label="ID">
        {{ proteinSeqInfo['ID'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Name">
        {{ proteinSeqInfo['Name'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Length (bp)">
        {{ proteinSeqInfo['Length'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Description">
        {{ proteinSeqInfo['Description'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Sequence" :span="2">
        <el-input
          type="textarea"
          :value="getCompleteSeq(proteinSeqInfo)"
          :autosize="true"
          :spellcheck="false"
          resize="none"
        >
        </el-input>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'ProteinSeqDescription',

  props: {
    proteinSeqInfo: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      
    };
  },

  mounted() {

  },

  watch: {

  },

  methods: {
    getCompleteSeq(proteinSeqInfo) {
      return '>' + proteinSeqInfo['Description'] + '\n' + proteinSeqInfo['Sequence']
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep textarea {
  font-size: 12px;
  border: none;
}
</style>