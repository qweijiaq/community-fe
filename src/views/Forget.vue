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
import { onMounted, reactive, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { getCode, forget } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
import { useSidStore } from '@/store'

import { checkEmail, checkCode } from '@/utils/veevalidate'

const schema = {
  checkEmail,
  checkCode
}

const params = reactive({
  svg: ''
})

const form = reactive({
  email: '',
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
