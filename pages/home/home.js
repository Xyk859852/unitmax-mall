//home.js
//获取应用实例
const app = getApp()
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
// import tempObj from '../bottom/bottom.js';
var tempObj = require("../../utils/bottom.js");
Page({
  data: {
    notice_popup: false,
    category: [
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
    marquee_margin: wx.getSystemInfoSync().windowWidth * 0.92 - 40,
    duration1: 30,
    size: 14,
    newsinterval: 300,
    swiper_height: wx.getSystemInfoSync().windowWidth*0.5,
    scrolltxt_box_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    category_img_width: wx.getSystemInfoSync().windowWidth * 0.92 * 0.158,
    category_commodity_img_width: wx.getSystemInfoSync().windowWidth * 0.29 * 0.96,
    swiper_width: (wx.getSystemInfoSync().windowWidth-1) * 0.92 - 40,
    swiper_container_width: wx.getSystemInfoSync().windowWidth * 0.84 - 80,
    category_commodity_container_width: wx.getSystemInfoSync().windowWidth * 0.28 - 2,
    news_navigator_view_width: wx.getSystemInfoSync().windowWidth * 0.08 +40
  },
  onLoad: function () {
    this.toast = this.selectComponent("#toast");
    var that = this;
    wx.showToast({
      title: "加载中...",
      icon: "loading"
    })   
    wx.request({
      url: getApp().IP + 'chatIndex/index',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        console.log(res.data.varClass);
        // success
        var goodlist = res.data.varClass;
        console.log(goodlist);
        for (var i = 0; i < goodlist.length; i++) {
          for (var j = 0; j < goodlist[i].goodList.length; j++) {
            goodlist[i].goodList[j].goods_price = util.changeTwoDecimal_f(goodlist[i].goodList[j].goods_price);
          }
        }
        that.setData({
          imgUrls: res.data.advertImgs,
          text: res.data.title,
          varClass: res.data.varClass,
          allType: res.data.allType,
          newlist: res.data.newlist,
          marqueeDistance: res.data.title.length * that.data.size
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
          that.toast.showView("加载失败");
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
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
      }, that.data.duration1);
    } else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  },
  goAdvertising: function (e) {
    console.log(e);
    var types = e.currentTarget.dataset.type;
    if (types == 1) {//超链接
      wx.navigateTo({
        url: '../advert_detail_url/advert_detail_url?url=' + e.currentTarget.dataset.url
      })
    } else {//富文本
      wx.navigateTo({
        url: "../advertising_detail/advertising_detail?ID=" + e.currentTarget.dataset.id
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showToast({ title: "加载中...", icon: "loading"})
    var that = this;
    wx.request({
      url: getApp().IP + 'chatIndex/index',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        console.log(res.data.advertImgs);
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
          that.toast.showView("加载失败");
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  touchMove: function () {
    wx.stopPullDownRefresh();
  },
  gohome: function (e) {
    tempObj.gohome(e);
  },
  gocommodity: function (e) {
    tempObj.gocommodity(e);
  },
  gocategory: function (e) {
    tempObj.gocategory(e);
  },
  goshoppingcart: function (e) {
    tempObj.goshoppingcart(e);
  },
  getUserInfo: function (e) {
    tempObj.getUserInfo(e)
  },
  goMinePage: function (e) {
    tempObj.goMinePage(e)
  },
  shownotice: function () {
    this.setData({
      notice_popup: true
    })
  },
  hidenotice: function () {
    this.setData({
      notice_popup: false
    })
  }

})
