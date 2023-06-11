import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getLinks } from '../services/scrapper'
import { getSitelist } from '../services/siteLists'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
    key: 'digame__trends',
    storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    trends:[],
    loading:{
      state:false,
      message:''
    },
    lastResume:[],
    listStore:[],
    staticSites:[]
  },
  mutations: {
    SET_TRENDS:(state,payload) => {
      state.trends = payload
    },
    SET_LOADING:(state,payload) => {
      state.loading = {
        ...state.loading,
        ...payload
      }
    },
    SET_LOADING_CLOSE:(state) => {
      state.loading = {
        ...state.loading,
        state:false,
        message:''
      }
    },
    SET_STATIC_SITES:(state,payload) => {
      state.staticSites = payload
    },
    SET_LAST_RESUME:(state, payload) => {
      state.lastResume = [...payload]
    },
    SET_LIST_STORE:(state, payload) => {
      state.listStore = payload
    },
    REMOVE_LIST_STORE:(state, payload) => {
      state.listStore = payload
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
    },
    setLoading({commit},payload) {
      commit('SET_LOADING',payload)
    },
    setLoadingclose({commit}) {
      commit('SET_LOADING_CLOSE')
    },
    setLastResume({commit},payload) {
      commit('SET_LAST_RESUME',payload)
    },

    setArrayListStore(context,payload) {
      context.commit('SET_LIST_STORE',payload)
    },

    async setStaticsites(context) {
      try {
        const {data} = await getSitelist()
        context.commit('SET_STATIC_SITES',data.sites)
      }
      catch(e) {
        console.log(e)
        context.commit('SET_STATIC_SITES',[])
      }
      
    },

    editListstore(context,payload) {
      let oldList = context.state.listStore
      let newList = oldList.map(item => {
        if(item.list_id === payload.list_id) {
          item = payload
        }
        return item
      })

      context.commit('SET_LIST_STORE',newList)
    },

    setListStore(context,payload) {
      let oldList = context.state.listStore
      let verifyItemexists  = oldList.filter(item => item.list_id === payload.list_id)
 
      if(verifyItemexists.length > 0) {
        return false
      }

      oldList.push(payload)
 
      context.commit('SET_LIST_STORE',oldList)
    },

    removeListStore(context,payload) {
      console.log(payload)
      let oldList = context.state.listStore
      let newList = oldList.filter(item => item.list_id !== payload)

      context.commit('REMOVE_LIST_STORE',newList)
    }
  },
  getters: {
    getTrends: state => state.trends,
    getLoading: state => state.loading,
    getLastResume: state => state.lastResume,
    getListStore: state => state.listStore,
    getStaticSites: state => state.staticSites
  },
  plugins: [vuexLocal.plugin]

})
