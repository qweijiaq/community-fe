/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define('jquery', function (e) {
  'use strict'
  const i = layui.$
  const n =
    (layui.hint(),
    layui.device(),
    {
      config: {},
      set: function (e) {
        const n = this
        return (n.config = i.extend({}, n.config, e)), n
      },
      on: function (e, i) {
        return layui.onevent.call(this, t, e, i)
      }
    })
  var t = 'carousel'
  const a = 'layui-this'
  const l = '>*[carousel-item]>*'
  const o = 'layui-carousel-left'
  const r = 'layui-carousel-right'
  const d = 'layui-carousel-prev'
  const s = 'layui-carousel-next'
  const u = 'layui-carousel-arrow'
  const c = 'layui-carousel-ind'
  const m = function (e) {
    const t = this
    ;(t.config = i.extend({}, t.config, n.config, e)), t.render()
  }
  ;(m.prototype.config = {
    width: '600px',
    height: '280px',
    full: !1,
    arrow: 'hover',
    indicator: 'inside',
    autoplay: !0,
    interval: 3e3,
    anim: '',
    trigger: 'click',
    index: 0
  }),
    (m.prototype.render = function () {
      const e = this
      const n = e.config
      ;(n.elem = i(n.elem)),
        n.elem[0] &&
          ((e.elemItem = n.elem.find(l)),
          n.index < 0 && (n.index = 0),
          n.index >= e.elemItem.length && (n.index = e.elemItem.length - 1),
          n.interval < 800 && (n.interval = 800),
          n.full
            ? n.elem.css({ position: 'fixed', width: '100%', height: '100%', zIndex: 9999 })
            : n.elem.css({ width: n.width, height: n.height }),
          n.elem.attr('lay-anim', n.anim),
          e.elemItem.eq(n.index).addClass(a),
          e.elemItem.length <= 1 || (e.indicator(), e.arrow(), e.autoplay(), e.events()))
    }),
    (m.prototype.reload = function (e) {
      const n = this
      clearInterval(n.timer), (n.config = i.extend({}, n.config, e)), n.render()
    }),
    (m.prototype.prevIndex = function () {
      const e = this
      const i = e.config
      let n = i.index - 1
      return n < 0 && (n = e.elemItem.length - 1), n
    }),
    (m.prototype.nextIndex = function () {
      const e = this
      const i = e.config
      let n = i.index + 1
      return n >= e.elemItem.length && (n = 0), n
    }),
    (m.prototype.addIndex = function (e) {
      const i = this
      const n = i.config
      ;(e = e || 1), (n.index = n.index + e), n.index >= i.elemItem.length && (n.index = 0)
    }),
    (m.prototype.subIndex = function (e) {
      const i = this
      const n = i.config
      ;(e = e || 1), (n.index = n.index - e), n.index < 0 && (n.index = i.elemItem.length - 1)
    }),
    (m.prototype.autoplay = function () {
      const e = this
      const i = e.config
      i.autoplay &&
        (e.timer = setInterval(function () {
          e.slide()
        }, i.interval))
    }),
    (m.prototype.arrow = function () {
      const e = this
      const n = e.config
      const t = i(
        [
          '<button class="layui-icon ' +
            u +
            '" lay-type="sub">' +
            (n.anim === 'updown' ? '&#xe619;' : '&#xe603;') +
            '</button>',
          '<button class="layui-icon ' +
            u +
            '" lay-type="add">' +
            (n.anim === 'updown' ? '&#xe61a;' : '&#xe602;') +
            '</button>'
        ].join('')
      )
      n.elem.attr('lay-arrow', n.arrow),
        n.elem.find('.' + u)[0] && n.elem.find('.' + u).remove(),
        n.elem.append(t),
        t.on('click', function () {
          const n = i(this)
          const t = n.attr('lay-type')
          e.slide(t)
        })
    }),
    (m.prototype.indicator = function () {
      const e = this
      const n = e.config
      const t = (e.elemInd = i(
        [
          '<div class="' + c + '"><ul>',
          (function () {
            const i = []
            return (
              layui.each(e.elemItem, function (e) {
                i.push('<li' + (n.index === e ? ' class="layui-this"' : '') + '></li>')
              }),
              i.join('')
            )
          })(),
          '</ul></div>'
        ].join('')
      ))
      n.elem.attr('lay-indicator', n.indicator),
        n.elem.find('.' + c)[0] && n.elem.find('.' + c).remove(),
        n.elem.append(t),
        n.anim === 'updown' && t.css('margin-top', -(t.height() / 2)),
        t.find('li').on(n.trigger === 'hover' ? 'mouseover' : n.trigger, function () {
          const t = i(this)
          const a = t.index()
          a > n.index ? e.slide('add', a - n.index) : a < n.index && e.slide('sub', n.index - a)
        })
    }),
    (m.prototype.slide = function (e, i) {
      const n = this
      const l = n.elemItem
      const u = n.config
      const c = u.index
      const m = u.elem.attr('lay-filter')
      n.haveSlide ||
        (e === 'sub'
          ? (n.subIndex(i),
            l.eq(u.index).addClass(d),
            setTimeout(function () {
              l.eq(c).addClass(r), l.eq(u.index).addClass(r)
            }, 50))
          : (n.addIndex(i),
            l.eq(u.index).addClass(s),
            setTimeout(function () {
              l.eq(c).addClass(o), l.eq(u.index).addClass(o)
            }, 50)),
        setTimeout(function () {
          l.removeClass(a + ' ' + d + ' ' + s + ' ' + o + ' ' + r),
            l.eq(u.index).addClass(a),
            (n.haveSlide = !1)
        }, 300),
        n.elemInd.find('li').eq(u.index).addClass(a).siblings().removeClass(a),
        (n.haveSlide = !0),
        layui.event.call(this, t, 'change(' + m + ')', {
          index: u.index,
          prevIndex: c,
          item: l.eq(u.index)
        }))
    }),
    (m.prototype.events = function () {
      const e = this
      const i = e.config
      i.elem.data('haveEvents') ||
        (i.elem
          .on('mouseenter', function () {
            clearInterval(e.timer)
          })
          .on('mouseleave', function () {
            e.autoplay()
          }),
        i.elem.data('haveEvents', !0))
    }),
    (n.render = function (e) {
      const i = new m(e)
      return i
    }),
    e(t, n)
})
