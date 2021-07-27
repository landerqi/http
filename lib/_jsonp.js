/**
 * fork from https://github.com/webmodules/jsonp
 * @Date 2020/12
 */

/**
 * Module dependencies
 */

var debug = require('debug')('jsonp')

/**
 * Module exports.
 */

module.exports = jsonp

/**
 * Callback index.
 */

var count = 0

/**
 * Noop function.
 */

function noop () {}

/**
 * JSONP handler
 *
 * Options:
 *  - callbackKey {String} qs parameter (`callback`)
 *  - callbackPrefix {String} qs parameter (`__jp`)
 *  - callbackName {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp (url, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts
    opts = {}
  }
  if (!opts) opts = {}

  var prefix = opts.callbackPrefix || '__jp'

  // use the callback callbackName that was passed if one was provided.
  // otherwise generate a unique callbackName by incrementing our counter.
  var id = opts.callbackName || (prefix + (count++))

  var param = opts.callbackKey || 'callback'
  var timeout = opts.timeout != null ? opts.timeout : 60000
  var enc = encodeURIComponent
  var target = document.getElementsByTagName('script')[0] || document.head
  var script
  var timer

  if (timeout) {
    timer = setTimeout(function () {
      cleanup()
      if (fn) fn(new Error('timeout of ' + timeout + 'ms exceeded'))
    }, timeout)
  }

  function cleanup () {
    if (script.parentNode) script.parentNode.removeChild(script)
    window[id] = noop
    if (timer) clearTimeout(timer)
  }

  function cancel () {
    if (window[id]) {
      cleanup()
    }
  }

  window[id] = function (data) {
    debug('jsonp got', data)
    cleanup()
    if (fn) fn(null, data)
  }

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id)
  url = url.replace('?&', '?')

  debug('jsonp req "%s"', url)

  // create script
  script = document.createElement('script')
  script.src = url
  script.onerror = function (e) {
    cleanup()
    if (fn) fn(new Error('Network Error'))
  }
  target.parentNode.insertBefore(script, target)

  return cancel
}
