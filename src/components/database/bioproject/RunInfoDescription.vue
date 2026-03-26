<template>
  <div class="run-info-description">
    <el-descriptions 
      :title="runDetailData['Run'] + ' detail'" 
      direction="vertical" 
      :column="3" 
      size="small" 
      border
    >
      <el-descriptions-item
        v-for="(item, index) in runHeader"
        :key="index" 
        :label="item"
        :labelStyle="descriptionsItemStyle"
      >
        {{ runDetailData[item] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'RunInfoDescription',

  props: {
    runDetailData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      descriptionsItemStyle: {
        backgroundColor: '#E9ECEF',
        color: '#44546A'
      },
      runHeader: [
        'Run', 
        'LibraryStrategy', 
        'LibrarySelection', 
        'LibrarySource', 
        'LibraryLayout', 
        'Platform', 
        'BioSample', 
        'geographic location',
        'latitude', 
        'longitude',
        'depth',
        'collection date'
      ]
    }
  },
}
</script>