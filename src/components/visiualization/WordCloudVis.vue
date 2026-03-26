<template>
  <div class='svg-container'>
		<svg :width='width' :height='height' fill="#2C3964" style="border-radius: 150px 150px 150px 150px;" @mousemove='listener($event)'>
			<a :href="tag.href" v-for='(tag, index) in tags' :key="index">
				<text :x='tag.x' :y='tag.y' :fill="fontColor" :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
			</a>
		</svg>
  </div>
</template>

<script>
export default {
  name: 'WordCloudVis',

	props: {
		words: {
			type: Array,
			default() {
				return []
			}
		},
		fontColor: {
			type: '',
			default() {
				return '#02B9F8'
			}
		}
	},

  data() {
    return {
			width:250,//svg宽度
			height:250,//svg高度
			RADIUS:200,//球的半径
			speedX:Math.PI/360,//球一帧绕x轴旋转的角度
			speedY:Math.PI/360,//球-帧绕y轴旋转的角度
			tags: []
    };
  },

	watch: {
		words(newValue, oldValue) {
			let currentData = []
			if(newValue.length > 60) {
				currentData = newValue.slice(0, 60)
			} else {
				currentData = newValue
			}
			let tags=[];
			for(let i = 0; i < currentData.length; i++){
				let tag = {};
				let k = -1 + (2 * (i + 1) - 1) / currentData.length;
				let a = Math.acos(k);
				let b = a * Math.sqrt(currentData.length * Math.PI)//计算标签相对于球心的角度
				tag.text = currentData[i];
				tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);//根据标签角度求出标签的x,y,z坐标
				tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b); 
				tag.z = this.RADIUS * Math.cos(a);
				tag.href = 'javascript:void(0);';//给标签添加链接
				tags.push(tag);
			}
			this.tags = tags;//让vue替我们完成视图更新
		}
	},

  computed:{
		CX(){//球心x坐标
			return this.width/2;
		},
		CY(){//球心y坐标
			return this.height/2;
		}
  },

  mounted() {
    setInterval(() => {
			this.rotateX(this.speedX);
			this.rotateY(this.speedY);
		}, 100)
  },

  methods: {
    rotateX(angleX){
			var cos = Math.cos(angleX);
			var sin = Math.sin(angleX);
			for(let tag of this.tags){
				var y1 = (tag.y- this.CY) * cos - tag.z * sin  + this.CY;
				var z1 = tag.z * cos + (tag.y- this.CY) * sin;
				tag.y = y1;
				tag.z = z1;
			} 
		},
		rotateY(angleY){
			var cos = Math.cos(angleY);
			var sin = Math.sin(angleY);
			for(let tag of this.tags){
				var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
				var z1 = tag.z * cos + (tag.x-this.CX) * sin;
				tag.x = x1;
				tag.z = z1;
			} 
		},
		listener(event){//响应鼠标移动
			var x = event.clientX - this.CX;
			var y = event.clientY - this.CY;
			this.speedX = x*0.0001>0 ? Math.min(this.RADIUS*0.00002, x*0.0001) : Math.max(-this.RADIUS*0.00002, x*0.0001);
			this.speedY = y*0.0001>0 ? Math.min(this.RADIUS*0.00002, y*0.0001) : Math.max(-this.RADIUS*0.00002, y*0.0001); 
		}
  },
};
</script>

<style lang="scss" scoped>
.svg-container {
	border-radius: 20px 20px;
}
</style>