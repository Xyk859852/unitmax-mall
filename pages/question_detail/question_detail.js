// pages/question_detail/question_detail.js
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
var WxParse = require('../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service_phone:"18361296775"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //选择组件对象
    this.toast = this.selectComponent("#toast");
    var that = this;
   var data = { QUESTIONANSWER_ID: options.QUESTIONANSWER_ID};
    wx.request({
      url: app.IP + 'chatConfig/questionanswer_detail',
      data: data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        if (res.data.result == "true") {
          WxParse.wxParse('text', 'html', res.data.questionanswer.ANSWER, that, 5);
          that.setData({ questionanswer: res.data.questionanswer});
        } else {
          that.toast.showView(res.data.result);
        }

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  callmobile: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.service_phone
    })
  }
})