/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define(function (e) {
  'use strict'
  const a = document
  const t = 'getElementById'
  const n = 'getElementsByTagName'
  const i = 'laypage'
  const r = 'layui-disabled'
  const u = function (e) {
    const a = this
    ;(a.config = e || {}), (a.config.index = ++s.index), a.render(!0)
  }
  ;(u.prototype.type = function () {
    const e = this.config
    if (typeof e.elem === 'object') return void 0 === e.elem.length ? 2 : 3
  }),
    (u.prototype.view = function () {
      const e = this
      const a = e.config
      let t = (a.groups = 'groups' in a ? 0 | a.groups : 5)
      ;(a.layout = typeof a.layout === 'object' ? a.layout : ['prev', 'page', 'next']),
        (a.count = 0 | a.count),
        (a.curr = 0 | a.curr || 1),
        (a.limits = typeof a.limits === 'object' ? a.limits : [10, 20, 30, 40, 50]),
        (a.limit = 0 | a.limit || 10),
        (a.pages = Math.ceil(a.count / a.limit) || 1),
        a.curr > a.pages && (a.curr = a.pages),
        t < 0 ? (t = 1) : t > a.pages && (t = a.pages),
        (a.prev = 'prev' in a ? a.prev : '&#x4E0A;&#x4E00;&#x9875;'),
        (a.next = 'next' in a ? a.next : '&#x4E0B;&#x4E00;&#x9875;')
      const n = a.pages > t ? Math.ceil((a.curr + (t > 1 ? 1 : 0)) / (t > 0 ? t : 1)) : 1
      const i = {
        prev: (function () {
          return a.prev
            ? '<a href="javascript:;" class="layui-laypage-prev' +
                (a.curr == 1 ? ' ' + r : '') +
                '" data-page="' +
                (a.curr - 1) +
                '">' +
                a.prev +
                '</a>'
            : ''
        })(),
        page: (function () {
          const e = []
          if (a.count < 1) return ''
          n > 1 &&
            a.first !== !1 &&
            t !== 0 &&
            e.push(
              '<a href="javascript:;" class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">' +
                (a.first || 1) +
                '</a>'
            )
          const i = Math.floor((t - 1) / 2)
          let r = n > 1 ? a.curr - i : 1
          const u =
            n > 1
              ? (function () {
                  const e = a.curr + (t - i - 1)
                  return e > a.pages ? a.pages : e
                })()
              : t
          for (
            u - r < t - 1 && (r = u - t + 1),
              a.first !== !1 && r > 2 && e.push('<span class="layui-laypage-spr">&#x2026;</span>');
            r <= u;
            r++
          ) {
            r === a.curr
              ? e.push(
                  '<span class="layui-laypage-curr"><em class="layui-laypage-em" ' +
                    (/^#/.test(a.theme) ? 'style="background-color:' + a.theme + ';"' : '') +
                    '></em><em>' +
                    r +
                    '</em></span>'
                )
              : e.push('<a href="javascript:;" data-page="' + r + '">' + r + '</a>')
          }
          return (
            a.pages > t &&
              a.pages > u &&
              a.last !== !1 &&
              (u + 1 < a.pages && e.push('<span class="layui-laypage-spr">&#x2026;</span>'),
              t !== 0 &&
                e.push(
                  '<a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="' +
                    a.pages +
                    '">' +
                    (a.last || a.pages) +
                    '</a>'
                )),
            e.join('')
          )
        })(),
        next: (function () {
          return a.next
            ? '<a href="javascript:;" class="layui-laypage-next' +
                (a.curr == a.pages ? ' ' + r : '') +
                '" data-page="' +
                (a.curr + 1) +
                '">' +
                a.next +
                '</a>'
            : ''
        })(),
        count: '<span class="layui-laypage-count">共 ' + a.count + ' 条</span>',
        limit: (function () {
          const e = ['<span class="layui-laypage-limits"><select lay-ignore>']
          return (
            layui.each(a.limits, function (t, n) {
              e.push(
                '<option value="' +
                  n +
                  '"' +
                  (n === a.limit ? 'selected' : '') +
                  '>' +
                  n +
                  ' 条/页</option>'
              )
            }),
            e.join('') + '</select></span>'
          )
        })(),
        skip: (function () {
          return [
            '<span class="layui-laypage-skip">&#x5230;&#x7B2C;',
            '<input type="text" min="1" value="' + a.curr + '" class="layui-input">',
            '&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>',
            '</span>'
          ].join('')
        })()
      }
      return [
        '<div class="layui-box layui-laypage layui-laypage-' +
          (a.theme ? (/^#/.test(a.theme) ? 'molv' : a.theme) : 'default') +
          '" id="layui-laypage-' +
          a.index +
          '">',
        (function () {
          const e = []
          return (
            layui.each(a.layout, function (a, t) {
              i[t] && e.push(i[t])
            }),
            e.join('')
          )
        })(),
        '</div>'
      ].join('')
    }),
    (u.prototype.jump = function (e, a) {
      if (e) {
        const t = this
        const i = t.config
        const r = e.children
        const u = e[n]('button')[0]
        const l = e[n]('input')[0]
        const p = e[n]('select')[0]
        const c = function () {
          const e = 0 | l.value.replace(/\s|\D/g, '')
          e && ((i.curr = e), t.render())
        }
        if (a) return c()
        for (let o = 0, y = r.length; o < y; o++) {
          r[o].nodeName.toLowerCase() === 'a' &&
            s.on(r[o], 'click', function () {
              const e = 0 | this.getAttribute('data-page')
              e < 1 || e > i.pages || ((i.curr = e), t.render())
            })
        }
        p &&
          s.on(p, 'change', function () {
            const e = this.value
            i.curr * e > i.count && (i.curr = Math.ceil(i.count / e)), (i.limit = e), t.render()
          }),
          u &&
            s.on(u, 'click', function () {
              c()
            })
      }
    }),
    (u.prototype.skip = function (e) {
      if (e) {
        const a = this
        const t = e[n]('input')[0]
        t &&
          s.on(t, 'keyup', function (t) {
            const n = this.value
            const i = t.keyCode
            ;/^(37|38|39|40)$/.test(i) ||
              (/\D/.test(n) && (this.value = n.replace(/\D/, '')), i === 13 && a.jump(e, !0))
          })
      }
    }),
    (u.prototype.render = function (e) {
      const n = this
      const i = n.config
      const r = n.type()
      const u = n.view()
      r === 2
        ? i.elem && (i.elem.innerHTML = u)
        : r === 3
        ? i.elem.html(u)
        : a[t](i.elem) && (a[t](i.elem).innerHTML = u),
        i.jump && i.jump(i, e)
      const s = a[t]('layui-laypage-' + i.index)
      n.jump(s), i.hash && !e && (location.hash = '!' + i.hash + '=' + i.curr), n.skip(s)
    })
  var s = {
    render: function (e) {
      const a = new u(e)
      return a.index
    },
    index: layui.laypage ? layui.laypage.index + 1e4 : 0,
    on: function (e, a, t) {
      return (
        e.attachEvent
          ? e.attachEvent('on' + a, function (a) {
              ;(a.target = a.srcElement), t.call(e, a)
            })
          : e.addEventListener(a, t, !1),
        this
      )
    }
  }
  e(i, s)
})
