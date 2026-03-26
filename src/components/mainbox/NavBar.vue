<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-10-29 14:18:32
 * @Description: 
-->
<template>
  <div class="menu-container">
    <div style="display: flex; justify-content: left;align-items: center;padding-left: 20px;" >
        <el-image
          :src="require('../../assets/images/logo.png')"
          style="width: 100px; height: 40px;"
          fit="fill">
        </el-image>
      <div style="font-size: 38px; color: #FFF;padding-left: 10px; font-weight: bold; ">
        <i>
          <span style="color: #39B9ED;">M</span>
          <span style="color: #BCD2EE;">M</span>
          <span style="color: #FFF">Database</span>
        </i>
      </div>
    </div>
    
    <el-menu 
      class="el-menu" 
      mode="horizontal" 
      background-color="#031558"
      active-text-color="#FFD04B"
      text-color="#FFF"
      :default-active="$route.path" 
      router
    >
      <el-menu-item index="/index">
        Home
      </el-menu-item>
      <el-menu-item index="/workspace">
        Workspace
      </el-menu-item>
      <el-menu-item index="/analysis">
        Analysis
      </el-menu-item>
      <el-submenu index="/database">
        <template slot="title">
          Database
        </template>
        <el-menu-item index="/database/overview">
          Overview
        </el-menu-item>
        <el-menu-item index="/database/srpproject">
          SRP Projects
        </el-menu-item>
        <el-menu-item index="/database/contigproject">
          Contig List
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/download">
        Download
      </el-menu-item>
      <!-- <el-menu-item index="/tutorial">
        Tutorial
      </el-menu-item> -->
    </el-menu>
  </div>
  
</template>

<script>
export default {
  name: 'NavBar',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1024;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #031558;
  opacity: 0.8;
  height: 80px;
  .el-menu {
    display: flex;
    justify-content: flex-end;
    border: none;
    ::v-deep .el-submenu__title, .el-menu-item {
      font-size: 18px;
      color: #FFF;
    }
    .el-menu-item {
      width: 160px;
      text-align: center;
    }
  }
}

</style>
