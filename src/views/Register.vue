<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'Login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
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
                  <div class="layui-form-mid" style="color: #9b9898">将成为您的唯一登入名</div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="nickname"
                      v-model.trim="form.nickname"
                      rules="checkNickname"
                      placeholder="请输入昵称"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <ErrorMessage name="nickname" style="color: #c00" />
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
                  <div class="layui-form-mid" style="color: #9b9898">密码至少为6个字符</div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      name="repassword"
                      v-model="form.repassword"
                      rules="checkRePassword"
                      lay-verify="required"
                      placeholder="请确认密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <ErrorMessage name="repassword" style="color: #c00" />
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
                  <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
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
import { Form, Field, ErrorMessage } from 'vee-validate'
import { getCode } from '@/api/login'

const params = reactive({
  svg: ''
})

const form = reactive({
  email: '',
  nickname: '',
  password: '',
  repassword: '',
  code: ''
})

const _getCode = async () => {
  params.svg = await getCode()
}

onMounted(() => {
  _getCode()
})
</script>

<style lang="scss" scoped></style>
