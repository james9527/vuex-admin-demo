import axios from 'axios'
import qs from 'qs'

import Vue from 'vue'
let vm = new Vue()

// axios.defaults.timeout = 5000

axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data.reqId = +new Date()
    config.data = qs.stringify(config.data)
  } else {
    config.params = config.params || {}
    config.params.reqId = +new Date()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  if (res.config.method === 'post') {
    if (String(res.data.code) === '0000') {
      vm.$notify({
        title: '操作成功',
        message: '操作成功',
        type: 'success'
      })
    } else {
      vm.$notify.error({
        title: '操作失败',
        message: res.data.msg || '操作失败',
        type: 'error'
      })
    }
  }

  return res
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

// 让ajax请求头携带cookie
axios.defaults.withCredentials = true

export default axios
