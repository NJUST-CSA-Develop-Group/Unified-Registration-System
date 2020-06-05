// pages/resign_history/resign_history.js
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
    title: "CSP免费资格申请记录",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
    loader: true,
    card_color: {
      'STATUS_UNCHECK': '',
      'STATUS_PERMIT': 'bg-green',
      'STATUS_REJECT': 'bg-red'
    },
    cu_item_color: {
      'STATUS_UNCHECK': '',
      'STATUS_PERMIT': 'bg-green',
      'STATUS_REJECT': 'bg-red'
    },
    result_trans: {
      'STATUS_UNCHECK': '等待审核',
      'STATUS_PERMIT': '审核通过',
      'STATUS_REJECT': '审核不通过'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navColor: options.color
    })
  },

  onShow: function () {
    this.setData({
      loader: true
    })
    this.getResignHistory()
  },

  async getResignHistory() {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/csp/free/audit',
        method: 'GET',
        header: {
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
        resign_history: res.data.data.reverse()
      })
      this.setData({
        loader: false
      })
    }
  },

})