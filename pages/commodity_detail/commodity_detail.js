//commodity_detail.js
//获取应用实例
const app = getApp()
var header = getApp().globalData.header;
Page({
  data: {
    //轮播图
    imgUrls: [
      '../../images/1.png',
      '../../images/2.png',
      '../../images/3.png'
    ],
    appIP: app.IP,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    selected: true,
    selected1: false,
    selected2: false,
    evaluate_img_width: wx.getSystemInfoSync().windowWidth*0.292,
    commodity_detail_title_left_width: wx.getSystemInfoSync().windowWidth * 0.85-30,
    evaluate_right_width: wx.getSystemInfoSync().windowWidth*0.88-30
  },
  onLoad: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: getApp().IP + 'chatGoods/goodDetail',
      data: {GOODS_ID:e.goods_id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data.good);
        that.setData({
          good: res.data.good
        })
      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "加载失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    });
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
