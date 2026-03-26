<template>
  <div class="contig-project-container">
    <div class="decription-container">
      <div ref="descriptionContainer" class="decription-title-container" @click="ifShowDescription = !ifShowDescription">
        Description
      </div>
      <div class="decription-content-container" v-show="ifShowDescription">
        The Sample View section aims to depict the geographical distribution and environmental information of ocean samples currently available on the website. This section allows users to check each dataset and its metadata. Users either can select datasets directly from the sample list, or they can use the navigation panel on the right side. Users are able to use sample ID, Habitat source, Location, longitude and latitude as well as sampling depth to carry out the search. These selected datasets can be viewed on a global map to estimate their distribution.
      </div>
    </div>
    <div class="contigs-project-infomation">
      <ContigsProjectInformation></ContigsProjectInformation>
    </div>
  </div>
</template>

<script>
import ContigsProjectInformation from '@/components/database/contigproject/ContigsProjectInformation.vue';

export default {
  name: 'ContigProject',

  components: {
    ContigsProjectInformation,
  },

  data() {
    return {
      ifShowDescription: false,
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss"scoped>
.contig-project-container {
  padding-left: 100px;
  padding-right: 100px;
  .decription-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    .decription-title-container {
      height: 50px;
      line-height: 50px;
      color: #36A3F7;
      font-weight: bold;
      font-size: 18px;
      padding-left: 10px;
      border-radius: 5px 5px 5px 5px;
      background-color: #FFF;
      cursor: pointer;
    }
    .decription-content-container {
      padding: 10px 10px 10px 10px;
      background-color: #FFF;
      font-size: 14px;
      border-radius: 0 0 5px 5px;
      border-top: 1px solid #efeeee;
    }
  }
  .contigs-project-infomation {
    background-color: #FFF;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 20px 10px 20px 10px;
    border-radius: 5px 5px 5px 5px;
    box-shadow: 5px 5px 5px #ccc;
  }
  
}

</style>