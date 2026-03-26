<template>
  <div class="vis-container">
    <div id="mol-container"></div>
  </div>
  
</template>

<script>
import * as $3Dmol from '3dmol';

export default {
  name: 'ProteinStructVis',

  data() {
    return {
      viewer: null,
    };
  },

  props: {
    structData: {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  },

  mounted() {
    if(!this.viewer) {
      this.viewer = $3Dmol.createViewer(document.getElementById('mol-container'))
      this.viewer.onLoad = () => {}
    }
    
  },

  watch: {
    structData(newValue, oldValue) {
      if(newValue) {
        this.proteinStructVis(newValue)
      }
    }
  },

  methods: {
    proteinStructVis(data) {
      this.viewer.addModel(data, "pdb");
      this.viewer.addUnitCell()
      this.viewer.setStyle({}, {sphere : {}})
      this.viewer.zoomTo()
      this.viewer.center()
      this.viewer.render()
      document.querySelector('#mol-container canvas').removeAttribute('style')
    }
  }
};
</script>

<style lang="scss" scoped>
.vis-container {
  display: flex;
  justify-content: center;
  #mol-container {
    width: 400px;
    height: 300px;

    ::v-deep canvas {
      width: 400px;
      height: 300px;
    }
  }
}

</style>