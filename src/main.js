import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import utils from './utils/index.js'
import api from './api/index.js'
import AMap from 'vue-amap';
import NProgress from 'nprogress'
import cnylog from './packages/cnylog/cnylog.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'

Vue.use(AMap)
Vue.use(ElementUI)
// 初始化vue-amap
AMap.initAMapApiLoader({
    // 申请的高德key
    key: '40b38861f945b9614576fd7088de cf24',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
    uiVersion: '1.0'
})

Vue.prototype.$utils = utils
Vue.prototype.$api = api
Vue.prototype.$loading = ElementUI.Loading.service
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$notify = ElementUI.Notification

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.config.devtools = true

router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log(to)
    if(to.path == '/login' || to.path == '/register'){
      if (store.state.isLogin) {
        next('/')
        NProgress.done()
      } else {
         next()
      }
    }else if(to.redirectedFrom == '/userexinfo'){
      if (!store.state.isLogin) {
        next('/login')
        NProgress.done()
      } else {
         next()
      }
    }else{
      next()
    }
   
});

router.afterEach(transition => {
  NProgress.done()
});