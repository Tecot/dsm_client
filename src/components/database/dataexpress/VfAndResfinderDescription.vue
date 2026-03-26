<template>
  <div class="vf-description-container">
    <el-descriptions 
      :title="inputData['qseqid'] + ' > ' + inputData['sseqid'] + ' detail'" 
      direction="vertical" 
      :column="3" 
      size="small" 
      border
    >
      <el-descriptions-item label="Qseqid">
        {{ inputData['qseqid'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Sseqid">
        {{ inputData['sseqid'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Length (bp)">
        {{ inputData['length'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Bitscore">
        {{ inputData['bitscore'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Evalue">
        {{ inputData['evalue'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Gapopen">
        {{ inputData['gapopen'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Mismatch">
        {{ inputData['mismatch'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Pident">
        {{ inputData['pident'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Qcovs">
        {{ inputData['qcovs'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Qlen">
        {{ inputData['qlen'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Send">
        {{ inputData['send'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Slen">
        {{ inputData['slen'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Sstart">
        {{ inputData['sstart'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Tqend">
        {{ inputData['tqend'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Tqstart">
        {{ inputData['tqstart'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Stitle">
        {{ inputData['stitle'] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'VfAndResfinderDescription',

  props: {
    inputData: {
      type: Object,
      required: true,
      default() {
        return null
      }
    }
  },

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>