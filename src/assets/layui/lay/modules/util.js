/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define('jquery', function (e) {
  'use strict'
  const t = layui.$
  const i = {
    fixbar: function (e) {
      let i
      let o
      const a = 'layui-fixbar'
      const r = 'layui-fixbar-top'
      const n = t(document)
      const l = t('body')
      ;(e = t.extend({ showHeight: 200 }, e)),
        (e.bar1 = e.bar1 === !0 ? '&#xe606;' : e.bar1),
        (e.bar2 = e.bar2 === !0 ? '&#xe607;' : e.bar2),
        (e.bgcolor = e.bgcolor ? 'background-color:' + e.bgcolor : '')
      const c = [e.bar1, e.bar2, '&#xe604;']
      const g = t(
        [
          '<ul class="' + a + '">',
          e.bar1
            ? '<li class="layui-icon" lay-type="bar1" style="' + e.bgcolor + '">' + c[0] + '</li>'
            : '',
          e.bar2
            ? '<li class="layui-icon" lay-type="bar2" style="' + e.bgcolor + '">' + c[1] + '</li>'
            : '',
          '<li class="layui-icon ' +
            r +
            '" lay-type="top" style="' +
            e.bgcolor +
            '">' +
            c[2] +
            '</li>',
          '</ul>'
        ].join('')
      )
      const s = g.find('.' + r)
      const u = function () {
        const t = n.scrollTop()
        t >= e.showHeight ? i || (s.show(), (i = 1)) : i && (s.hide(), (i = 0))
      }
      t('.' + a)[0] ||
        (typeof e.css === 'object' && g.css(e.css),
        l.append(g),
        u(),
        g.find('li').on('click', function () {
          const i = t(this)
          const o = i.attr('lay-type')
          o === 'top' && t('html,body').animate({ scrollTop: 0 }, 200),
            e.click && e.click.call(this, o)
        }),
        n.on('scroll', function () {
          clearTimeout(o),
            (o = setTimeout(function () {
              u()
            }, 100))
        }))
    },
    countdown: function (e, t, i) {
      const o = this
      const a = typeof t === 'function'
      const r = new Date(e).getTime()
      const n = new Date(!t || a ? new Date().getTime() : t).getTime()
      const l = r - n
      const c = [
        Math.floor(l / 864e5),
        Math.floor(l / 36e5) % 24,
        Math.floor(l / 6e4) % 60,
        Math.floor(l / 1e3) % 60
      ]
      a && (i = t)
      const g = setTimeout(function () {
        o.countdown(e, n + 1e3, i)
      }, 1e3)
      return i && i(l > 0 ? c : [0, 0, 0, 0], t, g), l <= 0 && clearTimeout(g), g
    },
    timeAgo: function (e, t) {
      const i = this
      const o = [[], []]
      let a = new Date().getTime() - new Date(e).getTime()
      return a > 6912e5
        ? ((a = new Date(e)),
          (o[0][0] = i.digit(a.getFullYear(), 4)),
          (o[0][1] = i.digit(a.getMonth() + 1)),
          (o[0][2] = i.digit(a.getDate())),
          t ||
            ((o[1][0] = i.digit(a.getHours())),
            (o[1][1] = i.digit(a.getMinutes())),
            (o[1][2] = i.digit(a.getSeconds()))),
          o[0].join('-') + ' ' + o[1].join(':'))
        : a >= 864e5
        ? ((a / 1e3 / 60 / 60 / 24) | 0) + '天前'
        : a >= 36e5
        ? ((a / 1e3 / 60 / 60) | 0) + '小时前'
        : a >= 12e4
        ? ((a / 1e3 / 60) | 0) + '分钟前'
        : a < 0
        ? '未来'
        : '刚刚'
    },
    digit: function (e, t) {
      let i = ''
      ;(e = String(e)), (t = t || 2)
      for (let o = e.length; o < t; o++) i += '0'
      return e < Math.pow(10, t) ? i + (0 | e) : e
    },
    toDateString: function (e, t) {
      const i = this
      const o = new Date(e || new Date())
      const a = [i.digit(o.getFullYear(), 4), i.digit(o.getMonth() + 1), i.digit(o.getDate())]
      const r = [i.digit(o.getHours()), i.digit(o.getMinutes()), i.digit(o.getSeconds())]
      return (
        (t = t || 'yyyy-MM-dd HH:mm:ss'),
        t
          .replace(/yyyy/g, a[0])
          .replace(/MM/g, a[1])
          .replace(/dd/g, a[2])
          .replace(/HH/g, r[0])
          .replace(/mm/g, r[1])
          .replace(/ss/g, r[2])
      )
    }
  }
  e('util', i)
})
