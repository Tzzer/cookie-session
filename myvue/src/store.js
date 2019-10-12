import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading:false,
    username:"wawngcai",
  },
  mutations: {
    showLoading(state){
      state.isShowLoading = true;
    },
    hideLoading(state){
      state.isShowLoading = false;
    }
  },
  actions: {

  }
})
