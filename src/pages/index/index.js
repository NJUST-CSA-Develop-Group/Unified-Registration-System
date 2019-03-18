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
      "院青协": "bg-gradual-pink"},
    activityList: [],
    statusBarHeight: app.globalData.statusBarHeight,
    loader: true
  },
  onLoad(){
    this.getActivity();
  },
  entryCard(e){
    var activityID = this.data.activityList[e.currentTarget.id].id
    var activityName = this.data.activityList[e.currentTarget.id].name
    var color = this.data.colorList[this.data.activityList[e.currentTarget.id].publisher]
    wx.navigateTo({
      url: '../registration/registration?id=' + activityID + '&name=' + activityName + '&color=' + color,
    })
  },
  async getActivity() {
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.turing-cup.online/voteapp/activity',
        method: 'GET',
        success: ({ data }) => {
          resolve(data)
        },
        fail: reject
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
    } else {
      this.setData({
        loader: false
      })
      wx.showToast({
        title: '网络异常，请刷新！',
        icon: 'none'
      })
      console.log("没有成功")
    }
  },
})
