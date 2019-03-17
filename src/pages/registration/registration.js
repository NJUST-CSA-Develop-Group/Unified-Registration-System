// pages/registration/registration.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
    id: "",
    regsList: [],
    paramC2P: {},
    check: true,
    submit: true
  },
  onLoad: function (options) {
    this.getRegistration(options.id)
    this.setData({
      id: options.id
    })
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
  async postRegistration(id) {
    let that = this
    this.setData({
      submit: false
    })
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.turing-cup.online/voteapp/activity/' + id,
        method: 'POST',
        data: this.data.paramC2P,
        success: ({ data }) => {
          resolve(data)
        },
        fail: reject
      })
    })
    if (res.success) {
      wx.showToast({
        title: '提交成功！',
      })
      setTimeout(function () {
        that.back2list()
      }, 1000)
      
    } else {
      wx.showToast({
        title: '请检查必填项或网络异常！',
        icon: 'none'
      })
      this.setData({
        submit: true
      })
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
    if (e.detail.paramC2P.value != Object && e.detail.paramC2P.value == '') {
      delete this.data.paramC2P[e.detail.paramC2P.name]
    }
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
  },
  regSubmit: function (e) {
    this.postRegistration(this.data.id)
  }
})