// pages/registration/registration.js
const app = getApp()
Page({
  data: {
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
    id: "",
    regsList: [
      {
        name: "队名",
        type: "text",
        defaultValue: "请输入队名",
        description: "仅允许输入中文，不超过5个字",
        tip: "仅支持中文，不超过5个字",
        require: true,
        range: [1, 5]
      },
      {
        name: "组员一信息",
        type: "group",
        description: "组员一的个人信息",
        tip: "请输入组员信息",
        require: true,
        subItem: [
          {
            name: "姓名",
            type: "text",
            description: "仅支持中文，不超过5个字",
            tip: "仅支持中文，不超过5个字",
            require: true,
            range: [1, 5]
          },
          {
            name: "性别",
            type: "sex",
            defaultValue: "男",
            description: "请选择你的性别",
            tip: "请输入性别",
            require: true,
          },
          {
            name: "出生日期",
            type: "date",
            defaultValue: "1999-01-01",
            description: "请选择你的出生年月",
            tip: "请选择你的出生年月",
            require: true,
          },
          {
            name: "目标岗位",
            type: "checkbox",
            description: "*请至少选择一组，最多2组",
            tip: "岗位",
            require: false,
            case: ["宣传部", "技术部", "美工部"],
            range: [1, 2]
          },
          {
            name: "任职设想",
            type: "txtarea",
            description: "描述你对职业的设想",
            tip: "请在这里写下职业设想...",
            require: false,
            range: [1, 5]
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    this.setData({
      title: options.id
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
  back2list(){
    wx.navigateBack({
      
    })
  },
  tapItem: function (e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
  },
})