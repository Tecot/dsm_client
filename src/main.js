/*
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-07-10 09:32:58
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css'
import VueClipBoard from 'vue-clipboard2';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dataV from '@jiaminghi/data-view'
import Particles from 'vue-particles';

library.add(fas)

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI).use(VueClipBoard).use(dataV).use(Particles)

ElementLocale.use(elementEnLocale);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
