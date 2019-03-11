// pages/registration/registration.js
const app = getApp()
Page({
  data: {
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight
  },
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      title: options.name
    })
    this.setData({
      navColor: options.color
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000'
    })
  },
  back2list(){
    wx.navigateBack({
      
    })
  }
})