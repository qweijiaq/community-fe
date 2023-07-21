/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define('jquery', function (e) {
  'use strict'
  const l = layui.$
  const o = function (e) {}
  const t = '<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon ">&#xe63e;</i>'
  ;(o.prototype.load = function (e) {
    let o
    let i
    var n
    let r
    const a = this
    let c = 0
    e = e || {}
    const f = l(e.elem)
    if (f[0]) {
      const m = l(e.scrollElem || document)
      const u = e.mb || 50
      const s = !('isAuto' in e) || e.isAuto
      const v = e.end || '没有更多了'
      const y = e.scrollElem && e.scrollElem !== document
      const d = '<cite>加载更多</cite>'
      const h = l('<div class="layui-flow-more"><a href="javascript:;">' + d + '</a></div>')
      f.find('.layui-flow-more')[0] || f.append(h)
      const p = function (e, t) {
        ;(e = l(e)),
          h.before(e),
          (t = t == 0 || null),
          t ? h.html(v) : h.find('a').html(d),
          (i = t),
          (o = null),
          n && n()
      }
      const g = function () {
        ;(o = !0), h.find('a').html(t), typeof e.done === 'function' && e.done(++c, p)
      }
      if (
        (g(),
        h.find('a').on('click', function () {
          l(this)
          i || o || g()
        }),
        e.isLazyimg)
      ) {
        var n = a.lazyimg({ elem: e.elem + ' img', scrollElem: e.scrollElem })
      }
      return s
        ? (m.on('scroll', function () {
            const e = l(this)
            const t = e.scrollTop()
            r && clearTimeout(r),
              i ||
                (r = setTimeout(function () {
                  const i = y ? e.height() : l(window).height()
                  const n = y ? e.prop('scrollHeight') : document.documentElement.scrollHeight
                  n - t - i <= u && (o || g())
                }, 100))
          }),
          a)
        : a
    }
  }),
    (o.prototype.lazyimg = function (e) {
      let o
      const t = this
      let i = 0
      e = e || {}
      const n = l(e.scrollElem || document)
      const r = e.elem || 'img'
      const a = e.scrollElem && e.scrollElem !== document
      const c = function (e, l) {
        const o = n.scrollTop()
        const r = o + l
        const c = a
          ? (function () {
              return e.offset().top - n.offset().top + o
            })()
          : e.offset().top
        if (c >= o && c <= r && !e.attr('src')) {
          const m = e.attr('lay-src')
          layui.img(m, function () {
            const l = t.lazyimg.elem.eq(i)
            e.attr('src', m).removeAttr('lay-src'), l[0] && f(l), i++
          })
        }
      }
      var f = function (e, o) {
        const f = a ? (o || n).height() : l(window).height()
        const m = n.scrollTop()
        const u = m + f
        if (((t.lazyimg.elem = l(r)), e)) c(e, f)
        else {
          for (let s = 0; s < t.lazyimg.elem.length; s++) {
            var v = t.lazyimg.elem.eq(s)
            const y = a
              ? (function () {
                  return v.offset().top - n.offset().top + m
                })()
              : v.offset().top
            if ((c(v, f), (i = s), y > u)) break
          }
        }
      }
      if ((f(), !o)) {
        let m
        n.on('scroll', function () {
          const e = l(this)
          m && clearTimeout(m),
            (m = setTimeout(function () {
              f(null, e)
            }, 50))
        }),
          (o = !0)
      }
      return f
    }),
    e('flow', new o())
})
