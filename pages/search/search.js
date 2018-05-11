//search.js
//获取应用实例
const app = getApp()

Page({
  data: {
    search_box_left_width: wx.getSystemInfoSync().windowWidth * 0.84 - 32,
    search_width: (wx.getSystemInfoSync().windowWidth * 0.84 - 32)*0.96-20
  },
  onLoad: function () {
  }
})
