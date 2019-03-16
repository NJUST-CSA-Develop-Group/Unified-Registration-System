// pages/registration/registration.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
const app = getApp()
Page({
  data: {
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
    id: "",
    regsList: []
  },
  onLoad: function (options) {
    this.getRegistration(options.id)
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
  async getRegistration(id) {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.turing-cup.online/voteapp/activity/'+id,
        method: 'GET',
        success: ({ data }) => {
          resolve(data)
        },
        fail: reject
      })
    })
    if (res) {
      this.setData({
        regsList: res
      })
      console.log(this.data.regsList)
    } else {
      console.log("没有成功")
      // 未获取成功
    }
  },
  back2list(){
    wx.navigateBack({
      
    })
  },
  tapItem: function (e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
  },
})