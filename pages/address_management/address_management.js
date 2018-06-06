const app = getApp();
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
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
    if (util.isAvalible(options) && util.isAvalible(options.page_from)){
     this.setData({
       page_from: options.page_from
     });
   }
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
    console.log(header);
    wx.request({
      url: app.IP + 'chatAddRess/getList',
      data: '',
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.result == "1002") {
          wx.navigateTo({
            url: '../binding_phone/binding_phone?updatePhone=true',
          })
        } else if (res.data.result == "true"){
        that.setData({
          list: res.data.list
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
      + '&CONSIGNEE=' + CONSIGNEE + '&TYPE=edit' + '&MOBLE=' + MOBLE 
      + '&ISDEFAULT=' + ISDEFAULT,
    })
  },

  deleate : function(e){
    var that = this;
    var ADDRESSBOOK_ID = e.currentTarget.dataset.addressbook_id;
    wx.showModal({
      title: '提示',
      content: '确定要删除？',
      success: function (sm) {
        if (sm.confirm) {
        wx.request({
          url: app.IP + 'chatAddRess/deleate',
          data: { ADDRESSBOOK_ID: ADDRESSBOOK_ID },
          header: header,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            if (res.data.result == "true") {
              wx.request({
                url: app.IP + 'chatAddRess/getList',
                data: '',
                header: header,
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                  that.setData({
                    list: res.data.list
                  })
                },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      }
    })
  },
  selectAddress: function(e){
    if (util.isAvalible(this.data.page_from)){
      var ADDRESSBOOK_ID = e.currentTarget.dataset.addressbook_id;
      var CONSIGNEE = e.currentTarget.dataset.consignee;
      var TAKEPHONE = e.currentTarget.dataset.takephone;
      var PROVINCE = e.currentTarget.dataset.province;
      var CITY = e.currentTarget.dataset.city;
      var DISTRICT = e.currentTarget.dataset.district;
      var ADDRESS_DTEAIL = e.currentTarget.dataset.address_dteail;
     var pages = getCurrentPages();
     var prevPage = pages[pages.length - 2]  //上一个页面
     var defaultAddress = {
       ADDRESSBOOK_ID: ADDRESSBOOK_ID,
       CONSIGNEE: CONSIGNEE,
       TAKEPHONE: TAKEPHONE,
       PROVINCE: PROVINCE,
       CITY: CITY,
       DISTRICT: DISTRICT,
       ADDRESS_DTEAIL: ADDRESS_DTEAIL
     }
     prevPage.setData(
       {
         defaultAddress: defaultAddress
       }
     )
     wx.navigateBack({
       delta: -1
     });
   }
  },
  dressdeful:function(e){
    console.log(e.target.id);
    var that = this;
    wx.request({
      url: app.IP +'chatAddRess/editDeful',
      data: { ADDRESSBOOK_ID: e.target.id},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if(res.data.result=="true"){
          that.setData({
            list:res.data.list
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})