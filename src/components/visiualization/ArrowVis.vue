<template>
  <div class="svg-container">
    <svg id="arrow-vis"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'ArrowVis',

  props: {
    inputData: {
      type: Object,
      require: true
    },
    svgAttr: {
      type: Object,
      default() {
        return {
          width: 1300,
          height: 160
        }
      }
    }
  },

  data() {
    return {
      colors: [
        '#E54C5E',
        '#F45B21',
        '#F7AAB0',
        '#BFBCDB',
        '#E50616',
        '#81B1D2',
        '#8D706A',
        '#7FB1DB',
        '#CDEAC7',
        '#D9D7D7',
        '#BF7FBB',
        '#8ED2C7',
        '#FEB361',
        '#AEE06B',
        '#FEFEB5'
      ],

      // padding
      svgPadding: {
        left: 40,
        right: 40,
        top: 20,
        bottom: 20
      },

      // arrow
      arrowAttr: {
        headerWidth: 30,
        headerHeight: 30,
        tailHeight: 15,
        yForX: 30
      },

      // legend rect
      legendRectArr: {
        width: 15,
        height: 15
      },

      legendTextAttr: {
        width: 120,
      }
      
    };
  },

  mounted() {
    
  },

  destroyed() {
    d3.selectAll('#arrow-vis > *').remove()
  },

  watch: {
    inputData(newValue, oldValue) {
      if(newValue && newValue.meta.length > 0) {
        this.initPlot(this.inputData)
      }
    }
  },

  methods: {
    downloadSvg() {
      //获取svg
      let dom = document.querySelector('#arrow-vis')
      // 将 SVG 节点转换为 XML 字符串
      const svgString = new XMLSerializer().serializeToString(dom)

      // 下载 SVG 文件
      const file = new Blob([svgString], { type: 'image/png' })
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.download = 'my-svg-file.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    /**
     * 
     * @param data: {
     *  length: 10000,
     *  meta: [
     *          {
     *            start: 2000,
                  end: 2300,
                  forward: 1,
                  gene: 'ispG_16',
                  ...
                },
              ...
        ] 
     * }
     */
    initPlot(data) {
      // 蛋白质箭头颜色设置,setGenes中的gene的index与colors中的颜色index对齐
      const genes =[...new Set(data.meta.map((item => item.gene)))]
      const meta = []
      data.meta.forEach(item => {
        meta.push({
          ...item,
          color: this.colors[genes.indexOf(item.gene)]
        })
      })
      const newData = {
        ...data,
        meta: meta
      }

      // 初始化svg
      const svg = d3.select('#arrow-vis')
        .attr('width', this.svgAttr.width)
        .attr('height', this.svgAttr.height)

      // 比例尺
      const xAxisLength = this.svgAttr.width - this.svgPadding.left - this.svgPadding.right
      const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, xAxisLength])
        .nice()

      // 画坐标轴
      const xAxis = d3.axisBottom(xScale)
      svg.append('g')
        .attr('id', 'xAxis_group')
        .attr('transform', `translate(${this.svgPadding.left}, ${this.svgAttr.height - this.svgPadding.bottom})`)
        .call(xAxis)
      
      // 为坐标上的最后一个刻度点添加单位
      const lastPoint = d3.select('#xAxis_group .tick:last-child>text')
      lastPoint.text(lastPoint.text() + ' (bp)')
      

      // 记录箭头的类名
      const classNames = []

      // 绘制箭头路径 -1:箭头向左，1：箭头向右
      newData.meta.forEach((item, index) => {
        const start = xScale(item.start)
        const end = xScale(item.end)
        const arrowHWscale = xScale(this.arrowAttr.headerWidth)
        const start_y = this.svgAttr.height - this.svgPadding.bottom - this.arrowAttr.yForX

        let path = ''
        // 正向箭头（头部向右）
        if(item.forward === 1) {
          // 长度距离大于箭头头部时，有尾部，否则，无尾部，以箭头头部表示
          
          if((end - start) > arrowHWscale) {
            path = `M ${start} ${start_y},` + 
                   `L ${start} ${start_y - this.arrowAttr.tailHeight * 0.5},` + 
                   `L ${end - arrowHWscale} ${start_y - this.arrowAttr.tailHeight * 0.5},` + 
                   `L ${end - arrowHWscale} ${start_y - this.arrowAttr.headerHeight * 0.5},` +
                   `L ${end} ${start_y},` + 
                   `L ${end - arrowHWscale} ${start_y + this.arrowAttr.headerHeight * 0.5},` + 
                   `L ${end - arrowHWscale} ${start_y + this.arrowAttr.tailHeight * 0.5},` + 
                   `L ${start} ${start_y + this.arrowAttr.tailHeight * 0.5},` + 
                   `L ${start} ${start_y}`
          } else {
            path = `M ${start} ${start_y},` + 
                   `L ${start} ${start_y - this.arrowAttr.headerHeight * 0.5},` + 
                   `L ${start + arrowHWscale} ${start_y},` + 
                   `L ${start} ${start_y + this.arrowAttr.headerHeight * 0.5},` + 
                   `L ${start} ${start_y}`
          }
        } else {
          if((end - start) > arrowHWscale) {
            path = `M ${start} ${start_y},` + 
                   `L ${start + arrowHWscale} ${start_y - this.arrowAttr.headerHeight * 0.5},` + 
                   `L ${start + arrowHWscale} ${start_y - (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight) * 0.5},` + 
                   `L ${end} ${start_y - (this.arrowAttr.headerHeight - this.arrowAttr.tailHeight) * 0.5},` +
                   `L ${end} ${start_y + this.arrowAttr.tailHeight * 0.5},` + 
                   `L ${start + arrowHWscale} ${start_y + this.arrowAttr.tailHeight * 0.5},` + 
                   `L ${start + arrowHWscale} ${start_y + this.arrowAttr.tailHeight},` + 
                   `L ${start} ${start_y}`
                   
          } else {
            path = `M ${start} ${start_y},` +
                   `L ${start + arrowHWscale} ${start_y - this.arrowAttr.headerHeight * 0.5},` +
                   `L ${start + arrowHWscale} ${start_y + this.arrowAttr.headerHeight * 0.5},` + 
                   `L ${start} ${start_y}`
          }
        }

        // 绘制箭头
        svg.append('g')
          .attr('transform', `translate(${this.svgPadding.left}, ${0})`)  
          .attr('class', 'arrow_' + item.gene)
          .append('path')
          .attr('d', path)
          .attr('stroke-width', '0')
          .attr('stroke', '')
          .attr('fill', item.color)
          .style('cursor', 'pointer')
        
        // 添加鼠标虚浮框
        svg.append('g')
          .append("foreignObject")
          .attr("class", "tip_" + item.gene)
          .style("width", 200)
          .style("height", 60)
          .style('border-radius', '4px 4px')
          .style('background-color', '#666666')
          .attr('x', this.svgPadding.left + xScale(item.start))
          .attr('y', this.svgAttr.height - this.svgPadding.bottom - this.arrowAttr.yForX - this.arrowAttr.tailHeight - 60)
          .html(
            `
              <div style="padding: 2px 2px; color: #FFFFFF; font-size: 10px;">
                <p>Gene: <i>${item.gene}</i></p>
                <p>Start: <i>${item.start}</i></p>
                <p>End: <i>${item.end}</i></p>
                <p>Forward: <i>${item.forward}</i></p>
                <p>......</p>
              </div>
            `
          )
          .attr("color", "white")
          .style("font-size", "12px")
          .attr("visibility", "hidden")

        // 暂存类名
        classNames.push({
          gene: item.gene,
          arrowClassName: 'arrow_' + item.gene,
          tipClassName: "tip_" + item.gene
        })
      });
      
      // 绘制legend
      const legend_group = svg.append('g')
        .attr('class', 'legend_group')
        .attr('transform', `translate(${this.svgPadding.left}, ${this.svgPadding.top})`)  
      genes.forEach((gene, index) => {
        legend_group.append('rect')
          .attr('width', this.legendRectArr.width)
          .attr('height', this.legendRectArr.height)
          .attr('x', (index) * (this.legendRectArr.width + this.legendTextAttr.width + 10))
          .attr('y', 0)
          .attr('fill', this.colors[index])
        legend_group.append('text')
          .text(gene)
          .attr('x', (index + 1) * (this.legendRectArr.width) + index * (this.legendTextAttr.width + 10) + 2)
          .attr('y', 12)
          .attr('fill', '#000')
          .style('font-size', '12px')
      })

      // 添加事件
      classNames.forEach((item1, index) => {
        const currentArrowClassName = '.' + item1.arrowClassName
        d3.select(currentArrowClassName)
          .on('mouseover', () => {                     // 鼠标移入事件
            classNames.forEach((item2) => {
              if(item1.arrowClassName === item2.arrowClassName) {
                d3.select('.' + item2.tipClassName).attr("visibility", "visible")
                d3.select(`.${item2.arrowClassName}>path`).attr('stroke', 'red').attr('stroke-width', '1')
              } else {
                d3.select('.' + item2.tipClassName).attr("visibility", "hidden")
                d3.select(`.${item2.arrowClassName}>path`).attr('stroke', '').attr('stroke-width', '0')
              }
            })
          })
          .on('mouseout', () => {
            classNames.forEach((item2) => {
              d3.select('.' + item2.tipClassName).attr("visibility", "hidden")
              d3.select(`.${item2.arrowClassName}>path`).attr('stroke', '').attr('stroke-width', '0')
            })
          })
          .on('click', () => {
            this.$emit('signal', true)
          })
      })
    }
  }
};
</script>