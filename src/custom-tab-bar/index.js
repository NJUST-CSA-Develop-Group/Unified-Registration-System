// custom-tab-bar/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [
    {
      pagePath: "/pages/index/index",
      iconPath: "../images/icon/list (2).png",
      selectedIconPath: "../images/icon/list (1).png",
      text: "活动列表"
    },
    {
      pagePath: "/pages/me/me",
      iconPath: "../images/icon/user (1).png",
      selectedIconPath: "../images/icon/user (2).png",
      text: "个人"
    }
    ]
  },
  ready:function (e){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var route = currentPage.route
    if (route === 'pages/index/index') {
      this.setData({
        selected: 0
      })
    }
    if (route === 'pages/me/me') {
      this.setData({
        selected: 1
      })
    }
  },
  methods: {
    switchTab(e) {
      var index = e.currentTarget.dataset.index * 1
      this.setData({
        selected: index === 0 ? 1 : 0
      })
      const url = e.currentTarget.dataset.path
      wx.switchTab({
        url
      })
    }
  },
})