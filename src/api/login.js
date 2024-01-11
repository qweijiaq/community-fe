import axios from '@/utils/request'

/*
 * 获取验证码图片
 * @param {*} sid 唯一标识
 */
const getCode = async (sid) => {
  const res = await axios.get('/public/getCaptcha', {
    params: {
      sid
    }
  })
  return res.data
}

/*
 * 找回密码
 * @param {} option 用户信息（邮箱、验证码）
 */
const forget = async (option) => {
  let result = ''
  try {
    result = await axios.post('/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}

/*
 * 登录
 * @param {*} loginInfo 用户登录信息（邮箱、密码、验证码）
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

export { getCode, forget, login }
