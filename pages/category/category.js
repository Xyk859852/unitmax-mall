//category.js
//获取应用实例  
var app = getApp();
var header = getApp().globalData.header;
var tempObj = require("../../utils/bottom.js");
Page({
  data: {
    appIP: app.IP,
    category_img_width: ((wx.getSystemInfoSync().windowWidth-1)/3-1) * 0.7,
    category_width: (wx.getSystemInfoSync().windowWidth-1) /3 -1,
    svLeftHeight: '100',
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    tabdefault: 1
  },

  getchildren: function (e) {
    if (this.data.tabdefault == 1) {
      this.setData({
        tabdefault: 0
      })
    }
    var dataId = e.target.dataset.id;//获取到了点击的是哪个分类
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj//将此分类ID传递给data进行渲染wxml
    })
  },
  onLoad: function () {
    this.toast = this.selectComponent("#toast");
  },
  onShow: function () {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    // 页面显示
    var that = this;
    wx.request({
      url: this.data.appIP + 'chatGoods/findAllGoodsType',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          goodsTypeList: res.data.goodsTypeList,
          allType: res.data.allType
        })
      },
      fail: function () {
        // fail
        setTimeout(function () {
          that.toast.showView("加载失败");
        }, 100)
      },
      complete: function () {
        // complete
       // wx.hideToast();
      }
    })
  },
  gohome: function (e) {
    tempObj.gohome(e);
  },
  gocategory: function (e) {
    tempObj.gocategory(e);
  },
  gocommodity: function (e) {
    tempObj.gocommodity(e);
  },
  goshoppingcart: function (e) {
    tempObj.goshoppingcart(e);
  },
  getUserInfo: function (e) {
    tempObj.getUserInfo(e)
  }
})  