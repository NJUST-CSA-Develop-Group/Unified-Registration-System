// pages/registration/registration.js
const app = getApp()
Page({
  data: {
    title: "返回",
    navColor: "",
    statusBarHeight: app.globalData.statusBarHeight,
    id: "",
    treeData: {
      text: 'My Tree',
      id: 0,
      nodes: [
        {
          text: 'Parent 1',
          id: 1,
          nodes: [
            {
              text: 'Child 1',
              id: 2,
              nodes: [
                {
                  text: 'Grandchild 1',
                  id: 3,
                },
                {
                  text: 'Grandchild 2',
                  id: 4,
                },
              ]
            },
            {
              text: 'Child 2',
              id: 5,
            }
          ]
        },
        {
          text: 'Parent 2',
          id: 6,
          nodes: [
            {
              text: 'Child 1',
              id: 7,
            },
            {
              text: 'Child 2',
              id: 8,
            }
          ]
        }
      ]
    }
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