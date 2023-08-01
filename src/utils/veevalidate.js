export const checkEmail = (value) => {
  if (!value || !value.trim().length) {
    return '邮箱不能为空'
  }
  if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
    return '请输入一个合法的邮箱'
  }
  return true
}

export const checkNickname = (value) => {
  if (!value || !value.trim().length) {
    return '昵称不能为空'
  }
  return true
}

export const checkPassword = (value) => {
  if (!value || !value.trim().length) {
    return '密码不能为空'
  }
  if (value.trim().length < 6) {
    return '密码长度必须至少6个字符'
  }
  return true
}

export const checkRePassword = (value) => {
  if (!value || !value.trim().length) {
    return '密码不能为空'
  }
  return true
}

export const checkCode = (value) => {
  if (!value || !value.trim().length) {
    return '验证码不能为空'
  }
  return true
}
