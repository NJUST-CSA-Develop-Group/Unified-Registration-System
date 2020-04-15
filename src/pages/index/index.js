//index.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';

//获取应用实例
const app = getApp()

Page({
  data: {
    colorList: {
      "院科协": "bg-gradual-green",
      "院学生会": "bg-gradual-blue",
      "院红会": "bg-gradual-red",
      "院团委": "bg-gradual-purple",
      "院新媒体": "bg-gradual-orange",
      "院青协": "bg-gradual-pink",
      "网安协会(社团)": "bg-gradual-brown",
      "计算机学院": "bg-mauve"
    },
    activityList: [],
    statusBarHeight: app.globalData.statusBarHeight,
    loader: true
  },
  onLoad() {
    this.getActivity();
    this.setData({
      loader: false
    })
    this.setData({
      resignList: [{
        id: 123,
        name: "CSP免费报名资格申请",
        publisher: "计算机学院",
        // remider: "请",
        startTime: "2019-06-13 00:00:00",
        // endTime: "2019-12-13 00:00:00"
      }]
    })
  },
  onPullDownRefresh() {
    this.getActivity();
  },
  entryCard(e) {
    var activityID = this.data.activityList[e.currentTarget.id].id
    var activityName = this.data.activityList[e.currentTarget.id].name
    var color = this.data.colorList[this.data.activityList[e.currentTarget.id].publisher]
    wx.navigateTo({
      url: '../registration/registration?id=' + activityID + '&name=' + activityName + '&color=' + color,
    })
  },
  entryResign(e) {
    var activityID = this.data.resignList[e.currentTarget.id].id
    var activityName = this.data.resignList[e.currentTarget.id].name
    var color = this.data.colorList[this.data.resignList[e.currentTarget.id].publisher]
    wx.navigateTo({
      url: '../resign/resign?id=' + activityID + '&name=' + activityName + '&color=' + color,
    })
  },
  async getActivity() {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cong-onion.cn/urs/api/activity',
        method: 'GET',
        success: ({
          data
        }) => {
          resolve(data)
        },
        // fail: reject
        fail() {
          reject
          wx.showToast({
            title: '网络异常，请刷新！',
            icon: 'none',
            duration: 2500
          })
        }
      })
    })
    if (res) {
      this.setData({
        activityList: res
      })
      this.setData({
        loader: false
      })
      console.log(res)
    }
  },
})