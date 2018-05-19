const app = getApp();
var header = getApp().globalData.header;
// pages/address_management/address_management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // address_width: wx.getSystemInfoSync().windowWidth * 0.80 - 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(header);
    wx.request({
      url: app.IP +'chatAddRess/getList',
      data: '',
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          list: res.data.list
        })
      },
      fail: function (res) {},
      complete: function(res) {},
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

  edit: function(e){
    console.log(e);
    var ADDRESSBOOK_ID = e.currentTarget.dataset.addressbook_id;
    var ADDRESS_DTEAIL = e.currentTarget.dataset.address_dteail;
    var TAKEPHONE = e.currentTarget.dataset.takephone;
    var CONSIGNEE = e.currentTarget.dataset.consignee;
    var MOBLE = e.currentTarget.dataset.moble;
    var ISDEFAULT = e.currentTarget.dataset.isdefault;
    wx.navigateTo({
      url: '../add_address/add_address?ADDRESSBOOK_ID=' + ADDRESSBOOK_ID
      + '&ADDRESS_DTEAIL=' + ADDRESS_DTEAIL + '&TAKEPHONE=' + TAKEPHONE 
      + '&CONSIGNEE=' + CONSIGNEE + '&TYPE=edit' + '&ISDEFAULT=' + ISDEFAULT,
    })
  }
})