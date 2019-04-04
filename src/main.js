import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import storeManager from './store/storeManager'
import ruleList from './store/ruleList'

import App from './App.vue'

// import ElementUI from 'element-ui'
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Input
} from 'element-ui'
// import ECharts from 'echarts'
import './common/reset.css'
import './common/csInput.less'
import './common/csButton.less'
import './common/tableAnimation.css'
import './common/csTransition.css'
// import './main.less'

/**
 * 开启|关闭权限管理
 */
// import {
//   GetMenuListByUser
// } from '@api/others'
import {GetMenuListByUser} from '@api/mock/others'

import filterByAuthority from './router/filterByAuthority'
import routerMap from './router'

Vue.use(VueRouter)
// Vue.use(ElementUI)
// Vue.use(ECharts)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Input)

/**
 * 开启|关闭权限管理
 */
// ;(async function () {
// 请求权限列表
//   let params = {}
//   let getMenuListByUser = new GetMenuListByUser(true)
//   let menuList = await getMenuListByUser.fetch(params)
//
//   if (menuList instanceof Error) {
//     document.body.innerHtml = '<h1>获取权限失败,请检查网络连接,刷新重试或者联系管理员</h1>'
//     return
//   }
//
//   // 添加权限管理
//   const routes = filterByAuthority(routerMap, menuList)
//   const router = new VueRouter({
//     // mode: 'history',
//     routes
//   })
//
//   // 添加store的管理
//   const manager = storeManager.start(ruleList, store)
//   router.beforeEach((to, from, next) => {
//     let url = to.fullPath
//
//     manager.updateStore(url)
//     next()
//   })
//
//   new Vue({
//     data () {
//       return {
//         menuList,
//       }
//     },
//     el: '#app',
//     router,
//     store,
//     render: h => h(App),
//   })
// })()

let menuList = GetMenuListByUser
const routes = filterByAuthority(routerMap, menuList)
const router = new VueRouter({
  // mode: 'history',
  routes
})

// 添加store的管理
const manager = storeManager.start(ruleList, store)
router.beforeEach((to, from, next) => {
  let url = to.fullPath
  manager.updateStore(url)
  next()
})

new Vue({
  data () {
    return {
      menuList,
    }
  },
  el: '#app',
  router,
  store,
  render: h => h(App),
})
