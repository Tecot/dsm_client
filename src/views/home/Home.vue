<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-10-30 09:18:41
 * @Description: 
-->
<template>
  <div class="home-container">
    <div class="decoration" style="position: fixed; top: 80px; left: 0; width: 100%; height: 400px; z-index: 0;">
      <vue-particles 
        v-show="isShow"
        color="#dedede" 
        shapeType="star" 
        linesColor="#dedede" 
        hoverMode="grab" 
        clickMode="push"
        style="width: 100%; height: 400px;"> 
      </vue-particles>
    </div>
    
    <div class="search-container">
      <div class="search-label" style="padding-top: 100px; z-index: 1;" >
        Marine Metagenome Database
      </div>
      <div class="search-input">
        <!-- <el-input style="width: 40%;" v-model="searchData"></el-input> -->
        <el-select style="width: 40%; z-index: 1;" v-model="searchData" filterable placeholder="">
          <el-option
            v-for="item in srpDirNames"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" @click="handuleSearchData()">Search</el-button>
      </div>
      <div class="tip">
        Search for SRA/SRP/ERP/DRP project. Examples: DRP005856, ERP122143, ERP122143, DRP005636
      </div>
    </div>
    <div class="description-container">
      The Marine Metagenome Database contains 10,000,000 data results related to pathogenicity and drug
      design in marine environments, and these data results are presented in an interactive 
      <i @click="goToMap" style="color: #3B6FB6; cursor: pointer;">map</i>.
    </div>
    
    <div class="background-container">
      <div class="content">
        <el-card class="up">
          <div slot="header" class="clearfix">
            <div class="label-container">
              Background
            </div>
          </div>
          <p style="text-indent: 20px;">The MarineMetaDatabase encompasses a vast array of biological data, with 164 marine metagenomes forming the foundational resource for all analyses. The data derived from these metagenomic sequences can be categorized into two main aspects: pathogenicity and drug design.</p>
          <p style="text-indent: 20px;"><span style="font-weight: bold; color: #3B6FB6;">Pathogenicity</span>: The database contains comprehensive information on Antimicrobial Resistance Genes (ARGs), Virulence Factors (VFs), and Pathogenic Pathogens. With 508 ARGs and 13,718 VFs, the database provides a critical resource for understanding the mechanisms by which marine pathogens develop resistance to antimicrobial agents and their potential to cause disease. The Taxonomy section, with 3,370 entries, offers a detailed classification of pathogenic organisms, which is essential for epidemiological studies and the development of targeted interventions.</p>
          <p style="text-indent: 20px;"><span style="font-weight: bold; color: #3B6FB6;">Drug Design</span>: Beyond pathogenicity, the MarineMetaDatabase is a treasure trove for drug discovery and design. It includes 10,963 Secondary Metabolites and 342,906 Antimicrobial Peptides (AMPs), which can be mined for novel bioactive compounds. Additionally, the Protein Structure section with 10,994,552 entries is invaluable for structural biology and the rational design of drugs that can target specific pathogenic mechanisms.</p>
          <p style="text-indent: 20px;">To lower the barrier to data utilization and enhance research efficiency, the MarineMetaDatabase is built upon a robust, standardized analytical pipeline using an "offline pre-calculation and structured storage" strategy. Instead of requiring users to perform resource-intensive online computing, the platform has systematically processed the raw environmental sequencing data through a comprehensive, automated bioinformatics workflow. The resulting deeply analyzed and highly structured datasets are fully open and shared on the platform for researchers to intuitively search, visualize, and download. The shared data resources encompass:</p>
          <p style="text-indent: 20px;"><span style="font-weight: bold; color: #3B6FB6;">1. Resources relevant to drug design</span><br></p>
          <p style="text-indent: 20px;">Predicted secondary metabolites (BGCs)</p>
          <p style="text-indent: 20px;">Predicted antimicrobial peptides (AMPs)</p>
          <p style="text-indent: 20px;">Predicted 3D protein structures</p>
          <p style="text-indent: 20px;"><span style="font-weight: bold; color: #3B6FB6;">2. Resources related to disease prevention</span><br></p>
          <p style="text-indent: 20px;">Predicted virulence factors (VFs)</p>
          <p style="text-indent: 20px;">Predicted antimicrobial resistance genes (ARGs)</p>
          <p style="text-indent: 20px;">Taxonomic classification of microorganisms</p>
          <p style="text-indent: 20px;">In summary, the MarineMetaDatabase serves as a pivotal resource for researchers by integrating a highly efficient analytical pipeline with extensive, openly shared biological datasets. By providing direct access to these pre-calculated multi-omics resources, the platform empowers scientists to delve into the pathogenic potential of marine organisms and explore the discovery of novel therapeutics without the burden of complex bioinformatic processes or heavy computational costs.</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config'
export default {
  name: 'Home',

  data() {
    return {
      state: '',
      isShow: true,
      searchData: '',
      srpDirNames: [],
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    const sraNameList = this.$store.state.sraNameList
    if(sraNameList.length > 0) {
      this.srpDirNames = sraNameList
    } else {
      this.requestSraNameList()
    }
    // axios.get(config.baseUrl + config.uri.srpDirNamesViewURI, {
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8' 
    //   },
    //   timeout: 300000,
    //   withCredentials: false
    // }).then((response) => {
    //   this.srpDirNames = response.data.data
    // })
  },

  methods: {
    async requestSraNameList() {
      await axios.get(config.baseUrl + config.uri.srpDirNamesViewURI, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        },
        timeout: 300000,
        withCredentials: false
      }).then((response) => {
        this.srpDirNames = response.data.data
        this.$store.dispatch('setSraNameList', response.data.data)
      })
    },
    handleScroll() {
      window.scrollY > 300? this.isShow = false: this.isShow = true
    },
    goToMap() {
      this.$router.push({
        name: 'overview'
      })
    },
    handuleSearchData() {
      if(this.searchData) {
        if(this.srpDirNames.includes(this.searchData)) {
          axios.get(config.baseUrl + config.uri.getTargetSrpValueURI + '/' + this.searchData, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8' 
            },
            timeout: 300000,
            withCredentials: false
          }).then((response) => {
            this.$router.push({
              name: 'runproject', 
              params: { 
                param: response.data.data
              }
            })
          })
          
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'The project number does not exist!'
          });
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .search-container{
    height: 400px;
    background-color: #1371B9;
    z-index: 9999;
    .search-label {
      font-size: 48px;
      font-weight: bold;
      color: #FFF;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-input {
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .el-button {
        z-index: 1;
        margin-left: 10px;
        color: #1371B9;
      }
    }
    .tip {
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      color: #FFF;
      z-index: 1;
    }
  }
  .description-container {
    padding: 50px 50px 50px 50px;
    font-weight: bold;
    background-color: #D1E3F6;
    font-size: 2rem;
    text-align: center;
    color: #445265;
  }
  .background-container {
    padding: 0.525rem 15rem 0 15rem;
    color: #2f3a48;
    
    .content {
      padding: 1rem 1rem 1rem 0;
      line-height: 40px;
      .up {
        font-size: 1.2rem;
        padding: 0 1rem 0 1rem;
        .label-container {
          height: 3rem;
          font-size: 2.5rem;
          font-weight: bold;
          text-align: left;
          border-left: 0.5rem solid rebeccapurple;
          padding-left: 0.5rem;
        }
      }
    }
  }
}
</style>
