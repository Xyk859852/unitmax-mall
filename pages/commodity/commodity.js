//commodity.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 100
  },
  onLoad: function () {
  },
  select: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: false
    })
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  }
})
