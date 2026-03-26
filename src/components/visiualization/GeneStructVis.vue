<template>
	<div class="gene-struct-container">
			<div class="tip">
				<el-tag type="warning">
					Tip: Please swipe left and right to view the complete gene structure diagram. 
					Note: Some genes may overlap due to their similar positions and lengths.
				</el-tag>
			</div>
			<div class="view-panel">
				<div class="vis-container"></div>
			</div>
		<div class="options-container" v-if="downloadvisible">
		<el-button size="mini" type="primary" @click="downloadPNG">Download PNG</el-button>
		<el-button size="mini" type="primary" @click="downloadSvg">Download SVG</el-button>
		<el-button size="mini" type="primary" @click="downloadPDF">Download PDF</el-button>
		</div>
	</div>
</template>

<script>
import * as d3 from 'd3'
import { downloadImage2PNG, downloadImage2SVG, downloadImage2PDF } from '@/utils/downloadImage'

export default {
  name: 'GeneStructVis',

	props: {
		inputData: {
			type: Object,
			required: true
		}
	},

  	data() {
		return {
			svg: null,
			width: 0,
			maxWidth: 6000,
			height: 0,
			margin: {
				top: 20,
				bottom: 20,
				left: 20,
				right: 40
			},
			titleArea: {
				title: 'xxxxx',
				height: 100,
				titleStyle: {
					fontSize: 16,
					fontWeight: 'normal'
				}
			},
			vSpace: 10,
			hSpace: 10,
			arrowHeadHeight: 30,
			arrowHeadWidth: 40,
			arrowTailHeight: 20,
			flagWidth: 80,
			fontFamily: 'Times New Roman',
			flagFontSize: 16,
			flagFontWeight: 'normal',
			axisHeight: 20,
			legend: {
				rowHeight: 30,
				fontSize: 16,
				fontWeight: 'normal',
				rect: {
					width: 16,
					height: 16
				},
			},
			metaTextWH: {},
			flagTextWH: {},
			colors: [
				'#e62d8a', '#a8e35d', '#5d8fe6', '#e69d5d', '#5de6d1',
				'#e65d7c', '#5de68a', '#8a5de6', '#e6c35d', '#5dafe6',
				'#e65d5d', '#5de6c3', '#d15de6', '#e6e35d', '#5d7ce6',
				'#e68a5d', '#5de6a8', '#b85de6', '#e6e35d', '#5d8fe6',
				'#e65d9d', '#5de6d1', '#8a5de6', '#e6b85d', '#5dafe6',
				'#e6625d', '#5de68a', '#c35de6', '#e6e35d', '#5d7ce6',
				'#ABccdd', '#BAAABB', '#9eABcc', '#76abCD', '#3Cddcc',
				'#cbaabc', '#bccfff', '#ffcc23', '#2122cd', '#1cbacb'
			],
			downloadvisible: false,
		};
  },

  mounted() {
		
  },

	watch: {
		inputData(newValue, oldValue) {
			if(newValue && Object.keys(newValue.data).length) {
				this.initSvg(newValue)
				this.drawPlot(newValue)
				this.downloadvisible = true
			}
		}
	},

  methods: {
	downloadPNG() {
    	downloadImage2PNG(document.querySelector('.vis-container>svg'), 'gene_struct.png')
    },

    downloadSvg() {
      	downloadImage2SVG(document.querySelector('.vis-container>svg'))
    },

    downloadPDF() {
      	downloadImage2PDF(document.querySelector('.vis-container'))
    },
		
	drawPlot(data) {
			// 比例尺
		const xAxisLength = this.width - this.margin.left - this.flagWidth - this.margin.right
		const xScale = d3.scaleLinear()
			.domain([0, data.length])
			.range([0, xAxisLength])
			.nice()

		// 画坐标轴
		const xAxis = d3.axisBottom(xScale).tickFormat((d) => { return d3.format('.0f')(d) })
		const xAxisGroup = this.svg.append('g').attr('id', 'xAxis-group')
		const keys = Object.keys(data.data).length
		xAxisGroup
			.attr('transform', `translate(${
						this.margin.left + 
						this.flagWidth
					}, ${
						this.margin.top + 
						this.titleArea.height + 
						keys * (this.arrowHeadHeight + this.vSpace)
					})`)
			.call(xAxis)
		const lastPoint = d3.select('#xAxis-group .tick:last-child>text')
      	lastPoint.text(lastPoint.text() + ' (bp)')
		Object.keys(data.data).forEach((meta, index) => {
			if(index + 1 !== Object.keys(data.data).length) {
				this.svg
					.append('line')
					.attr('x1', this.margin.left + this.flagWidth)
					.attr('y1', this.margin.top + this.titleArea.height + this.arrowHeadHeight * (index + 1) + this.vSpace * (index + 1) - this.vSpace * 0.5)
					.attr('x2', this.width - this.margin.right)
					.attr('y2', this.margin.top + this.titleArea.height + this.arrowHeadHeight * (index + 1) + this.vSpace * (index + 1) - this.vSpace * 0.5)
					.attr('stroke-width', '1')
					.attr('stroke', '#000')
					.attr('opacity', '0.3')
					.attr('stroke-dasharray', '5,5')
			}
			
		})
		Object.keys(data.data).forEach((key, index) => {
			const flagTextGroup = this.svg
				.append('g')
				.attr('class', 'flag-text')
			flagTextGroup.append('text')
				.text(key)
				.style('font-family', this.fontFamily)
				.attr('transform', `translate(${
					this.margin.left + 
					this.flagWidth - 
					this.flagTextWH[key].width - 
					10
				}, ${
					this.margin.top + 
					this.titleArea.height + 
					this.arrowHeadHeight * (index + 1) + 
					this.hSpace * index - 
					this.arrowHeadHeight * 0.5 + 
					this.flagTextWH[key].height * 0.25
				})`)
			this.svg
				.append('g')
				.attr('class', 'legend-text')
				.append('text')
				.text(key)
				.style('font-size', `${this.legend.fontSize}px` )
				.style('font-family', this.fontFamily)
				.attr('transform', `translate(${
					this.margin.left + 
					this.flagWidth - 
					this.flagTextWH[key].width - 
					10
				}, ${
					this.margin.top + 
					this.titleArea.height + 
					this.arrowHeadHeight * (Object.keys(data.data).length + 1) + 
					this.hSpace * Object.keys(data.data).length + 
					this.axisHeight + 
					this.legend.rowHeight * index - 
					this.flagTextWH[key].height * 0.25
				})`)
			let legendXStart = this.margin.left + this.flagWidth	
			data.data[key].forEach((meta, pos) => {
				if(key === 'AMPs') {
					this.svg
						.append('g')
						.attr('class', 'rect-group')
						.append('rect')
						.attr('width', xScale(meta.end - meta.start))
						.attr('height', this.arrowTailHeight)
						.attr('x', xScale(meta.start))
						.attr('y', 0)
						.attr('fill', this.colors[pos])
						.attr('transform', `translate(${
							this.margin.left + this.flagWidth
						}, ${
							this.margin.top + 
							this.titleArea.height + 
							this.arrowHeadHeight * (index + 1) + 
							this.hSpace * index - 
							(this.arrowHeadHeight + this.arrowTailHeight) * 0.5
						})`)
						.style('opacity', 0.3)
						.on('click', () => {
							this.$emit('viewRegionDescription', meta.info)
						})
				} else {
					let path = ''
					if(meta.forward === 1) {
						if(meta.end - meta.start <= this.arrowHeadWidth) {
							path = `M ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5},` +
											`L ${xScale(meta.start)} ${0},` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${this.arrowHeadHeight * 0.5},` +
											`L ${xScale(meta.start)} ${this.arrowHeadHeight},` +
											`L ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5}`
						} else {
							path = `M ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5},` +
											`L ${xScale(meta.start)} ${(this.arrowHeadHeight - this.arrowTailHeight) * 0.5},` + 
											`L ${xScale(meta.end - this.arrowHeadWidth)} ${(this.arrowHeadHeight - this.arrowTailHeight) * 0.5},` +
											`L ${xScale(meta.end - this.arrowHeadWidth)} ${0},` +
											`L ${xScale(meta.end)} ${this.arrowHeadHeight * 0.5},` +
											`L ${xScale(meta.end - this.arrowHeadWidth)} ${this.arrowHeadHeight},` +
											`L ${xScale(meta.end - this.arrowHeadWidth)} ${this.arrowTailHeight + (this.arrowHeadHeight - this.arrowTailHeight) * 0.5},` +
											`L ${xScale(meta.start)}, ${this.arrowTailHeight + (this.arrowHeadHeight - this.arrowTailHeight) * 0.5},` +
											`L ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5}`
						}
					}
					if(meta.forward === -1) {
						if(meta.end - meta.start <= this.arrowHeadWidth) {
							path = `M ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5},` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${0},` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${this.arrowHeadHeight},` +
											`L ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5}`
						} else {
							path = `M ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5},` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${0}` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${(this.arrowHeadHeight - this.arrowTailHeight) * 0.5},` +
											`L ${xScale(meta.end)} ${(this.arrowHeadHeight - this.arrowTailHeight) * 0.5},` +
											`L ${xScale(meta.end)} ${(this.arrowHeadHeight - this.arrowTailHeight) * 0.5 + this.arrowTailHeight},` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${(this.arrowHeadHeight - this.arrowTailHeight) * 0.5 + this.arrowTailHeight},` +
											`L ${xScale(meta.start + this.arrowHeadWidth)} ${this.arrowHeadHeight},` +
											`L ${xScale(meta.start)} ${this.arrowHeadHeight * 0.5}`
						}
					}
					this.svg
						.append('g')
						.attr('class', 'arrow-group')
						.attr('transform', `translate(${
							this.margin.left + 
							this.flagWidth
						}, ${
							this.margin.top + 
							this.titleArea.height + 
							this.arrowHeadHeight * (index + 1) + 
							this.hSpace * index - 
							this.arrowHeadHeight
						})`)  
						.append('path')
						.attr('d', path)
						.attr('stroke-width', '0')
						.attr('stroke', '')
						.attr('fill', this.colors[pos])
						.style('cursor', 'pointer')
						// .style('opacity', '0.5')
						.on('click', () => {
							if(key === 'vf') {
								this.$emit('viewVfAndResfinderSignal', meta.infos)
							}
						})
				}
				this.svg
					.append('g')
					.attr('class', 'legend-rect-item')
					.append('rect')
					.attr('width', this.legend.rect.width)
					.attr('height', this.legend.rect.height)
					.attr('x', 0)
					.attr('y', 0)
					.attr('fill', this.colors[pos])
					.attr('transform', `translate(${
						legendXStart
					}, ${
						this.margin.top + 
						this.titleArea.height + 
						this.arrowHeadHeight * (Object.keys(data.data).length + 1) + 
						this.hSpace * Object.keys(data.data).length + 
						this.axisHeight + 
						this.legend.rowHeight * index - 
						this.legend.rect.height
					})`)
				legendXStart += this.legend.rect.width + this.vSpace * 0.5
				this.svg
					.append('g')
					.attr('class', 'legend-text')
					.append('text')
					.text(meta.gene)
					.style('font-family', this.fontFamily)
					.style('font-size', `${this.legend.fontSize}px`)
					.attr('transform', `translate(${
						legendXStart
					}, ${
						this.margin.top + 
						this.titleArea.height + 
						this.arrowHeadHeight * (Object.keys(data.data).length + 1) + 
						this.hSpace * Object.keys(data.data).length + 
						this.axisHeight + 
						this.legend.rowHeight * index - 
						this.metaTextWH[key][pos].height * 0.25
					})`)
					
				legendXStart += this.metaTextWH[key][pos].width + this.vSpace
			})
			
		})
	},

		// 初始化svg
    initSvg(data) {
		this.svg = d3.select('.vis-container').append('svg')
			
		// 计算高度
		const flagNumbers = Object.keys(data.data).length
		this.height = this.margin.top + this.titleArea.height + flagNumbers * (this.arrowHeadHeight + this.vSpace) + this.axisHeight + flagNumbers * this.legend.rowHeight + this.margin.bottom

		// 计算宽度
		Object.keys(data.data).forEach(key => {
			this.metaTextWH[key] = []
			data.data[key].forEach(meta => {
				const text = this.svg
					.append('text')
					.text(meta.gene)
					.attr('class', 'legend-text')
					.style('font-family', this.fontFamily)
					.style('font-size', `${this.legend.fontSize}px`)
					.style('font-weight', this.legend.fontWeight)
				const textWidth = text.node().getBBox().width
				const textHeight = text.node().getBBox().height
				this.metaTextWH[key].push({ width: textWidth, height: textHeight })
				d3.select('.legend-text').remove()
			})
		})
		let maxField = ''
		let maxMetas = 0
		Object.keys(data.data).forEach(key => {
			if(data.data[key].length > maxMetas) {
				maxField = key
			}
		})
		this.width = data.data[maxField].length * 200
		this.width = this.width > this.maxWidth? this.width : this.maxWidth
		this.svg.attr('width', this.width).attr('height', this.height)

		// 计算flag的宽度和高度
		Object.keys(data.data).forEach(key => {
			const text = this.svg
					.append('text')
					.text(key)
					.attr('class', 'flag-text')
					.style('font-family', this.fontFamily)
					.style('font-size', `${this.flagFontSize}px`)
					.style('font-weight', this.flagFontWeight)
			const textWidth = text.node().getBBox().width
			const textHeight = text.node().getBBox().height
			this.flagTextWH[key] = { width: textWidth, height: textHeight }
			d3.select('.flag-text').remove()
		})
    },


  },
};
</script>

<style lang="scss" scoped>
.gene-struct-container {
	.tip {
		height: 3rem;
		display: flex;
		align-items: center;
	}
	.view-panel {
		display: flex;
		justify-content: center;
		.vis-container {
			overflow: auto;
		}
	}
	
	
  .options-container {
    display: flex;
    justify-content: center;
		margin-top: 20px;
  }
}
</style>