// pages/logistics_tracking/logistics_tracking.js
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tracking_right: wx.getSystemInfoSync().windowWidth * 0.08
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ ORDERFORM_ID: options.ORDERFORM_ID});
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
    var that = this;
    wx.request({
      url: getApp().IP + 'chatOrder/orderDetail?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
      data: {},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.result == "true") {
          that.setData({
            order: res.data.order,
            service_phone: res.data.service_phone
          });
        }

        if (res.data.result == "1002"){
          wx.navigateTo({
            url: '../binding_phone/binding_phone?updatePhone=true',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  
  }
})