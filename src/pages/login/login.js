// pages/login/login.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async Login() {
    let res = await new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://cong-onion.cn/urs/api/student/login',
              method: 'POST',
              data: {
                code: res.code
              },
              success(res) {
                wx.setStorageSync({
                  key: "openID",
                  data: res.openId
                })
                wx.setStorageSync({
                  key: "schoolID",
                  data: res.schoolId
                })
                resolve(res)
              },
              fail() {
                wx.showModal({
                  title: '登陆失败！',
                  content: '请稍后重试或联系管理员解决'
                })
              }
            })
          } else {
            wx.showModal({
              title: '登陆失败！',
              content: '请稍后重试或联系管理员解决'
            })
          }
        }
      })
    })
    if (res.statusCode == 200) {
      console.log(res)
      if (res.data.schoolId && res.data.schoolId != '') {
        this.setData({
          is_bind_schoolID: true
        })
        this.setData({
          schoolID: res.data.schoolId
        })
      }
      this.setData({
        is_logined: false
      })
      wx.setStorageSync('session_id', res.header['Set-Cookie'])
      this.GetUserInfo()
      wx.navigateBack()
    }
    else {
      wx.showModal({
        title: '登陆失败！',
        content: '请稍后重试或联系管理员解决'
      })
    }
  },

  async GetUserInfo() {
    let res = await new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          console.log('getsetting success')
          if (res.authSetting['scope.userInfo']) {
            console.log('getsetting success in if')
            wx.getUserInfo({
              success: function (res) {
                console.log('getuinfo-success')
                wx.setStorageSync('userInfo', res.userInfo)
                resolve(res)
              },
              fail: (res) => {
                console.log('getuinfo-fail')
                reject
              }
            })
          }
        }
      })
    })
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
      wx.setStorageSync('userInfo', e.detail.userInfo)
    } else {
      wx.showModal({
        title: '用户信息获取失败！',
        content: '请清除小程序缓存后重试'
      })
    }
  }

})