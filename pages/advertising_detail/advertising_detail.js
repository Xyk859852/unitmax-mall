var WxParse = require('../wxParse/wxParse.js');
var header = getApp().globalData.header;
const app = getApp();
// pages/advertising_detail/advertising_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: getApp().IP + 'chatIndex/advertDetail',
      data: { ID: e.ID },
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        console.log(res.data.advert.AD_TEXT);
        console.log(res.data.advert.AD_TITLE);
        WxParse.wxParse('text', 'html', res.data.advert.AD_TEXT, that, 5);
        WxParse.wxParse('title', 'html', res.data.advert.AD_TITLE, that, 5);
        that.setData({
          time: res.data.advert.ADDTIME
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
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
  
  }
})