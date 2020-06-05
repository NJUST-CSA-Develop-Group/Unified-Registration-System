// pages/me/me.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';

Page({

  data: {
    is_logined: true,
    is_bind_schoolID: false,
    schoolID: 916106950117,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.CheckLogin()
    // this.GetUserInfo()
  },

  bindInputSchoolID(e){
    var id = e.detail.value
    this.setData({
      schoolID: id
    })
  },

  go2resign_history() {
    var activityID = 123
    var activityName = 'CSP免费报名资格申请'
    var color = 'bg-mauve'
    wx.navigateTo({
      url: '../resign_history/resign_history?id=' + activityID + '&name=' + activityName + '&color=' + color,
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
              url: 'https://cong-onion.cn/urs/api/student/login',
              method: 'POST',
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
    if (res.statusCode==200) {
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
    }
    else {
      wx.showModal({
        title: '登陆失败！',
        content: '请稍后重试或联系管理员解决'
      })
    }
  },

  async CheckLogin() {
    var session_id = wx.getStorageSync('session_id')
    console.log(session_id)
    var school_id = wx.getStorageSync('schoolID')
    console.log(school_id)
    if (session_id) {
      this.setData({
        is_logined: false
      })
      this.GetUserInfo()
    }
    if (school_id) {
      this.setData({
        is_bind_schoolID: true
      })
      this.setData({
        schoolID: school_id
      })
    }
  },

  async SendSchoolID() {
    wx.setStorageSync("schoolID",this.data.schoolID)
    console.log(wx.getStorageSync('session_id'))
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/student/schoolid',
        method: 'POST',
        header: {
          'cookie': wx.getStorageSync('session_id')
        },
        data:{
          schoolId: wx.getStorageSync('schoolID')
        },
        success:function (data) {
          resolve(data)
        }
      })
    })
    console.log(res)
    if (res.statusCode == 200) {
      console.log(res)
      this.setData({
        is_bind_schoolID: true
      })
    }
    else {
      wx.showModal({
        title: '绑定失败！',
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