// pages/registration/registration.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
const app = getApp()
Page({
  data: {
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
    id: "",
    regsList: [],
    paramC2P: [],
    check: true
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
  onSent: function (e) {
    this.data.paramC2P[e.detail.paramC2P.name] = e.detail.paramC2P.value
    this.setData({
      paramC2P: this.data.paramC2P
    })
    console.log(this.data.paramC2P)
  },
  onCheck: function (e) {
    this.setData({
      check: e.detail.check
    })
    this.triggerEvent('check', {
      check: this.data.check
    }
    );
    console.log(this.data.check)
  }
})