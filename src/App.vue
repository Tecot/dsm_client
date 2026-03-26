<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-10-30 10:37:57
 * @Description: 
-->
<template>
  <div>
    <router-view/>
    <PrivacyPolicy></PrivacyPolicy>
  </div>
</template>

<script>
import PrivacyPolicy from './components/shared/PrivacyPolicy.vue'

export default {
  name: 'App',
  components: {
    PrivacyPolicy
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: #F1F5F7;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: #0388c2;
}

::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
