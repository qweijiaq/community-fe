<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { defineRule, Form, Field, ErrorMessage } from 'vee-validate'

const params = reactive({
  svg: '',
  email: '',
  errMsg: []
})

const form = reactive({
  username: '',
  password: '',
  code: ''
})

/*
 * 获取验证码图片
 */
const getCaptcha = () => {
  axios.get('http://localhost:3333/getCaptcha').then((res) => {
    if (res.status === 200) {
      const obj = res.data
      if (obj.code === 200) {
        params.svg = obj.data
      }
    }
  })
}
onMounted(() => {
  getCaptcha()
})

/*
 * 登录验证
 */

// 自定义校验规则
defineRule('checkUsername', (value) => {
  if (!value || !value.trim().length) {
    return '用户名不能为空'
  }
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
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

const checkForm = () => {
  params.errMsg = []
  if (!params.username) {
    params.errMsg.push('请输入用户名')
  }
  if (!params.password.trim()) {
    params.errMsg.push('请输入密码')
  }
  if (!params.code.trim()) {
    params.errMsg.push('请输入验证码')
  }
}
</script>

<template>
  <div id="app">
    <div class="layui-container">
      <div class="layui-form layui-form-pane">
        <Form>
          <div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-inline">
              <Field
                type="text"
                name="username"
                v-model.trim="form.username"
                rules="checkUsername"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid">
              <ErrorMessage name="username" style="color: #c00" />
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
            <div class="layui-form-mid svg" @click="getCaptcha" v-html="params.svg"></div>
          </div>
          <button type="button" class="layui-btn" @click="checkForm">登录</button>
          <a href="#" class="pwd-link">忘记密码?</a>
        </Form>
      </div>
    </div>
  </div>
</template>

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

.svg {
  position: relative;
  top: -15px;
}
</style>
