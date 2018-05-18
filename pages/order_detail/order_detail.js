// pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    other_input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    address_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    contact_view_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    mobile:"18361296775"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  callmobile:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  }
})