//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    colorList: ["bg-gradual-green", "bg-gradual-blue", "bg-gradual-red", "bg-gradual-purple", "bg-gradual-orange", "bg-gradual-pink"],
    activityList: [{
        id: "1234",
        name: "“展风华·为人先”软件开发比赛",
        publisher: "院科协",
        startTime: "2019-03-18 00:00:00",
        endTime: "2019-03-31 00:00:00"
      },{
        id: "2234",
        name: "“中兴·图灵杯”人工智能程序设计大赛啊哈哈哈哈哈哈哈哈",
        publisher: "院科协",
        startTime: "2019-10-18 00:00:00",
        endTime: "2019-11-18 00:00:00"
      }, {
        id: "3234",
        name: "“中兴·图灵杯”人工智能程序设计大赛啊哈哈哈哈哈哈哈哈",
        publisher: "院科协",
        startTime: "2019-10-18 00:00:00",
        endTime: "2019-11-18 00:00:00"
      }, {
        id: "4234",
        name: "“中兴·图灵杯”人工智能程序设计大赛啊哈哈哈哈哈哈哈哈",
        publisher: "院科协",
        startTime: "2019-10-18 00:00:00",
        endTime: "2019-11-18 00:00:00"
      }, {
        id: "5234",
        name: "“中兴·图灵杯”人工智能程序设计大赛啊哈哈哈哈哈哈哈哈",
        publisher: "院科协",
        startTime: "2019-10-18 00:00:00",
        endTime: "2019-11-18 00:00:00"
      }, {
        id: "6234",
        name: "“中兴·图灵杯”人工智能程序设计大赛啊哈哈哈哈哈哈哈哈",
        publisher: "院科协",
        startTime: "2019-10-18 00:00:00",
        endTime: "2019-11-18 00:00:00"
      }],
    statusBarHeight: app.globalData.statusBarHeight
  },
  onLoad(){
  },
  entryCard(e){
    var activityID = this.data.activityList[e.currentTarget.id].id
    var activityName = this.data.activityList[e.currentTarget.id].name
    var color = this.data.colorList[e.currentTarget.id]
    wx.navigateTo({
      url: '../registration/registration?id=' + activityID + '&name=' + activityName + '&color=' + color,
    })
  }
})
