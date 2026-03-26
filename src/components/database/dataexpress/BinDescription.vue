<template>
  <div class="bin-description-container">
    <el-descriptions 
      :title="srp + ' bin detail'" 
      direction="vertical" 
      :column="4" 
      size="small" 
      border
    >
      <el-descriptions-item label="Bin" :labelStyle="descriptionsItemStyle">
        {{ binDescription['bin'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Species" :labelStyle="descriptionsItemStyle">
        {{ binDescription['species'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Genus" :labelStyle="descriptionsItemStyle">
        {{ binDescription['genus'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Family" :labelStyle="descriptionsItemStyle">
        {{ binDescription['family'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Order" :labelStyle="descriptionsItemStyle">
        {{ binDescription['order'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Class" :labelStyle="descriptionsItemStyle">
        {{ binDescription['class'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Phylum" :labelStyle="descriptionsItemStyle">
        {{ binDescription['phylum'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Domain" :labelStyle="descriptionsItemStyle">
        {{ binDescription['domain'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Fastani reference" :labelStyle="descriptionsItemStyle">
        {{ binDescription['fastaniReference'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Closest placement reference" :labelStyle="descriptionsItemStyle">
        {{ binDescription['closestPlacementReference'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Completeness" :labelStyle="descriptionsItemStyle">
        {{ binDescription['completeness'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Contamination" :labelStyle="descriptionsItemStyle">
        {{ binDescription['contamination'] }}
      </el-descriptions-item>
			<el-descriptions-item label="GC" :labelStyle="descriptionsItemStyle">
        {{ binDescription['gc'] }}
      </el-descriptions-item>
			<el-descriptions-item label="N50" :labelStyle="descriptionsItemStyle">
        {{ binDescription['n50'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Size" :labelStyle="descriptionsItemStyle">
        {{ binDescription['size'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Fastani ani" :labelStyle="descriptionsItemStyle">
        {{ binDescription['fastaniAni'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Fastani af" :labelStyle="descriptionsItemStyle">
        {{ binDescription['fastaniAf'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Closest placement ani" :labelStyle="descriptionsItemStyle">
        {{ binDescription['closestPlacementAni'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Closest placement af" :labelStyle="descriptionsItemStyle">
        {{ binDescription['closestPlacementAf'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Msa percent" :labelStyle="descriptionsItemStyle">
        {{ binDescription['msaPercent'] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'BinDescription',

  props: {
    binDescription: {
      type: Object,
      required: true,
      default() {
        return null
      }
    },
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
      descriptionsItemStyle: {
        backgroundColor: '#E9ECEF',
        color: '#44546A'
      },
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>