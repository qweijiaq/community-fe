import axios from 'axios'

/*
 * 获取验证码图片
 */
const getCode = async () => {
  let result = ''
  try {
    result = await axios.get('/getCaptcha')
    if (result.status === 200) {
      const obj = result.data
      if (obj.code === 200) {
        return obj.data
      }
    }
  } catch (e) {
    console.log(e)
  }
  return result
}

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

export { getCode, forget }
