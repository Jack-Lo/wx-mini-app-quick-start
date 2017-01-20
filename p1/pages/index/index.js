var app = getApp()

Page({
  data: {
    motto: 'wx-mini-app is the best dev-tool.',
    userInfo: {}
  },
  //事件处理函数
  goToLog () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {
    var _t = this

    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      // 更新数据
      _t.setData({
        userInfo: userInfo
      })
    })

    console.log('index loaded')
  }
})
