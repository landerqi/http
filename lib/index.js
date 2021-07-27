/**
 * http 模块，基于 axios/jsonp 封装的请求方法
 * 用法与 axios 保持一致，axios文档：https://github.com/axios/axios
 * 因为引入了 jsonp 需保持统一性，所以不使用 axios 的拦截器
 * @Author landerqi
 * @Date 2020/12
 */

import axios from 'axios'
import { createJsonp } from './jsonp'

/**
 * 创建一个固化配置的 http 方法
 * @param {Object} option 默认配置选项
 * option参数：
 * {
 *  baseURL: String, // 基础URL
 *  timeout: Number, // 超时时间，单位 ms
 *  // 更多字段参照 https://github.com/axios/axios（不适用于 jsonp 请求方式）
 * }
 *
 * @return {Func} http 方法
 */
export const createHttp = (option = {}) => {
  // 创建 http 方法
  const http = axios.create(option)
  http.jsonp = createJsonp(option)

  return http
}

/**
 * http 方法（无默认配置）
 * 用法与 axios 保持一致，请求示例：
 * http.get(url[, config])
 * http.post(url[, data[, config]])
 * http.jsonp(url[, data[, config]])
 */
export default createHttp()
