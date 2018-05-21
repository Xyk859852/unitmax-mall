// pages/add_address/add_address.js
var type ="";
const app = getApp();
var header = getApp().globalData.header;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    type = options.TYPE;
    if(type == "edit"){
      this.setData({
        CONSIGNEE: options.CONSIGNEE,
        TAKEPHONE: options.TAKEPHONE,
        address: options.MOBLE,
        ADDRESS_DTEAIL: options.ADDRESS_DTEAIL,
        ADDRESSBOOK_ID: options.ADDRESSBOOK_ID,
        ISDEFAULT: options.ISDEFAULT
      })
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

  formBindsubmit: function(e){
      console.log(e.detail.value);
      var phone = e.detail.TAKEPHONE;
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
        return false;
        if (phone.length >= 11) {
          wx.showToast({
            title: '手机号有误',
            icon: 'success',
            duration: 2000
          })
          return false;
        }
      }
      if(type=="save"){
        wx.request({
          url: app.IP + 'chatAddRess/save',
          data: e.detail.value,
          header: header,
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            if(res.data.result=="true"){
              wx.navigateBack({ changed: true });//返回上一页
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else{
        wx.request({
          url: app.IP + 'chatAddRess/edit',
          data: e.detail.value,
          header: header,
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            if(res.data.result=="true"){
              wx.navigateBack({ changed: true });//返回上一页
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
  }
})