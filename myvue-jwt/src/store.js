import Vue from 'vue'
import Vuex from 'vuex'
import { login, validate } from "./api/user"
import { setLocal, getLocal } from "./libs/local"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading: false,
    username: "wawngcai",
  },
  mutations: {
    showLoading(state) {
      state.isShowLoading = true;
    },
    hideLoading(state) {
      state.isShowLoading = false;
    },
    setUser(state, username) {
      state.username = username;
    }
  },
  actions: {
    async toLogin({ commit }, username) {
      let r = await login(username)
      if (r.code === 0) {
        //登录成功
        commit('setUser', r.username)
        setLocal('token', r.token)
      } else {
        return Promise.reject(r.data);
      }
    },
    async validate({ commit }) {
      let r = await validate();
      if (r.code === 0) {
        commit('setUser', r.username)
        setLocal('token', r.token)
      }
      return r.code === 0;//返回token是否失效 
    }
  }
})
