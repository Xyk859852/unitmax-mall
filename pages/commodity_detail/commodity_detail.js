//commodity_detail.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图
    imgUrls: [
      '../../images/1.png',
      '../../images/2.png',
      '../../images/3.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    selected: true,
    selected1: false,
    selected2: false,
    evaluate_img_width: wx.getSystemInfoSync().windowWidth*0.292,
    commodity_detail_title_left_width: wx.getSystemInfoSync().windowWidth * 0.85-30
  },
  onLoad: function () {
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
