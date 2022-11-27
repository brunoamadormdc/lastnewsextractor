import Vue from 'vue'
import Vuex from 'vuex'
import { getLinks } from '../services/scrapper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trends:[]
  },
  mutations: {
    SET_TRENDS:(state,payload) => {
      state.trends = payload
    }
  },
  actions: {
    async getTrends({commit},payload) {
      try {
        const {data} = await getLinks(`trends/get-trends/${payload.country}`)
        commit('SET_TRENDS',data.trends)
      }
      catch(e) {
        commit('SET_TRENDS',[])
      }
    }
  },
  getters: {
    getTrends: state => state.trends
  }

})
