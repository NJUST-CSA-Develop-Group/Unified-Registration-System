// pages/resign/resign.js
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
    submit: true,
    loader: true,
    resign_status: false
  },
  onLoad: function (options) {
    // this.setData({
    //   loader: false
    // })
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
  onShow: function () {
    this.getResignStatus()
    this.getResignFree()
  },
  async getResignStatus() {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/csp/audit/status',
        method: 'GET',
        success: ({ data }) => {
          resolve(data)
        },
        fail() {
          reject
          wx.showModal({
            title: '获取失败！',
            content: '请检查网络或稍后重试'
          })
        }
      })
    })
    if (res) {
      this.setData({
        loader: false
      })
      if (res.status == "STATUS_CLOSE") {
        this.setData({
          resign_status: false
        })
      }
      else {
        this.setData({
          resign_status: true
        })
        this.getResignHistory()
      }
      console.log(this.data.resign_status)
      console.log(wx.getStorageSync('session_id'))
    }
  },
  async getResignHistory() {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/csp/free/audit',
        method: 'GET',
        header:{
          'cookie': wx.getStorageSync('session_id')
        },
        success: (res) => {
          resolve(res)
        },
        fail() {
          reject
          wx.showModal({
            title: '获取申请记录失败！',
            content: '请检查网络或稍后重试'
          })
        }
      })
    })
    if (res.statusCode == 401) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    if (res.data) {
      console.log(res)
      this.setData({
        resign_history: res.data.data
      })
    }
  },
  async doResign() {
    let that = this
    this.setData({
      submit: false
    })
    if (this.data.check) {
      console.log(wx.getStorageSync('session_id'))
      let res = await new Promise((resolve, reject) => {
        var _this = this
        wx.request({
          url: 'https://cong-onion.cn/urs/api/csp/free/audit',
          method: 'POST',
          header: {
            'cookie': wx.getStorageSync('session_id')
          },
          data: {reason: this.data.reason},
          success: (res) => {
            resolve(res)
          },
          fail() {
            reject
            wx.showToast({
              title: '网络异常，提交失败请重试！',
              icon: 'none',
              duration: 2500
            })
            _this.setData({
              submit: true
            })
          }
        })
      })
      if (res.statusCode == 200) {
        wx.showToast({
          title: '提交成功！',
        })
        setTimeout(function () {
          wx.navigateBack()
          var activityID = 123
          var activityName = 'CSP免费报名资格申请'
          var color = 'bg-mauve'
          wx.navigateTo({
            url: '../resign_history/resign_history?id=' + activityID + '&name=' + activityName + '&color=' + color,
          })
        }, 1000)
      } else {
        console.log(res)
        wx.showToast({
          title: '请检查必填项或网络异常！',
          icon: 'none'
        })
        this.setData({
          submit: true
        })
      }
    } else {
      wx.showToast({
        title: '部分项格式不正确！',
        icon: 'none'
      })
      this.setData({
        submit: true
      })
    }
  },
  _inputChange: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  async getResignFree() {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/csp/free',
        method: 'GET',
        header: {
          'cookie': wx.getStorageSync('session_id')
        },
        success: ({ data }) => {
          resolve(data)
        },
        fail() {
          reject
          wx.showModal({
            title: '获取失败！',
            content: '请检查网络或稍后重试'
          })
        }
      })
    })
    if (res) {
      this.setData({
        loader: false
      })
      this.setData({
        resign_free_count: res.freeCount
      })
      this.setData({
        resign_free_reason: res.freeReason
      })
    }
  },
})