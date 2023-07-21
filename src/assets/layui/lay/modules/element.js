/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define('jquery', function (i) {
  'use strict'
  const t = layui.$
  const a = (layui.hint(), layui.device())
  const e = 'element'
  const l = 'layui-this'
  const n = 'layui-show'
  const s = function () {
    this.config = {}
  }
  ;(s.prototype.set = function (i) {
    const a = this
    return t.extend(!0, a.config, i), a
  }),
    (s.prototype.on = function (i, t) {
      return layui.onevent.call(this, e, i, t)
    }),
    (s.prototype.tabAdd = function (i, a) {
      const e = '.layui-tab-title'
      const l = t('.layui-tab[lay-filter=' + i + ']')
      const n = l.children(e)
      const s = n.children('.layui-tab-bar')
      const o = l.children('.layui-tab-content')
      const c = '<li lay-id="' + (a.id || '') + '">' + (a.title || 'unnaming') + '</li>'
      return (
        s[0] ? s.before(c) : n.append(c),
        o.append('<div class="layui-tab-item">' + (a.content || '') + '</div>'),
        y.hideTabMore(!0),
        y.tabAuto(),
        this
      )
    }),
    (s.prototype.tabDelete = function (i, a) {
      const e = '.layui-tab-title'
      const l = t('.layui-tab[lay-filter=' + i + ']')
      const n = l.children(e)
      const s = n.find('>li[lay-id="' + a + '"]')
      return y.tabDelete(null, s), this
    }),
    (s.prototype.tabChange = function (i, a) {
      const e = '.layui-tab-title'
      const l = t('.layui-tab[lay-filter=' + i + ']')
      const n = l.children(e)
      const s = n.find('>li[lay-id="' + a + '"]')
      return y.tabClick(null, null, s), this
    }),
    (s.prototype.tab = function (i) {
      ;(i = i || {}),
        v.on('click', i.headerElem, function (a) {
          const e = t(this).index()
          y.tabClick.call(this, a, e, null, i)
        })
    }),
    (s.prototype.progress = function (i, a) {
      const e = 'layui-progress'
      const l = t('.' + e + '[lay-filter=' + i + ']')
      const n = l.find('.' + e + '-bar')
      const s = n.find('.' + e + '-text')
      return n.css('width', a), s.text(a), this
    })
  const o = '.layui-nav'
  const c = 'layui-nav-item'
  const r = 'layui-nav-bar'
  const u = 'layui-nav-tree'
  const d = 'layui-nav-child'
  const h = 'layui-nav-more'
  const f = 'layui-anim layui-anim-upbit'
  var y = {
    tabClick: function (i, a, s, o) {
      o = o || {}
      const c = s || t(this)
      var a = a || c.parent().children('li').index(c)
      const r = o.headerElem ? c.parent() : c.parents('.layui-tab').eq(0)
      const u = o.bodyElem
        ? t(o.bodyElem)
        : r.children('.layui-tab-content').children('.layui-tab-item')
      const d = c.find('a')
      const h = r.attr('lay-filter')
      ;(d.attr('href') !== 'javascript:;' && d.attr('target') === '_blank') ||
        (c.addClass(l).siblings().removeClass(l), u.eq(a).addClass(n).siblings().removeClass(n)),
        layui.event.call(this, e, 'tab(' + h + ')', { elem: r, index: a })
    },
    tabDelete: function (i, a) {
      const n = a || t(this).parent()
      const s = n.index()
      const o = n.parents('.layui-tab').eq(0)
      const c = o.children('.layui-tab-content').children('.layui-tab-item')
      const r = o.attr('lay-filter')
      n.hasClass(l) &&
        (n.next()[0]
          ? y.tabClick.call(n.next()[0], null, s + 1)
          : n.prev()[0] && y.tabClick.call(n.prev()[0], null, s - 1)),
        n.remove(),
        c.eq(s).remove(),
        setTimeout(function () {
          y.tabAuto()
        }, 50),
        layui.event.call(this, e, 'tabDelete(' + r + ')', { elem: o, index: s })
    },
    tabAuto: function () {
      const i = 'layui-tab-more'
      const e = 'layui-tab-bar'
      const l = 'layui-tab-close'
      const n = this
      t('.layui-tab').each(function () {
        const s = t(this)
        const o = s.children('.layui-tab-title')
        const c =
          (s.children('.layui-tab-content').children('.layui-tab-item'), 'lay-stope="tabmore"')
        const r = t(
          '<span class="layui-unselect layui-tab-bar" ' +
            c +
            '><i ' +
            c +
            ' class="layui-icon">&#xe61a;</i></span>'
        )
        if (
          (n === window && a.ie != 8 && y.hideTabMore(!0),
          s.attr('lay-allowClose') &&
            o.find('li').each(function () {
              const i = t(this)
              if (!i.find('.' + l)[0]) {
                const a = t('<i class="layui-icon layui-unselect ' + l + '">&#x1006;</i>')
                a.on('click', y.tabDelete), i.append(a)
              }
            }),
          o.prop('scrollWidth') > o.outerWidth() + 1)
        ) {
          if (o.find('.' + e)[0]) return
          o.append(r),
            s.attr('overflow', ''),
            r.on('click', function (t) {
              o[this.title ? 'removeClass' : 'addClass'](i), (this.title = this.title ? '' : '收缩')
            })
        } else o.find('.' + e).remove(), s.removeAttr('overflow')
      })
    },
    hideTabMore: function (i) {
      const a = t('.layui-tab-title')
      ;(i !== !0 && t(i.target).attr('lay-stope') === 'tabmore') ||
        (a.removeClass('layui-tab-more'), a.find('.layui-tab-bar').attr('title', ''))
    },
    clickThis: function () {
      const i = t(this)
      const a = i.parents(o)
      const n = a.attr('lay-filter')
      const s = i.find('a')
      const c = typeof i.attr('lay-unselect') === 'string'
      i.find('.' + d)[0] ||
        ((s.attr('href') !== 'javascript:;' && s.attr('target') === '_blank') ||
          c ||
          (a.find('.' + l).removeClass(l), i.addClass(l)),
        layui.event.call(this, e, 'nav(' + n + ')', i))
    },
    clickChild: function () {
      const i = t(this)
      const a = i.parents(o)
      const n = a.attr('lay-filter')
      a.find('.' + l).removeClass(l), i.addClass(l), layui.event.call(this, e, 'nav(' + n + ')', i)
    },
    showChild: function () {
      const i = t(this)
      const a = i.parents(o)
      const e = i.parent()
      const l = i.siblings('.' + d)
      a.hasClass(u) &&
        (l.removeClass(f), e[l.css('display') === 'none' ? 'addClass' : 'removeClass'](c + 'ed'))
    },
    collapse: function () {
      const i = t(this)
      const a = i.find('.layui-colla-icon')
      const l = i.siblings('.layui-colla-content')
      const s = i.parents('.layui-collapse').eq(0)
      const o = s.attr('lay-filter')
      const c = l.css('display') === 'none'
      if (typeof s.attr('lay-accordion') === 'string') {
        const r = s.children('.layui-colla-item').children('.' + n)
        r.siblings('.layui-colla-title').children('.layui-colla-icon').html('&#xe602;'),
          r.removeClass(n)
      }
      l[c ? 'addClass' : 'removeClass'](n),
        a.html(c ? '&#xe61a;' : '&#xe602;'),
        layui.event.call(this, e, 'collapse(' + o + ')', { title: i, content: l, show: c })
    }
  }
  ;(s.prototype.init = function (i, e) {
    const l = (function () {
      return e ? '[lay-filter="' + e + '"]' : ''
    })()
    const s = {
      tab: function () {
        y.tabAuto.call({})
      },
      nav: function () {
        const i = 200
        const e = {}
        const s = {}
        const p = {}
        const v = function (l, o, c) {
          const r = t(this)
          const y = r.find('.' + d)
          o.hasClass(u)
            ? l.css({ top: r.position().top, height: r.children('a').height(), opacity: 1 })
            : (y.addClass(f),
              l.css({
                left: r.position().left + parseFloat(r.css('marginLeft')),
                top: r.position().top + r.height() - l.height()
              }),
              (e[c] = setTimeout(
                function () {
                  l.css({ width: r.width(), opacity: 1 })
                },
                a.ie && a.ie < 10 ? 0 : i
              )),
              clearTimeout(p[c]),
              y.css('display') === 'block' && clearTimeout(s[c]),
              (s[c] = setTimeout(function () {
                y.addClass(n), r.find('.' + h).addClass(h + 'd')
              }, 300)))
        }
        t(o + l).each(function (a) {
          const l = t(this)
          const o = t('<span class="' + r + '"></span>')
          const f = l.find('.' + c)
          l.find('.' + r)[0] ||
            (l.append(o),
            f
              .on('mouseenter', function () {
                v.call(this, o, l, a)
              })
              .on('mouseleave', function () {
                l.hasClass(u) ||
                  (clearTimeout(s[a]),
                  (s[a] = setTimeout(function () {
                    l.find('.' + d).removeClass(n), l.find('.' + h).removeClass(h + 'd')
                  }, 300)))
              }),
            l.on('mouseleave', function () {
              clearTimeout(e[a]),
                (p[a] = setTimeout(function () {
                  l.hasClass(u)
                    ? o.css({ height: 0, top: o.position().top + o.height() / 2, opacity: 0 })
                    : o.css({ width: 0, left: o.position().left + o.width() / 2, opacity: 0 })
                }, i))
            })),
            f.each(function () {
              const i = t(this)
              const a = i.find('.' + d)
              if (a[0] && !i.find('.' + h)[0]) {
                const e = i.children('a')
                e.append('<span class="' + h + '"></span>')
              }
              i.off('click', y.clickThis).on('click', y.clickThis),
                i.children('a').off('click', y.showChild).on('click', y.showChild),
                a.children('dd').off('click', y.clickChild).on('click', y.clickChild)
            })
        })
      },
      breadcrumb: function () {
        const i = '.layui-breadcrumb'
        t(i + l).each(function () {
          const i = t(this)
          const a = 'lay-separator'
          const e = i.attr(a) || '/'
          const l = i.find('a')
          l.next('span[' + a + ']')[0] ||
            (l.each(function (i) {
              i !== l.length - 1 && t(this).after('<span ' + a + '>' + e + '</span>')
            }),
            i.css('visibility', 'visible'))
        })
      },
      progress: function () {
        const i = 'layui-progress'
        t('.' + i + l).each(function () {
          const a = t(this)
          const e = a.find('.layui-progress-bar')
          const l = e.attr('lay-percent')
          e.css(
            'width',
            (function () {
              return /^.+\/.+$/.test(l) ? 100 * new Function('return ' + l)() + '%' : l
            })()
          ),
            a.attr('lay-showPercent') &&
              setTimeout(function () {
                e.html('<span class="' + i + '-text">' + l + '</span>')
              }, 350)
        })
      },
      collapse: function () {
        const i = 'layui-collapse'
        t('.' + i + l).each(function () {
          const i = t(this).find('.layui-colla-item')
          i.each(function () {
            const i = t(this)
            const a = i.find('.layui-colla-title')
            const e = i.find('.layui-colla-content')
            const l = e.css('display') === 'none'
            a.find('.layui-colla-icon').remove(),
              a.append(
                '<i class="layui-icon layui-colla-icon">' + (l ? '&#xe602;' : '&#xe61a;') + '</i>'
              ),
              a.off('click', y.collapse).on('click', y.collapse)
          })
        })
      }
    }
    return s[i]
      ? s[i]()
      : layui.each(s, function (i, t) {
          t()
        })
  }),
    (s.prototype.render = s.prototype.init)
  const p = new s()
  var v = t(document)
  p.render()
  const b = '.layui-tab-title li'
  v.on('click', b, y.tabClick),
    v.on('click', y.hideTabMore),
    t(window).on('resize', y.tabAuto),
    i(e, p)
})
