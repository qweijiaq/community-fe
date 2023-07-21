/** layui-v2.2.3 MIT License By http://www.layui.com */
!(function (e) {
  'use strict'
  const t = document
  const o = { modules: {}, status: {}, timeout: 10, event: {} }
  const n = function () {
    this.v = '2.2.3'
  }
  const r = (function () {
    const e = t.currentScript
      ? t.currentScript.src
      : (function () {
          for (var e, o = t.scripts, n = o.length - 1, r = n; r > 0; r--) {
            if (o[r].readyState === 'interactive') {
              e = o[r].src
              break
            }
          }
          return e || o[n].src
        })()
    return e.substring(0, e.lastIndexOf('/') + 1)
  })()
  const i = function (t) {
    e.console && console.error && console.error('Layui hint: ' + t)
  }
  const a = typeof opera !== 'undefined' && opera.toString() === '[object Opera]'
  const u = {
    layer: 'modules/layer',
    laydate: 'modules/laydate',
    laypage: 'modules/laypage',
    laytpl: 'modules/laytpl',
    layim: 'modules/layim',
    layedit: 'modules/layedit',
    form: 'modules/form',
    upload: 'modules/upload',
    tree: 'modules/tree',
    table: 'modules/table',
    element: 'modules/element',
    util: 'modules/util',
    flow: 'modules/flow',
    carousel: 'modules/carousel',
    code: 'modules/code',
    jquery: 'modules/jquery',
    mobile: 'modules/mobile',
    'layui.all': '../layui.all'
  }
  ;(n.prototype.cache = o),
    (n.prototype.define = function (e, t) {
      const n = this
      const r = typeof e === 'function'
      const i = function () {
        return (
          typeof t === 'function' &&
            t(function (e, t) {
              ;(layui[e] = t), (o.status[e] = !0)
            }),
          this
        )
      }
      return (
        r && ((t = e), (e = [])),
        layui['layui.all'] || (!layui['layui.all'] && layui['layui.mobile'])
          ? i.call(n)
          : (n.use(e, i), n)
      )
    }),
    (n.prototype.use = function (e, n, l) {
      function s(e, t) {
        const n = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
        ;(e.type === 'load' || n.test((e.currentTarget || e.srcElement).readyState)) &&
          ((o.modules[f] = t),
          d.removeChild(v),
          (function r() {
            return ++m > (1e3 * o.timeout) / 4
              ? i(f + ' is not a valid module')
              : void (o.status[f] ? c() : setTimeout(r, 4))
          })())
      }
      function c() {
        l.push(layui[f]),
          e.length > 1 ? p.use(e.slice(1), n, l) : typeof n === 'function' && n.apply(layui, l)
      }
      var p = this
      const y = (o.dir = o.dir ? o.dir : r)
      var d = t.getElementsByTagName('head')[0]
      ;(e = typeof e === 'string' ? [e] : e),
        window.jQuery &&
          jQuery.fn.on &&
          (p.each(e, function (t, o) {
            o === 'jquery' && e.splice(t, 1)
          }),
          (layui.jquery = layui.$ = jQuery))
      var f = e[0]
      var m = 0
      if (
        ((l = l || []),
        (o.host = o.host || (y.match(/\/\/([\s\S]+?)\//) || ['//' + location.host + '/'])[0]),
        e.length === 0 ||
          (layui['layui.all'] && u[f]) ||
          (!layui['layui.all'] && layui['layui.mobile'] && u[f]))
      ) {
        return c(), p
      }
      if (o.modules[f]) {
        !(function g() {
          return ++m > (1e3 * o.timeout) / 4
            ? i(f + ' is not a valid module')
            : void (typeof o.modules[f] === 'string' && o.status[f] ? c() : setTimeout(g, 4))
        })()
      } else {
        var v = t.createElement('script')
        let h =
          (u[f] ? y + 'lay/' : /^\{\/\}/.test(p.modules[f]) ? '' : o.base || '') +
          (p.modules[f] || f) +
          '.js'
        ;(h = h.replace(/^\{\/\}/, '')),
          (v.async = !0),
          (v.charset = 'utf-8'),
          (v.src =
            h +
            (function () {
              const e = o.version === !0 ? o.v || new Date().getTime() : o.version || ''
              return e ? '?v=' + e : ''
            })()),
          d.appendChild(v),
          !v.attachEvent ||
          (v.attachEvent.toString && v.attachEvent.toString().indexOf('[native code') < 0) ||
          a
            ? v.addEventListener(
                'load',
                function (e) {
                  s(e, h)
                },
                !1
              )
            : v.attachEvent('onreadystatechange', function (e) {
                s(e, h)
              }),
          (o.modules[f] = h)
      }
      return p
    }),
    (n.prototype.getStyle = function (t, o) {
      const n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null)
      return n[n.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](o)
    }),
    (n.prototype.link = function (e, n, r) {
      const a = this
      const u = t.createElement('link')
      const l = t.getElementsByTagName('head')[0]
      typeof n === 'string' && (r = n)
      const s = (r || e).replace(/\.|\//g, '')
      const c = (u.id = 'layuicss-' + s)
      let p = 0
      return (
        (u.rel = 'stylesheet'),
        (u.href = e + (o.debug ? '?v=' + new Date().getTime() : '')),
        (u.media = 'all'),
        t.getElementById(c) || l.appendChild(u),
        typeof n !== 'function'
          ? a
          : ((function y() {
              return ++p > (1e3 * o.timeout) / 100
                ? i(e + ' timeout')
                : void (parseInt(a.getStyle(t.getElementById(c), 'width')) === 1989
                    ? (function () {
                        n()
                      })()
                    : setTimeout(y, 100))
            })(),
            a)
      )
    }),
    (n.prototype.addcss = function (e, t, n) {
      return layui.link(o.dir + 'css/' + e, t, n)
    }),
    (n.prototype.img = function (e, t, o) {
      const n = new Image()
      return (
        (n.src = e),
        n.complete
          ? t(n)
          : ((n.onload = function () {
              ;(n.onload = null), t(n)
            }),
            void (n.onerror = function (e) {
              ;(n.onerror = null), o(e)
            }))
      )
    }),
    (n.prototype.config = function (e) {
      e = e || {}
      for (const t in e) o[t] = e[t]
      return this
    }),
    (n.prototype.modules = (function () {
      const e = {}
      for (const t in u) e[t] = u[t]
      return e
    })()),
    (n.prototype.extend = function (e) {
      const t = this
      e = e || {}
      for (const o in e)
        t[o] || t.modules[o] ? i('模块名 ' + o + ' 已被占用') : (t.modules[o] = e[o])
      return t
    }),
    (n.prototype.router = function (e) {
      const t = this
      var e = e || location.hash
      const o = { path: [], search: {}, hash: (e.match(/[^#](#.*$)/) || [])[1] || '' }
      return /^#\//.test(e)
        ? ((e =
            e
              .replace(/^#\//, '')
              .replace(/([^#])(#.*$)/, '$1')
              .split('/') || []),
          t.each(e, function (e, t) {
            ;/^\w+=/.test(t)
              ? (function () {
                  ;(t = t.split('=')), (o.search[t[0]] = t[1])
                })()
              : o.path.push(t)
          }),
          o)
        : o
    }),
    (n.prototype.data = function (t, o) {
      if (((t = t || 'layui'), e.JSON && e.JSON.parse)) {
        if (o === null) return delete localStorage[t]
        o = typeof o === 'object' ? o : { key: o }
        try {
          var n = JSON.parse(localStorage[t])
        } catch (r) {
          var n = {}
        }
        return (
          'value' in o && (n[o.key] = o.value),
          o.remove && delete n[o.key],
          (localStorage[t] = JSON.stringify(n)),
          o.key ? n[o.key] : n
        )
      }
    }),
    (n.prototype.device = function (t) {
      const o = navigator.userAgent.toLowerCase()
      const n = function (e) {
        const t = new RegExp(e + '/([^\\s\\_\\-]+)')
        return (e = (o.match(t) || [])[1]), e || !1
      }
      const r = {
        os: (function () {
          return /windows/.test(o)
            ? 'windows'
            : /linux/.test(o)
            ? 'linux'
            : /iphone|ipod|ipad|ios/.test(o)
            ? 'ios'
            : /mac/.test(o)
            ? 'mac'
            : void 0
        })(),
        ie: (function () {
          return (
            !!(e.ActiveXObject || 'ActiveXObject' in e) &&
            ((o.match(/msie\s(\d+)/) || [])[1] || '11')
          )
        })(),
        weixin: n('micromessenger')
      }
      return (
        t && !r[t] && (r[t] = n(t)), (r.android = /android/.test(o)), (r.ios = r.os === 'ios'), r
      )
    }),
    (n.prototype.hint = function () {
      return { error: i }
    }),
    (n.prototype.each = function (e, t) {
      let o
      const n = this
      if (typeof t !== 'function') return n
      if (((e = e || []), e.constructor === Object)) {
        for (o in e) if (t.call(e[o], o, e[o])) break
      } else for (o = 0; o < e.length && !t.call(e[o], o, e[o]); o++);
      return n
    }),
    (n.prototype.sort = function (e, t, o) {
      const n = JSON.parse(JSON.stringify(e || []))
      return t
        ? (n.sort(function (e, o) {
            const n = /^-?\d+$/
            let r = e[t]
            let i = o[t]
            return (
              n.test(r) && (r = parseFloat(r)),
              n.test(i) && (i = parseFloat(i)),
              r && !i ? 1 : !r && i ? -1 : r > i ? 1 : r < i ? -1 : 0
            )
          }),
          o && n.reverse(),
          n)
        : n
    }),
    (n.prototype.stope = function (t) {
      ;(t = t || e.event), t.stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0)
    }),
    (n.prototype.onevent = function (e, t, n) {
      return typeof e !== 'string' || typeof n !== 'function'
        ? this
        : ((o.event[e + '.' + t] = [n]), this)
    }),
    (n.prototype.event = function (e, t, n) {
      const r = this
      let i = null
      const a = t.match(/\(.*\)$/) || []
      const u = (t = e + '.' + t).replace(a, '')
      const l = function (e, t) {
        const o = t && t.call(r, n)
        o === !1 && i === null && (i = !1)
      }
      return layui.each(o.event[u], l), a[0] && layui.each(o.event[t], l), i
    }),
    (e.layui = new n())
})(window)
