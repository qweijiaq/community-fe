import { defineStore } from 'pinia'

export const useSidStore = defineStore('sid', {
  state: () => ({ sid: '' }),
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    setSid: (value) => {
      this.sid = value
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})
