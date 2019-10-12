import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from "iview"
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false

//每次切换路由时beforeEach都会执行。
router.beforeEach(async (to, from, next) => {
  let isLogin = await store.dispatch('validate')
  // eslint-disable-next-line no-console
  console.log(to)
  let needLogin = to.matched.some(match => match.meta.needLogin)
  if (needLogin) {
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    //不需要登录
    if (isLogin && to.path == "/login") {
      next('/')
    } else {
      next()
    }
  }
  next();
})

Vue.use(iView);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
