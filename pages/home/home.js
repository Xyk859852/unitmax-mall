//home.js
//获取应用实例
const app = getApp()
var header = getApp().globalData.header;
Page({
  data: {
    category:[
      '../../images/category.png'
    ],
    appIP: app.IP,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    text: "",
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 30,
    size: 14,
    scrolltxt_box_width: wx.getSystemInfoSync().windowWidth * 0.92 - 40,
    category_img_width: wx.getSystemInfoSync().windowWidth * 0.92*0.158,
    category_commodity_img_width: wx.getSystemInfoSync().windowWidth * 0.29*0.96,
    swiper_width: wx.getSystemInfoSync().windowWidth * 0.92 - 40,
    swiper_container_width: wx.getSystemInfoSync().windowWidth * 0.88 - 100,
    category_commodity_container_width: wx.getSystemInfoSync().windowWidth * 0.28 - 2
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: getApp().IP + 'chatIndex/index',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          imgUrls: res.data.advertImgs,
          text: res.data.title,
          varClass: res.data.varClass,
          newlist: res.data.newlist,
          goodlist: res.data.goodlist
        })
        var length = that.data.text.length * that.data.size;//文字长度
        var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
        that.setData({
          length: length,
          windowWidth: windowWidth
        });
        that.scrolltxt();// 第一个字消失后立即从右边出现
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
    })
    wx.request({
      url: getApp().IP+'chatUser/openIdLogin',
      data: { OPENID: wx.getStorageSync("openid") },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (res.data.result == "true") {
          wx.setStorageSync("user", res.data.user);
          getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, 30);
    } else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  }

})
