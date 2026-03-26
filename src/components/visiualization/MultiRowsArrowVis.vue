<template>
  <div class="vis-container">
    <div class="arrow-vis-container">
      <svg id="arrow-vis"></svg>
    </div>
    <div class="vis-funcs-container" v-if="downloadvisible">
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
  name: 'MultiRowsArrowVis',

  props: {
    inputData: {
      type: Object,
      require: true,
    },

    svgAttr: {
      type: Object,
      default() {
        return {
          width: 1000
        }
      }
    }
  },

  watch: {
    inputData(newValue, oldValue) {
      if(newValue && (newValue.meta.cdsGenes.length || newValue.meta.vfGenes.length || newValue.meta.resfinderGenes.length)) {
        this.initPlot(this.inputData)
        this.downloadvisible = true
      } else {
        this.downloadvisible = false
      }
    }
  },

  data() {
    return {
      xScale: null,
      cdsGeneColors: [
        '#E54C5E',
        '#F45B21',
        '#F7AAB0',
        '#BFBCDB',
        '#BDB76B',
        '#DA70D6',
        '#708090',
        '#FFA500',
        '#32CD32',
        '#5F9EA0',
        '#90EE90',
        '#FFDAB9',
        '#9370DB',
        '#BC8F8F',
        '#40E0D0',
        '#008080',
        '#808000',
        '#805000',
        '#00FFFF',
        '#FF69B4'
      ],
      vfGeneColors: [
        '#E50616',
        '#81B1D2',
        '#8D706A',
        '#7FB1DB',
        '#CDEAC7',
      ],
      resfinderGeneColors: [
        '#D9D7D7',
        '#BF7FBB',
        '#8ED2C7',
        '#FEB361',
        '#AEE06B',
        '#FEFEB5'
      ],
      // padding
      svgPadding: {
        left: 60,
        right: 60,
        top: 50,
        bottom: 20
      },

      // arrow
      arrowAttr: {
        headerWidth: 30,
        headerHeight: 30,
        tailHeight: 15,
      },

      layoutAttr: {
        rowInstance: 10,
        legendHeight: 60,
        xAxisHeight: 20
      },

      // legend rect
      legendRectArr: {
        width: 15,
        height: 15
      },

      legendTextAttr: {
        width: 150,
      },

      downloadvisible: false
    };
  },

  mounted() { },

  destroyed() {
    d3.selectAll('#arrow-vis > *').remove()
  },

  methods: {

    downloadPNG() {
      downloadImage2PNG(document.querySelector('#arrow-vis'), 'arrows.png')
    },

    downloadSvg() {
      downloadImage2SVG(document.querySelector('#arrow-vis'))
    },

    downloadPDF() {
      downloadImage2PDF(document.querySelector('.arrow-vis-container'))
    },

    initPlot(data) {
      // 初始化svg
      const svg = d3.select('#arrow-vis').attr('width', this.svgAttr.width)
      const cdsGenesLength = data.meta.cdsGenes.length
      const vfGenesLength = data.meta.vfGenes.length
      const resfinderGenesLength = data.meta.resfinderGenes.length
      let heightFlag = 0
      let upOrDown = ''    // 表示当只有一行箭头时，
      if(cdsGenesLength && (vfGenesLength + resfinderGenesLength) > 0) {
        const svgHeight = this.svgPadding.top + this.svgPadding.bottom + 2 * this.arrowAttr.headerHeight + 2 * this.layoutAttr.rowInstance * 2 + this.layoutAttr.legendHeight + this.layoutAttr.xAxisHeight
        svg.attr('height', svgHeight)
        heightFlag = 2
      }
      if(cdsGenesLength && (vfGenesLength + resfinderGenesLength) === 0){
        const svgHeight = this.svgPadding.top + this.svgPadding.bottom + this.arrowAttr.headerHeight + this.layoutAttr.rowInstance + this.layoutAttr.legendHeight + this.layoutAttr.xAxisHeight
        svg.attr('height', svgHeight)
        heightFlag = 1
        upOrDown = 'up'
      }
      if(!cdsGenesLength && (vfGenesLength + resfinderGenesLength) > 0) {
        const svgHeight = this.svgPadding.top + this.svgPadding.bottom + 2 * this.arrowAttr.headerHeight + this.layoutAttr.rowInstance + this.layoutAttr.legendHeight + this.layoutAttr.xAxisHeight
        svg.attr('height', svgHeight)
        heightFlag = 1
        upOrDown = 'down'
      }
      if(cdsGenesLength === 0 && (vfGenesLength + resfinderGenesLength) === 0) {
        svg.attr('height', 0)
      }
      
      
      // 比例尺
      const xAxisLength = this.svgAttr.width - this.svgPadding.left - this.svgPadding.right
      this.xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, xAxisLength])
        .nice()
      
      // 画坐标轴
      const xAxis = d3.axisBottom(this.xScale)
      const xAxisGroup = svg.append('g').attr('id', 'xAxis_group')
      if(heightFlag === 1) {
        xAxisGroup
          .attr('transform', `translate(${this.svgPadding.left}, ${this.svgPadding.top + this.arrowAttr.headerHeight + this.layoutAttr.rowInstance})`)
          .call(xAxis)
      }
      if(heightFlag === 2) {
        xAxisGroup
          .attr('transform', `translate(${this.svgPadding.left}, ${this.svgPadding.top + 2 * this.arrowAttr.headerHeight + 2* this.layoutAttr.rowInstance})`)
          .call(xAxis)
      }
        
      
      // 为坐标上的最后一个刻度点添加单位
      const lastPoint = d3.select('#xAxis_group .tick:last-child>text')
      lastPoint.text(lastPoint.text() + ' (bp)')

      // 创建鼠标悬浮组
      const tipsGroup = svg.append('g').attr('class', 'tips_group')
      
      /**
       * 绘制箭头
       *  
       * */ 
      // 说明只有一行箭头
      if(heightFlag === 1) { 

        // 说明箭头只针对GBK中的CDS
        if(upOrDown === 'up') { 
          data.meta.cdsGenes.forEach((item, index) => {
            const cdsGenePath = this.drawPath(item.start, item.end, this.svgPadding.top + this.arrowAttr.headerHeight * 0.5, item.forward)
            this.addArrow(svg, this.cdsGeneColors[index], cdsGenePath, `arrow_cds_${index}`)
            this.addTip(tipsGroup, item, `tip_cds_${index}`)
          });
        }

        // 说明箭头只包括独立基因、耐药基因
        if(upOrDown === 'down') {
          if(data.meta.vfGenes.length) {
            data.meta.vfGenes.forEach((item, index) => {
              const vfGenePath = this.drawPath(item.start, item.end, this.svgPadding.top + this.arrowAttr.headerHeight * 0.5, item.forward)
              this.addArrow(svg, this.vfGeneColors[index], vfGenePath, `arrow_vf_${index}`)
              this.addTip(tipsGroup, item, `tip_vf_${index}`)
            })
          }
          if(data.meta.resfinderGenes.length) {
            data.meta.resfinderGenes.forEach((item, index) => {
              const resfinderGenePath = this.drawPath(item.start, item.end, this.svgPadding.top + this.arrowAttr.headerHeight * 0.5, item.forward)
              this.addArrow(svg, this.resfinderGeneColors[index], resfinderGenePath, `arrow_resfinder_${index}`)
              this.addTip(tipsGroup, item, `tip_resfinder_${index}`)
            })
          }
        }
      }

      // 说明有两行箭头
      if(heightFlag === 2) {
        data.meta.cdsGenes.forEach((item, index) => {
          const cdsGenePath = this.drawPath(item.start, item.end, this.svgPadding.top + this.arrowAttr.headerHeight * 0.5, item.forward)
          this.addArrow(svg, this.cdsGeneColors[index], cdsGenePath, `arrow_cds_${index}`)
          this.addTip(tipsGroup, item, `tip_cds_${index}`)
        });
        if(data.meta.vfGenes.length) {
          data.meta.vfGenes.forEach((item, index) => {
            const vfGenePath = this.drawPath(item.start, item.end, this.svgPadding.top + this.arrowAttr.headerHeight * 1.5 + this.layoutAttr.rowInstance + item.forward)
            this.addArrow(svg, this.vfGeneColors[index], vfGenePath, `arrow_vf_${index}`)
            this.addTip(tipsGroup, item, `tip_vf_${index}`)
          })
        }
        if(data.meta.resfinderGenes.length) {
          data.meta.resfinderGenes.forEach((item, index) => {
            const resfinderGenePath = this.drawPath(item.start, item.end, this.svgPadding.top + this.arrowAttr.headerHeight * 1.5 + this.layoutAttr.rowInstance + item.forward)
            this.addArrow(svg, this.resfinderGeneColors[index], resfinderGenePath, `arrow_resfinder_${index}`)
            this.addTip(tipsGroup, item, `tip_resfinder_${index}`)
          })
        }
      }

      // 画分割线和标记
      if(heightFlag === 2) {
        svg
          .append('g')
          .attr('class', 'divider')
          .attr('transform', `translate(${this.svgPadding.left}, ${this.svgPadding.top + this.arrowAttr.headerHeight + this.layoutAttr.rowInstance * 0.5})`)  
          .append('path')
          .attr('d', `M 0 0,L ${this.svgAttr.width - this.svgPadding.left - this.svgPadding.right} 0`)
          .attr('stroke-width', '1')
          .attr('stroke', '#ccc')
          .style('stroke-dasharray', '5,5')
      }

      // 绘制legend
      const legendGroup = svg.append('g').attr('class', 'legend_group')
      // let legendGroupYStart = this.svgPadding.top + this.arrowAttr.headerHeight * 2 + this.layoutAttr.rowInstance * 2 + this.layoutAttr.xAxisHeight + this.layoutAttr.legendHeight * 0.5 - this.legendRectArr.height * 0.5
      let legendGroupYStart = this.svgPadding.top + this.layoutAttr.xAxisHeight
      if(heightFlag === 1) {
        legendGroupYStart += this.arrowAttr.headerHeight + this.layoutAttr.rowInstance
      }
      if(heightFlag === 2) {
        legendGroupYStart += this.arrowAttr.headerHeight * 2 + this.layoutAttr.rowInstance * 2
      }
      if(data.meta.cdsGenes.length) {
        legendGroupYStart += this.legendRectArr.height
        const cdsLegendGroup = legendGroup
          .append('g')
          .attr('transform', `translate(${this.svgPadding.left}, ${legendGroupYStart})`)  
          .attr('class', 'cds_legend_group')
        cdsLegendGroup.append('text')
          .text('CDS')
          .attr('x', 0)
          .attr('y', 12)
          .style('font-size', 13)
          .style('font-family', 'Times New Roman')
        data.meta.cdsGenes.forEach((item, index) => {
          cdsLegendGroup
            .append('rect')
            .attr('width', this.legendRectArr.width)
            .attr('height', this.legendRectArr.height)
            .attr('x', 70 + (index) * (this.legendRectArr.width + this.legendTextAttr.width + 10))
            .attr('y', 0)
            .attr('fill', this.cdsGeneColors[index])
          cdsLegendGroup.append('text')
            .text(item.gene)
            .attr('x', 70 + (index + 1) * (this.legendRectArr.width) + index * (this.legendTextAttr.width + 10) + 2)
            .attr('y', 12)
            .style('font-size', 12)
            .style('font-family', 'Times New Roman')
        })
      }
      if(data.meta.vfGenes.length) {
        legendGroupYStart += this.legendRectArr.height + this.layoutAttr.rowInstance
        const vfLegendGroup = legendGroup
          .append('g')
          .attr('transform', `translate(${this.svgPadding.left}, ${legendGroupYStart})`)  
          .attr('class', 'vf_legend_group')
        vfLegendGroup.append('text')
          .text('VF')
          .attr('x', 0)
          .attr('y', 12)
          .style('font-size', 13)
          .style('font-family', 'Times New Roman')
        data.meta.vfGenes.forEach((item, index) => {
          vfLegendGroup
            .append('rect')
            .attr('width', this.legendRectArr.width)
            .attr('height', this.legendRectArr.height)
            .attr('x', 70 + (index) * (this.legendRectArr.width + this.legendTextAttr.width + 10))
            .attr('y', 0)
            .attr('fill', this.vfGeneColors[index])
          vfLegendGroup.append('text')
            .text(item.gene)
            .attr('x', 70 + (index + 1) * (this.legendRectArr.width) + index * (this.legendTextAttr.width + 10) + 2)
            .attr('y', 12)
            .style('font-size', 12)
            .style('font-family', 'Times New Roman')
        })
      }
      if(data.meta.resfinderGenes.length) {
        legendGroupYStart += this.legendRectArr.height + this.layoutAttr.rowInstance
        const resfinderLegendGroup = legendGroup
          .append('g')
          .attr('transform', `translate(${this.svgPadding.left}, ${legendGroupYStart})`)  
          .attr('class', 'resfinder_legend_group')
        resfinderLegendGroup.append('text')
          .text('Resfinder')
          .attr('x', 0)
          .attr('y', 12)
          .style('font-size', 13)
          .style('font-family', 'Times New Roman')
        data.meta.resfinderGenes.forEach((item, index) => {
          resfinderLegendGroup
            .append('rect')
            .attr('width', this.legendRectArr.width)
            .attr('height', this.legendRectArr.height)
            .attr('x', 70 + (index) * (this.legendRectArr.width + this.legendTextAttr.width + 10))
            .attr('y', 0)
            .attr('fill', this.resfinderGeneColors[index])
          resfinderLegendGroup.append('text')
            .text(item.gene)
            .attr('x', 70 + (index + 1) * (this.legendRectArr.width) + index * (this.legendTextAttr.width + 10) + 2)
            .attr('y', 12)
            .style('font-size', 12)
            .style('font-family', 'Times New Roman')
        })
      }
      

      // 事件处理
      if(data.meta.cdsGenes.length) {
        data.meta.cdsGenes.forEach((item1, index1) => {
          d3.select(`.arrow_cds_${index1}`)
            .on('mouseover', () => {
              data.meta.cdsGenes.forEach((item2, index2) => {
                if(`tip_cds_${index1}` === `tip_cds_${index2}`) {
                  d3.select(`.tip_cds_${index2}`).attr("visibility", "visible")
                  d3.select(`.arrow_cds_${index2}>path`).attr('stroke', 'red').attr('stroke-width', 1)
                } else {
                  d3.select(`.tip_cds_${index2}`).attr("visibility", "hidden")
                  d3.select(`.arrow_cds_${index2}>path`).attr('stroke', '').attr('stroke-width', 0).attr('opacity', 0.4)
                }
              })
            })
            .on('mouseout', () => {
              data.meta.cdsGenes.forEach((item, index) => {
                d3.select(`.tip_cds_${index}`).attr("visibility", "hidden")
                d3.select(`.arrow_cds_${index}>path`).attr('stroke', '').attr('stroke-width', 0).attr('opacity', 1)
              })
            })
            .on('click', () => {
              this.$emit('viewProteinStructSignal', true)
            })
        })
      }
      if(data.meta.vfGenes.length) {
        data.meta.vfGenes.forEach((item1, index1) => {
          d3.select(`.arrow_vf_${index1}`)
            .on('mouseover', () => {
              data.meta.vfGenes.forEach((item2, index2) => {
                if(`tip_vf_${index1}` === `tip_vf_${index2}`) {
                  d3.select(`.tip_vf_${index2}`).attr("visibility", "visible")
                  d3.select(`.arrow_vf_${index2}>path`).attr('stroke', 'red').attr('stroke-width', 1)
                } else {
                  d3.select(`.tip_vf_${index2}`).attr("visibility", "hidden")
                  d3.select(`.arrow_vf_${index2}>path`).attr('stroke', '').attr('stroke-width', 0).attr('stroke-width', 0).attr('opacity', 0.4)
                }
              })
            })
            .on('mouseout', () => {
              data.meta.vfGenes.forEach((item, index) => {
                d3.select(`.tip_vf_${index}`).attr("visibility", "hidden")
                d3.select(`.arrow_vf_${index}>path`).attr('stroke', '').attr('stroke-width', 0).attr('stroke-width', 0).attr('opacity', 1)
              })
            })
            .on('click', () => {
              this.$emit('viewVfAndResfinderSignal', item1.infos)
            })
        })
      }
      if(data.meta.resfinderGenes.length) {
        data.meta.resfinderGenes.forEach((item1, index1) => {
          d3.select(`.arrow_resfinder_${index1}`)
            .on('mouseover', () => {
              data.meta.resfinderGenes.forEach((item2, index2) => {
                if(`tip_resfinder_${index1}` === `tip_resfinder_${index2}`) {
                  d3.select(`.tip_resfinder_${index2}`).attr("visibility", "visible")
                  d3.select(`.arrow_resfinder_${index2}>path`).attr('stroke', 'red').attr('stroke-width', 1)
                } else {
                  d3.select(`.tip_resfinder_${index2}`).attr("visibility", "hidden")
                  d3.select(`.arrow_resfinder_${index2}>path`).attr('stroke', '').attr('stroke-width', 0).attr('stroke-width', 0).attr('opacity', 0.4)
                }
              })
            })
            .on('mouseout', () => {
              data.meta.resfinderGenes.forEach((item, index) => {
                d3.select(`.tip_resfinder_${index}`).attr("visibility", "hidden")
                d3.select(`.arrow_resfinder_${index}>path`).attr('stroke', '').attr('stroke-width', 0).attr('stroke-width', 0).attr('opacity', 1)
              })
            })
            .on('click', () => {
              this.$emit('viewVfAndResfinderSignal', item1.infos)
            })
        })
      }
    },

    // 添加鼠标悬浮框
    addTip(tipsGroup, item, className, y=0) {
      tipsGroup
        .append('g')
        .append("foreignObject")
        .attr("class", className)
        .style("width", 120)
        .style("height", 50)
        .style('border-radius', '4px 4px')
        .style('background-color', '#666666')
        .attr('x', this.svgPadding.left + this.xScale(item.start))
        .attr('y', y)
        .html(
          `
            <div style="padding: 2px 2px; color: #FFFFFF; font-size: 10px;">
              <p>Gene: <i>${item.gene}</i></p>
              <p>Start: <i>${item.start}</i></p>
              <p>End: <i>${item.end}</i></p>
              <p>Forward: <i>${item.forward === 1? '+' : '-'}</i></p>
            </div>
          `
        )
        .attr("color", "white")
        .style("font-size", "12px")
        .attr("visibility", "hidden")
    },

    // 添加箭头
    addArrow(svg, color, path, className) {
      svg
        .append('g')
        .attr('class', className)
        .attr('transform', `translate(${this.svgPadding.left}, ${0})`)  
        .append('path')
        .attr('d', path)
        .attr('stroke-width', '0')
        .attr('stroke', '')
        .attr('fill', color)
        .style('cursor', 'pointer')
    },

    // 绘制箭头函数
    drawPath(start, end, y, forward=1) {
      let path = ''
      if(forward === 1) {
        if(end - start <= this.arrowAttr.headerWidth) {
          path = `M ${this.xScale(start)} ${y},` +
                 `L ${this.xScale(start)} ${y - this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y},` +
                 `L ${this.xScale(start)} ${y + this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(start)} ${y}`
        } else {
          path = `M ${this.xScale(start)} ${y},` +
                 `L ${this.xScale(start)} ${y - this.arrowAttr.tailHeight * 0.5},` +
                 `L ${this.xScale(end - this.arrowAttr.headerWidth)} ${y - this.arrowAttr.tailHeight * 0.5},` +
                 `L ${this.xScale(end - this.arrowAttr.headerWidth)} ${y - (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight)},` +
                 `L ${this.xScale(end)} ${y},` +
                 `L ${this.xScale(end - this.arrowAttr.headerWidth)} ${y + this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(end - this.arrowAttr.headerWidth)} ${y + this.arrowAttr.tailHeight * 0.5},` +
                 `L ${this.xScale(start)} ${y + this.arrowAttr.tailHeight * 0.5},` + 
                 `L ${this.xScale(start)} ${y}`
        }
        
      } else {
        if(end - start <= this.arrowAttr.headerWidth) {
          path = `M ${this.xScale(start)} ${y},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y - this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y + this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(start)} ${y}`
        } else {
          path = `M ${this.xScale(start)} ${y},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y - this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y - (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight) * 0.5},` +
                 `L ${this.xScale(end)} ${y - (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight) * 0.5},` +
                 `L ${this.xScale(end)} ${y + (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight) * 0.5},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y + (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight) * 0.5},` +
                 `L ${this.xScale(start + this.arrowAttr.headerWidth)} ${y + this.arrowAttr.headerHeight * 0.5},` +
                 `L ${this.xScale(start)} ${y}`
        }
      }
      return path
    }
  },
};
</script>

<style lang="scss" scoped>
.vis-container {
  .arrow-vis-container {
    display: flex;
    justify-content: center;
  }
  .vis-funcs-container {
    display: flex;
    justify-content: center;
  }
}
</style>