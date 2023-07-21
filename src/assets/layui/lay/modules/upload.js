/** layui-v2.2.3 MIT License By http://www.layui.com */
layui.define('layer', function (e) {
  'use strict'
  const t = layui.$
  const i = layui.layer
  const n = layui.hint()
  const a = layui.device()
  const o = {
    config: {},
    set: function (e) {
      const i = this
      return (i.config = t.extend({}, i.config, e)), i
    },
    on: function (e, t) {
      return layui.onevent.call(this, r, e, t)
    }
  }
  const l = function () {
    const e = this
    return {
      upload: function (t) {
        e.upload.call(e, t)
      },
      config: e.config
    }
  }
  var r = 'upload'
  const u = 'layui-upload-file'
  const c = 'layui-upload-form'
  const f = 'layui-upload-iframe'
  const s = 'layui-upload-choose'
  const p = function (e) {
    const i = this
    ;(i.config = t.extend({}, i.config, o.config, e)), i.render()
  }
  ;(p.prototype.config = {
    accept: 'images',
    exts: '',
    auto: !0,
    bindAction: '',
    url: '',
    field: 'file',
    method: 'post',
    data: {},
    drag: !0,
    size: 0,
    number: 0,
    multiple: !1
  }),
    (p.prototype.render = function (e) {
      const i = this
      var e = i.config
      ;(e.elem = t(e.elem)), (e.bindAction = t(e.bindAction)), i.file(), i.events()
    }),
    (p.prototype.file = function () {
      const e = this
      const i = e.config
      const n = (e.elemFile = t(
        [
          '<input class="' + u + '" type="file" name="' + i.field + '"',
          i.multiple ? ' multiple' : '',
          '>'
        ].join('')
      ))
      const o = i.elem.next()
      ;(o.hasClass(u) || o.hasClass(c)) && o.remove(),
        a.ie && a.ie < 10 && i.elem.wrap('<div class="layui-upload-wrap"></div>'),
        e.isFile() ? ((e.elemFile = i.elem), (i.field = i.elem[0].name)) : i.elem.after(n),
        a.ie && a.ie < 10 && e.initIE()
    }),
    (p.prototype.initIE = function () {
      const e = this
      const i = e.config
      const n = t(
        '<iframe id="' + f + '" class="' + f + '" name="' + f + '" frameborder="0"></iframe>'
      )
      const a = t(
        [
          '<form target="' + f + '" class="' + c + '" method="' + i.method,
          '" key="set-mine" enctype="multipart/form-data" action="' + i.url + '">',
          '</form>'
        ].join('')
      )
      t('#' + f)[0] || t('body').append(n),
        i.elem.next().hasClass(f) ||
          (e.elemFile.wrap(a),
          i.elem.next('.' + f).append(
            (function () {
              const e = []
              return (
                layui.each(i.data, function (t, i) {
                  e.push('<input type="hidden" name="' + t + '" value="' + i + '">')
                }),
                e.join('')
              )
            })()
          ))
    }),
    (p.prototype.msg = function (e) {
      return i.msg(e, { icon: 2, shift: 6 })
    }),
    (p.prototype.isFile = function () {
      const e = this.config.elem[0]
      if (e) return e.tagName.toLocaleLowerCase() === 'input' && e.type === 'file'
    }),
    (p.prototype.preview = function (e) {
      const t = this
      window.FileReader &&
        layui.each(t.chooseFiles, function (t, i) {
          const n = new FileReader()
          n.readAsDataURL(i),
            (n.onload = function () {
              e && e(t, i, this.result)
            })
        })
    }),
    (p.prototype.upload = function (e, i) {
      let n
      const o = this
      const l = o.config
      const r = o.elemFile[0]
      const u = function () {
        let i = 0
        let n = 0
        const a = e || o.files || o.chooseFiles || r.files
        const u = function () {
          l.multiple &&
            i + n === o.fileLength &&
            typeof l.allDone === 'function' &&
            l.allDone({ total: o.fileLength, successful: i, aborted: n })
        }
        layui.each(a, function (e, a) {
          const r = new FormData()
          r.append(l.field, a),
            layui.each(l.data, function (e, t) {
              r.append(e, t)
            }),
            t.ajax({
              url: l.url,
              type: l.method,
              data: r,
              contentType: !1,
              processData: !1,
              dataType: 'json',
              success: function (t) {
                i++, d(e, t), u()
              },
              error: function () {
                n++, o.msg('请求上传接口出现异常'), m(e), u()
              }
            })
        })
      }
      const c = function () {
        const e = t('#' + f)
        o.elemFile.parent().submit(),
          clearInterval(p.timer),
          (p.timer = setInterval(function () {
            let t
            const i = e.contents().find('body')
            try {
              t = i.text()
            } catch (n) {
              o.msg('获取上传后的响应信息出现异常'), clearInterval(p.timer), m()
            }
            t && (clearInterval(p.timer), i.html(''), d(0, t))
          }, 30))
      }
      var d = function (e, t) {
        if ((o.elemFile.next('.' + s).remove(), (r.value = ''), typeof t !== 'object')) {
          try {
            t = JSON.parse(t)
          } catch (i) {
            return (t = {}), o.msg('请对上传接口返回有效JSON')
          }
        }
        typeof l.done === 'function' &&
          l.done(t, e || 0, function (e) {
            o.upload(e)
          })
      }
      var m = function (e) {
        l.auto && (r.value = ''),
          typeof l.error === 'function' &&
            l.error(e || 0, function (e) {
              o.upload(e)
            })
      }
      const h = l.exts
      let v = (function () {
        const t = []
        return (
          layui.each(e || o.chooseFiles, function (e, i) {
            t.push(i.name)
          }),
          t
        )
      })()
      const g = {
        preview: function (e) {
          o.preview(e)
        },
        upload: function (e, t) {
          const i = {}
          ;(i[e] = t), o.upload(i)
        },
        pushFile: function () {
          return (
            (o.files = o.files || {}),
            layui.each(o.chooseFiles, function (e, t) {
              o.files[e] = t
            }),
            o.files
          )
        }
      }
      const y = function () {
        return i === 'choose'
          ? l.choose && l.choose(g)
          : (l.before && l.before(g), a.ie ? (a.ie > 9 ? u() : c()) : void u())
      }
      switch (((v = v.length === 0 ? r.value.match(/[^\/\\]+\..+/g) || [] || '' : v), l.accept)) {
        case 'file':
          if (h && !RegExp('\\w\\.(' + h + ')$', 'i').test(escape(v))) {
            return o.msg('选择的文件中包含不支持的格式'), (r.value = '')
          }
          break
        case 'video':
          if (
            !RegExp('\\w\\.(' + (h || 'avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(
              escape(v)
            )
          ) {
            return o.msg('选择的视频中包含不支持的格式'), (r.value = '')
          }
          break
        case 'audio':
          if (!RegExp('\\w\\.(' + (h || 'mp3|wav|mid') + ')$', 'i').test(escape(v))) {
            return o.msg('选择的音频中包含不支持的格式'), (r.value = '')
          }
          break
        default:
          if (
            (layui.each(v, function (e, t) {
              RegExp('\\w\\.(' + (h || 'jpg|png|gif|bmp|jpeg$') + ')', 'i').test(escape(t)) ||
                (n = !0)
            }),
            n)
          ) {
            return o.msg('选择的图片中包含不支持的格式'), (r.value = '')
          }
      }
      if (l.size > 0 && !(a.ie && a.ie < 10)) {
        let F
        if (l.number && o.fileLength > l.number) {
          return o.msg('同时最多只能上传 ' + o.fileLength + ' 个')
        }
        if (
          (layui.each(o.chooseFiles, function (e, t) {
            if (t.size > 1024 * l.size) {
              let i = l.size / 1024
              ;(i = i >= 1 ? Math.floor(i) + (i % 1 > 0 ? i.toFixed(1) : 0) + 'MB' : l.size + 'KB'),
                (r.value = ''),
                (F = i)
            }
          }),
          F)
        ) {
          return o.msg('文件不能超过' + F)
        }
      }
      y()
    }),
    (p.prototype.events = function () {
      const e = this
      const i = e.config
      const o = function (t) {
        ;(e.chooseFiles = {}),
          layui.each(t, function (t, i) {
            const n = new Date().getTime()
            e.chooseFiles[n + '-' + t] = i
          })
      }
      const l = function (t, n) {
        const a = e.elemFile
        const o =
          t.length > 1
            ? t.length + '个文件'
            : (t[0] || {}).name || a[0].value.match(/[^\/\\]+\..+/g) || [] || ''
        a.next().hasClass(s) && a.next().remove(),
          e.upload(null, 'choose'),
          e.isFile() || i.choose || a.after('<span class="layui-inline ' + s + '">' + o + '</span>')
      }
      i.elem.off('upload.start').on('upload.start', function () {
        const a = t(this)
        let o = a.attr('lay-data')
        if (o) {
          try {
            ;(o = new Function('return ' + o)()), (e.config = t.extend({}, i, o))
          } catch (l) {
            n.error('Upload element property lay-data configuration item has a syntax error: ' + o)
          }
        }
        ;(e.config.item = a), e.elemFile[0].click()
      }),
        (a.ie && a.ie < 10) ||
          i.elem
            .off('upload.over')
            .on('upload.over', function () {
              const e = t(this)
              e.attr('lay-over', '')
            })
            .off('upload.leave')
            .on('upload.leave', function () {
              const e = t(this)
              e.removeAttr('lay-over')
            })
            .off('upload.drop')
            .on('upload.drop', function (n, a) {
              const r = t(this)
              const u = a.originalEvent.dataTransfer.files || []
              r.removeAttr('lay-over'), o(u), i.auto ? e.upload(u) : l(u)
            }),
        e.elemFile.off('upload.change').on('upload.change', function () {
          const t = this.files || []
          ;(e.fileLength = t.length), o(t), i.auto ? e.upload() : l(t)
        }),
        i.bindAction.off('upload.action').on('upload.action', function () {
          e.upload()
        }),
        i.elem.data('haveEvents') ||
          (e.elemFile.on('change', function () {
            t(this).trigger('upload.change')
          }),
          i.elem.on('click', function () {
            e.isFile() || t(this).trigger('upload.start')
          }),
          i.drag &&
            i.elem
              .on('dragover', function (e) {
                e.preventDefault(), t(this).trigger('upload.over')
              })
              .on('dragleave', function (e) {
                t(this).trigger('upload.leave')
              })
              .on('drop', function (e) {
                e.preventDefault(), t(this).trigger('upload.drop', e)
              }),
          i.bindAction.on('click', function () {
            t(this).trigger('upload.action')
          }),
          i.elem.data('haveEvents', !0))
    }),
    (o.render = function (e) {
      const t = new p(e)
      return l.call(t)
    }),
    e(r, o)
})
