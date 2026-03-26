<template>
  <div class="protein-seq-detail">
    <el-descriptions
      :title="mopInfo['Access'] + ' macrel out prediction description'" 
      direction="vertical" 
      :column="5" 
      size="small" 
      border
    >
      <el-descriptions-item label="Access">
        {{ mopInfo['Access'] }}
      </el-descriptions-item>
      <el-descriptions-item label="AMP family">
        {{ mopInfo['AMP_family'] }}
      </el-descriptions-item>
      <el-descriptions-item label="AMP probability">
        {{ mopInfo['AMP_probability'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Hemolytic">
        {{ mopInfo['Hemolytic'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Hemolytic probability">
        {{ mopInfo['Hemolytic_probability'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Sequence" :span="5">
        <el-input
          type="textarea"
          :value="mopInfo['Sequence']"
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
  name: 'MacrelOutPredictionDescription',

  props: {
    mopInfo: {
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

  methods: {
    
  },
};
</script>