import Vue from 'vue'
import VueRouter from 'vue-router'
import routesConfig from '@/router/config'
import MainBox from '@/views/MainBox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  },
  {
    path: '/',
    redirect: {
      name: 'index'
    }
  },
  {
    path: '',
    redirect: {
      name: 'index'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

routesConfig.forEach(route => {
  router.addRoute('mainbox', route)
});

export default router
