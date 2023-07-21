/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define('jquery', function (e) {
  'use strict'
  const o = layui.$
  const a = layui.hint()
  const i = 'layui-tree-enter'
  const r = function (e) {
    this.options = e
  }
  const t = {
    arrow: ['&#xe623;', '&#xe625;'],
    checkbox: ['&#xe626;', '&#xe627;'],
    radio: ['&#xe62b;', '&#xe62a;'],
    branch: ['&#xe622;', '&#xe624;'],
    leaf: '&#xe621;'
  }
  ;(r.prototype.init = function (e) {
    const o = this
    e.addClass('layui-box layui-tree'),
      o.options.skin && e.addClass('layui-tree-skin-' + o.options.skin),
      o.tree(e),
      o.on(e)
  }),
    (r.prototype.tree = function (e, a) {
      const i = this
      const r = i.options
      const n = a || r.nodes
      layui.each(n, function (a, n) {
        const l = n.children && n.children.length > 0
        const c = o('<ul class="' + (n.spread ? 'layui-show' : '') + '"></ul>')
        const s = o(
          [
            '<li ' + (n.spread ? 'data-spread="' + n.spread + '"' : '') + '>',
            (function () {
              return l
                ? '<i class="layui-icon layui-tree-spread">' +
                    (n.spread ? t.arrow[1] : t.arrow[0]) +
                    '</i>'
                : ''
            })(),
            (function () {
              return r.check
                ? '<i class="layui-icon layui-tree-check">' +
                    (r.check === 'checkbox'
                      ? t.checkbox[0]
                      : r.check === 'radio'
                      ? t.radio[0]
                      : '') +
                    '</i>'
                : ''
            })(),
            (function () {
              return (
                '<a href="' +
                (n.href || 'javascript:;') +
                '" ' +
                (r.target && n.href ? 'target="' + r.target + '"' : '') +
                '>' +
                ('<i class="layui-icon layui-tree-' +
                  (l ? 'branch' : 'leaf') +
                  '">' +
                  (l ? (n.spread ? t.branch[1] : t.branch[0]) : t.leaf) +
                  '</i>') +
                ('<cite>' + (n.name || '未命名') + '</cite></a>')
              )
            })(),
            '</li>'
          ].join('')
        )
        l && (s.append(c), i.tree(c, n.children)),
          e.append(s),
          typeof r.click === 'function' && i.click(s, n),
          i.spread(s, n),
          r.drag && i.drag(s, n)
      })
    }),
    (r.prototype.click = function (e, o) {
      const a = this
      const i = a.options
      e.children('a').on('click', function (e) {
        layui.stope(e), i.click(o)
      })
    }),
    (r.prototype.spread = function (e, o) {
      const a = this
      const i = (a.options, e.children('.layui-tree-spread'))
      const r = e.children('ul')
      const n = e.children('a')
      const l = function () {
        e.data('spread')
          ? (e.data('spread', null),
            r.removeClass('layui-show'),
            i.html(t.arrow[0]),
            n.find('.layui-icon').html(t.branch[0]))
          : (e.data('spread', !0),
            r.addClass('layui-show'),
            i.html(t.arrow[1]),
            n.find('.layui-icon').html(t.branch[1]))
      }
      r[0] && (i.on('click', l), n.on('dblclick', l))
    }),
    (r.prototype.on = function (e) {
      const a = this
      const r = a.options
      const t = 'layui-tree-drag'
      e.find('i').on('selectstart', function (e) {
        return !1
      }),
        r.drag &&
          o(document)
            .on('mousemove', function (e) {
              const i = a.move
              if (i.from) {
                const r = (i.to, o('<div class="layui-box ' + t + '"></div>'))
                e.preventDefault(), o('.' + t)[0] || o('body').append(r)
                const n = o('.' + t)[0] ? o('.' + t) : r
                n.addClass('layui-show').html(i.from.elem.children('a').html()),
                  n.css({ left: e.pageX + 10, top: e.pageY + 10 })
              }
            })
            .on('mouseup', function () {
              const e = a.move
              e.from &&
                (e.from.elem.children('a').removeClass(i),
                e.to && e.to.elem.children('a').removeClass(i),
                (a.move = {}),
                o('.' + t).remove())
            })
    }),
    (r.prototype.move = {}),
    (r.prototype.drag = function (e, a) {
      const r = this
      const t = (r.options, e.children('a'))
      const n = function () {
        const t = o(this)
        const n = r.move
        n.from && ((n.to = { item: a, elem: e }), t.addClass(i))
      }
      t.on('mousedown', function () {
        const o = r.move
        o.from = { item: a, elem: e }
      }),
        t
          .on('mouseenter', n)
          .on('mousemove', n)
          .on('mouseleave', function () {
            const e = o(this)
            const a = r.move
            a.from && (delete a.to, e.removeClass(i))
          })
    }),
    e('tree', function (e) {
      const i = new r((e = e || {}))
      const t = o(e.elem)
      return t[0] ? void i.init(t) : a.error('layui.tree 没有找到' + e.elem + '元素')
    })
})
