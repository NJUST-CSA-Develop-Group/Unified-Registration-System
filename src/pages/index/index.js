//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    skip: false
  },
  change(){
    if (this.data.skip) {
      this.setData({
        skip: false
      })
    }
    else {
      this.setData({
        skip: true
      })
    }
  }  
})
