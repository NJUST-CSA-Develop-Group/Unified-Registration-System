// pages/me/me.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';

Page({

  data: {
    is_logined: false,
    is_bind_schoolID: false,
    male: 1,
    schoolID: '123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.CheckLogin()
  },

  bindInputSchoolID(e){
    var id = e.detail.value
    this.setData({
      schoolID: id
    })
  },
  
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },

  async Login() {
    let res = await new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://cong-onion.cn/urs/api/client/login',
              data: {
                code: res.code
              },
              success (res) {
                wx.setStorage({
                  key: "openID",
                  data: res.openId
                })
                wx.setStorage({
                  key: "schoolID",
                  data: res.schoolId
                })
                resolve(res)
              },
              fail(){
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
    if (res) {
      if (res.schoolId !== null) {
        this.setData({
          is_bind_schoolID: true
        })
        this.setData({
          is_logined: false
        })
        // userinfo
      }
    }
  },

  async CheckLogin() {
    let res = await new Promise((resolve, reject) => {
      wx.checkSession({
        success: ({
          data
        }) => {
          resolve(data)
        }
      })
    })
    if (res) {
      this.setData({
        is_logined: false
      })
      // userinfo
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              }
            })
          }
        }
      })
    }
  },

  async SendSchoolID() {
    console.log(this.data.schoolID)
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/csp/scoolid',
        data:{
          schoolId: this.schoolID
        }
      })
    })
    if (res) {
      // 成功的逻辑
    }
  }
})