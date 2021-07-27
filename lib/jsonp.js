/**
 * jsonp 封装
 * @Author landerqi
 * @Date 2020/12
 */

import _jsonp from './_jsonp'

/**
 * 对象 转 URLParam
 * @param {Object} data 数据对象
 */
export function obj2param (data = {}) {
  let url = ''
  for (const k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

/**
 * 创建 jsonp
 * @param {Object} option 默认配置选项
 * option参数：
 * {
 *  baseURL: String, // 基础URL
 *  timeout: Number, // 超时时间，单位 ms
 * }
 *
 * @return {Func} jsonp 封装
 * @param {String} url 不含baseURL的请求链接
 * @param {Object} data 数据
 * @param {Object} config 配置选项：https://github.com/webmodules/jsonp#readme
 */
export const createJsonp = (option = {}) => (url = '', data = {}, config = {}) => {
  const baseURL = config.baseURL || option.baseURL || ''
  url = baseURL + url + (url.indexOf('?') < 0 ? '?' : '&') + obj2param(data)

  return new Promise((resolve, reject) => {
    _jsonp(url, { ...option, ...config }, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * jsonp 方法（无默认配置）
 * @param {String} url 请求链接
 * @param {Object} data 数据
 * @param {Object} config 配置选项：https://github.com/webmodules/jsonp#readme
 */
export default createJsonp()
