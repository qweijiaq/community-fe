<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'Login' }">登入</router-link>
          </li>
          <li class="layui-this">
            找回密码
            <!--重置密码-->
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form method="post">
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
                  <button type="button" class="layui-btn" alert="1" @click="submit">提交</button>
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
import { getCode, forget } from '@/api/login'

const params = reactive({
  svg: ''
})

const form = reactive({
  email: '',
  code: ''
})

const _getCode = async () => {
  params.svg = await getCode()
}

onMounted(() => {
  _getCode()
})

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

const submit = async () => {
  const res = await forget({
    email: form.email,
    code: form.code
  })
  if (res.code === 200) {
    alert('邮件发送成功')
  }
}
</script>

<style lang="scss" scoped></style>
