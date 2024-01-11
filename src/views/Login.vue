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
              <Form :validation-schema="schema" ref="formCom" v-slot="{ errors }">
                <div class="layui-form-item">
                  <label class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="checkEmail"
                      v-model.trim="form.email"
                      placeholder="请输入邮箱"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <div v-if="errors.checkEmail" style="color: #c00">{{ errors.checkEmail }}</div>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      v-model="form.password"
                      name="checkPassword"
                      lay-verify="required"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <div v-if="errors.checkPassword" style="color: #c00">
                      {{ errors.checkPassword }}
                    </div>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="checkCode"
                      v-model="form.code"
                      lay-verify="required"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <div v-if="errors.checkCode" style="color: #c00">{{ errors.checkCode }}</div>
                  </div>
                  <div>
                    <span class="svg" @click="() => _getCode(store.sid)" v-html="params.svg"></span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="submit">立即登录</button>
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
import { onMounted, reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { getCode, login } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
import { useSidStore } from '@/store'
import { checkEmail, checkPassword, checkCode } from '@/utils/veevalidate'

const schema = {
  checkEmail,
  checkPassword,
  checkCode
}

const params = reactive({
  svg: ''
})

const form = reactive({
  email: '',
  password: '',
  code: ''
})

const _getCode = async (sid) => {
  params.svg = await getCode(sid)
}

const store = useSidStore()
onMounted(() => {
  if (localStorage.getItem('sid')) {
    store.sid = JSON.parse(localStorage.getItem('sid')).sid
  } else {
    console.log('uuid: ', uuidv4())
    store.sid = uuidv4()
  }

  _getCode(store.sid)
})

const formCom = ref(null)

const submit = async () => {
  const valid = await formCom.value.validate()
  if (!valid.valid) return
  const res = await login({
    email: form.email,
    password: form.password,
    code: form.code,
    sid: store.sid
  })
  if (res.code === 200) {
    console.log(res)
  }
}
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
