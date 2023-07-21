<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'Register' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form>
                <div class="layui-form-item">
                  <label class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="email"
                      v-model.trim="form.email"
                      rules="checkEmail"
                      placeholder="请输入邮箱"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <ErrorMessage name="email" style="color: #c00" />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      name="password"
                      v-model="form.password"
                      rules="checkPassword"
                      lay-verify="required"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <ErrorMessage name="password" style="color: #c00" />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="code"
                      v-model="form.code"
                      lay-verify="required"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div>
                    <span class="svg" @click="_getCode" v-html="params.svg"></span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn">立即登录</button>
                  <span style="padding-left: 20px">
                    <router-link :to="{ name: 'Forget' }">忘记密码？</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { defineRule, Form, Field, ErrorMessage } from 'vee-validate'
import { getCode } from '@/api/login'

const params = reactive({
  svg: ''
})

const form = reactive({
  email: '',
  password: '',
  code: ''
})

const _getCode = async () => {
  params.svg = await getCode()
}

onMounted(() => {
  _getCode()
})

/*
 * 登录验证
 */

// 自定义校验规则
defineRule('checkEmail', (value) => {
  if (!value || !value.trim().length) {
    return '邮箱不能为空'
  }
  if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
    return '请输入一个合法的邮箱'
  }
  return true
})

defineRule('checkPassword', (value) => {
  if (!value || !value.trim().length) {
    return '密码不能为空'
  }
  if (value.trim().length < 6) {
    return '密码长度必须至少6个字符'
  }
  return true
})

// const checkForm = () => {
//   params.errMsg = []
//   if (!params.username) {
//     params.errMsg.push('请输入用户名')
//   }
//   if (!params.password.trim()) {
//     params.errMsg.push('请输入密码')
//   }
//   if (!params.code.trim()) {
//     params.errMsg.push('请输入验证码')
//   }
// }
</script>

<style lang="scss" scoped>
.layui-container {
  background-color: #fff;
}

input {
  width: 190px;
}

.pwd-link {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}
</style>
