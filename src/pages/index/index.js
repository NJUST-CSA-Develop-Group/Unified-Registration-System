//index.js
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';

//获取应用实例
const app = getApp()

Page({
  data: {
    colorList: ["bg-gradual-green", "bg-gradual-blue", "bg-gradual-red", "bg-gradual-purple", "bg-gradual-orange", "bg-gradual-pink"],
    activityList: [],
    statusBarHeight: app.globalData.statusBarHeight
  },
  onLoad(){
    this.getActivity();
  },
  entryCard(e){
    var activityID = this.data.activityList[e.currentTarget.id].id
    var activityName = this.data.activityList[e.currentTarget.id].name
    var color = this.data.colorList[e.currentTarget.id]
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
    } else {
      console.log("没有成功")
    }
  },
})
