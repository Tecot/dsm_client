<template>
  <div class="description-container">
    <el-descriptions direction="vertical" :column="7" size="small" border>
        <el-descriptions-item 
          v-for="(item, index) in srpDescriptionLabel" 
          :key="index"
          :label="item"
          :labelStyle="descriptionsItemStyle"
        >
          {{ srpData[item] }}
        </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'SrpDescription',

  props: {
    srpData: {
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
      srpDescriptionLabel: [
        'SRAStudy', 
        'BioProject', 
        'ProjectID', 
        'Submission', 
        'Longitude and latitude range', 
        'Depth range',
        'CenterName'
      ]
    };
  },

  methods: { },
};
</script>