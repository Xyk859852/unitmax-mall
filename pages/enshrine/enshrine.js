// pages/enshrine/enshrine.js
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
//commodity.js
//获取应用实例
const app = getApp()
var url = app.IP + "chatSupplier/favoriteList";
var page = 1;
var GetList = function (that) {
  wx.showToast({
    title: "Loading...",
    icon: "loading",
    duration: 2000
  })
  //wx.showNavigationBarLoading();
  wx.request({
    url: url,
    header: header,
    data: {
      pageSize: 10,
      pageNo: page
    },
    success: function (res) {
      console.log(res.data);
      var l = that.data.list
      for (var i = 0; i < res.data.varList.length; i++) {
        l.push(res.data.varList[i])
      }
      that.setData({
        list: l
      });
      page++;
      console.log(l.length);
    },
    fail: function () {
      // fail
      setTimeout(function () {
        that.toast.showView("加载失败");
      }, 100)
    },
    complete: function () {
      // complete
      //wx.hideToast();
    }
  });
  wx.hideNavigationBarLoading();
} 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    IP:app.IP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toast = this.selectComponent("#toast");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    page = 1;
    that.setData({
      list: [],
      scrollTop: 0
    });
    GetList(that);
    //wx.hideToast();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("上拉刷新");
    // 显示顶部刷新图标
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })     
    //wx.showNavigationBarLoading();
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉");
    var that = this;
    GetList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})