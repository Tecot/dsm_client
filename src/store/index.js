/*
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-12-16 11:21:55
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geoInfoData: '',
    databaseRunProjectData: '',
    contigDetailData: '',
    ifShowedPrivacyPolicy: false,
  },

  getters: {
  },

  mutations: {
    SET_GEO_INFO_DATA(state, payload) {
      state.geoInfoData = payload
    },
    SET_DATABASE_RUN_PROJECT_DATA(state, payload) {
      state.databaseRunProjectData = payload
    },
    SET_CONTIG_DETAIL_DATA(state, payload) {
      state.contigDetailData = payload
    },
    SET_IF_SHOWED_PRIVACY_POLICY(state, payload) {
      state.ifShowedPrivacyPolicy = payload
    }
  },

  actions: {
    setGeoInfoData(context, payload) {
      context.commit('SET_GEO_INFO_DATA', payload)
    },
    setDatabaseRunProjectData(context, payload) {
      context.commit('SET_DATABASE_RUN_PROJECT_DATA', payload)
    },
    setContigDetailData(context, payload) {
      context.commit('SET_CONTIG_DETAIL_DATA', payload)
    },
    setIfShowedPrivacyPolicy(context, payload) {
      context.commit('SET_IF_SHOWED_PRIVACY_POLICY', payload)
    }
  },

  modules: {
  },

  plugins: [
    createPersistedState(
      {
        paths:[
          // 'geoData',
          'databaseRunProjectData', 
          'contigDetailData'
        ]
      }
    )
]
})
