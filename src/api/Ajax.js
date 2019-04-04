import axios from './axios.conf.js'

const MOCK = true
const isProduction = (process.env.NODE_ENV === 'production')

function typeOf (any) {
  return Object.prototype.toString.call(any).slice(8, -1)
}
/**
 * 请求的基类
 */
export default class Ajax {
  constructor (isMock) {
    this.id = 0
    this.method = 'get'
    this.isMock = !isProduction && (isMock || MOCK)
    this.complete = false
  }

  /**
   * 根据响应中透传的reqId[timestamp]来判断该次响应是否是最后一次请求的响应
   *
   * @param  {response}  res [axios的响应]
   *
   * @return {Boolean}     [是否是最新请求的响应]
   */
  _isLatest (res) {
    let {
      data: {
        respSt = 0
      }
    } = res
    if (respSt < this.id) return false

    this.id = respSt

    return true
  }

  /**
   * 请求方法,抹平了get和post请求参数的差异.
   * 是最后一次请求的响应时,返回响应
   * 不是最后一次请求的响应时,通过 reject `request canceled!` 进行忽略
   *
   * 当响应出现异常时,将响应异常拆分为最新请求的异常和非最新请求的异常.
   * 当异常是最新请求的异常时,响应一个错误对象[Error].
   * 当异常不是最新请求的异常时,通过 reject `request canceled!` 进行忽略
   *
   * @param  {Object}  params [请求参数]
   *
   * @return {Promise}        [通过适配器后的响应数据]
   */
  async fetch (params = {}) {
    if (this.isMock) return Promise.resolve(this.mock)
    this.complete = false

    try {
      let res
      if (this.method === 'get') {
        res = await axios.get(this.url, {params})
      } else if (this.method === 'post') {
        res = await axios.post(this.url, params)
      }

      if (!this._isLatest(res)) {
        return Promise.reject('request canceled!')
      }

      this.complete = true
      if (typeOf(this.afterResponse) === 'Function') {
        this.afterResponse(res, params)
      }
      if (typeOf(this.adapter) === 'Function') {
        return this.adapter(res, params)
      }
      return res
    } catch (error) {
      if (this.complete) {
        return Promise.reject('request canceled!')
      } else {
        return Promise.resolve(error)
      }
    }
  }
}
