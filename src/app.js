//app.js
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })
  },
  globalData: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
    // cloudURL: 'http://47.102.219.51:8080/voteapp'
  }
})