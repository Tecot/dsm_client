<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-10-30 09:18:41
 * @Description: 
-->
<template>
  <div class="home-container">
    <vue-particles 
      v-show="isShow"
      color="#dedede" 
      shapeType="star" 
      linesColor="#dedede" 
      hoverMode="grab" 
      clickMode="push" 
      style="position: fixed; top: 80px; left: 0; width: 100%; height: 400px; z-index: 0;"> 
    </vue-particles>
    <div class="search-container">
      <div class="search-label" style="padding-top: 100px;" >
        Marine Metagenome Database
      </div>
      <div class="search-input">
        <!-- <el-input style="width: 40%;" v-model="searchData"></el-input> -->
        <el-select style="width: 40%;" v-model="searchData" filterable placeholder="">
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
      The Marine Metagenome Database contains 100,000 data results related to pathogenicity and drug
      design in marine environments, 
      and these data results are presented in an interactive <i @click="goToMap" style="color: #3B6FB6; cursor: pointer;">map</i>.
    </div>
    
    <div class="background-container">
      <div class="label-container">
        Background
      </div>
      <div class="content">
        <div class="up">
          The <span style="font-weight: bold; color: #3B6FB6;">MarineMetaDatabase</span> encompasses a vast array of biological data, 
          with <span style="font-weight: bold; color: #3B6FB6;">244,321 Whole Genome Shotgun (WGS)</span> sequences forming the foundational resource for all analyses. 
          The data derived from these WGS sequences can be categorized into two main aspects: 
          <span style="font-weight: bold; color: #3B6FB6;">pathogenicity</span> and <span style="font-weight: bold; color: #3B6FB6;">drug design</span>.
        </div>
        <div class="bottom">
          <ul>
            <li>
              <span style="font-weight: bold; color: #3B6FB6;">Pathogenicity</span>: The database contains comprehensive information on Antimicrobial Resistance Genes (ARGs), Virulence Factors (VFs), and Pathogenic Pathogens. With 234,212 ARGs and 66,432 VFs, the database provides a critical resource for understanding the mechanisms by which marine pathogens develop resistance to antimicrobial agents and their potential to cause disease. The Taxonomy section, with 4,032 entries, offers a detailed classification of pathogenic organisms, which is essential for epidemiological studies and the development of targeted interventions.
            </li>
            <li>
              <span style="font-weight: bold; color: #3B6FB6;">Drug Design</span>: Beyond pathogenicity, the MarineMetaDatabase is a treasure trove for drug discovery and design. It includes 15,755 Secondary Metabolites and 234,233 Antimicrobial Peptides (AMPs), which can be mined for novel bioactive compounds.  Additionally, the Protein Structure section with 233,245 entries is invaluable for structural biology and the rational design of drugs that can target specific pathogenic mechanisms. 
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="up">
          The MarineMetaDatabase not only offers a vast repository of biological data but also provides advanced online analytical capabilities. 
          Users can upload their own datasets in the form of fastq or assembled fasta files to perform a variety of analyses. 
          These analyses, as outlined in the provided image, include:
        </div>
        <div class="bottom">
          <ul>
            <li>
              <span style="font-weight: bold; color: #3B6FB6;">Analysis relevant to drug design</span><br>
              Prediction of secondary metabolites<br>
              Prediction of antimicrobial peptides<br>
              Prediction of protein structure
            </li>
            <li>
              <span style="font-weight: bold; color: #3B6FB6;">Analysis related to disease prevention</span><br>
              Prediction of virulence factors<br>
              Prediction of drug resistance factors<br>
              Prediction of microorganisms (Pathogenic microorganisms)
            </li>
          </ul>
          <div>
            In summary, the MarineMetaDatabase serves as a pivotal resource for researchers by integrating its extensive biological data resources with the capability to analyze custom datasets. This dual functionality empowers scientists to delve into the pathogenic potential of marine organisms and to explore the discovery and design of novel therapeutics.
          </div>
        </div>   
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
    axios.get(config.baseUrl + config.uri.srpDirNamesViewURI, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8' 
      }
    }).then((response) => {
      this.srpDirNames = response.data.data
    })
  },

  methods: {
    handleScroll() {
      window.scrollY > 400? this.isShow = false: this.isShow = true
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
            }
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
    }
  }
  .description-container {
    padding: 50px 50px 50px 50px;
    font-weight: bold;
    background-color: #D1E3F6;
    font-size: 1.5rem;
    text-align: center;
    color: #445265;
  }
  .background-container {
    padding: 0.525rem 10rem 0 10rem;
    color: #2f3a48;
    .label-container {
      height: 3rem;
      font-size: 2.5rem;
      font-weight: bold;
      text-align: left;
      border-left: 0.5rem solid rebeccapurple;
      padding-left: 0.5rem;
    }
    .content {
      padding: 1rem 1rem 1rem 0;
      line-height: 40px;
      .up {
        font-size: 1.2rem;
      }
      .bottom {
        margin-top: 1rem;
        font-size: 1rem;
      }
    }
  }
}
</style>
