<template>
<div class="download-database-information-container">
	<div class="title-container">
		<span>Download SRP project</span>
	</div>
	<div class="table-container">
		<el-table
			:data="tableData"
			:header-cell-style="headerCellStyle"
			:cell-style="cellStyle"
			size="small"
			max-height="600"
			style="width: 100%"
		>
			<el-table-column prop="name" label="Database name"></el-table-column>
			<el-table-column prop="update" label="Update time"></el-table-column>
			<el-table-column prop="size" label="Size"></el-table-column>
			
			<el-table-column label="Option" width="100" class-name="header-end-cell" fixed="right">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleDownload(scope.row)">
						Download
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[20, 50, 100]"
				:page-size="pageSize"
				layout="total, prev, pager, next, sizes, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
	</div>
</div>
</template>
  
<script>
export default {
	name: 'SrpInformation',

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
			displayOriginalTable: true,
			tableData: [],
			header: [],
			currentPage: 1,
			pageSize: 20,
			total: 5
		};
	},

	mounted() {
		this.tableData = [
			{
					'name': 'GeneBank',
					'update': '2024.04.12',
					'size': '2.52TB',
			},
			{
					'name': 'PDB',
					'update': '2024.07.12',
					'size': '4.52TB',
			},
			{
					'name': 'GEA',
					'update': '2023.11.12',
					'size': '8.5TB',
			},
			{
					'name': 'EMBL',
					'update': '2024.04.24',
					'size': '2.5TB',
			},
			{
					'name': 'GO',
					'update': '2022.04.12',
					'size': '4.5TB',
			},
		]
	},

	methods: {
		handleDownload($event) {

		},
		handleSizeChange() {

		},
		handleCurrentChange() {
			
		}
	},
};
</script>
  
<style lang="scss"scoped>
	.download-database-information-container  {
    padding-left: 40px;
    padding-right: 40px;
    
    .title-container {
      line-height: 60px;
      height: 60px;
      font-size: 18px;
      font-weight: 700;
      color: #36A3F7;
      border-radius: 5px 5px 0 0;
      background-color: #FFF;
			padding-left: 10px;
    }
    
  
    .pagination-container {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background-color: #FFF;
    }
  }
</style>