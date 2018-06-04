// pages/add_address/add_address.js
var type ="";
const app = getApp();
var header = getApp().globalData.header;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    input_width2: wx.getSystemInfoSync().windowWidth * 0.84 - 105
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toast = this.selectComponent("#toast");
    console.log(options);
    type = options.TYPE;
    if(type == "edit"){
      wx.setNavigationBarTitle({
        title: "修改地址"//页面标题为路由参数
      })
      this.setData({
        CONSIGNEE: options.CONSIGNEE,
        TAKEPHONE: options.TAKEPHONE,
        address: options.MOBLE,
        ADDRESS_DTEAIL: options.ADDRESS_DTEAIL,
        ADDRESSBOOK_ID: options.ADDRESSBOOK_ID,
        ISDEFAULT: options.ISDEFAULT,
        LATITUDE: options.LATITUDE,
        LONGITUDE: options.LONGITUDE
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
      var phone = e.detail.value.TAKEPHONE;
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        this.toast.showView("手机号有误");
        return false;
      }
      if(phone.length > 11) {
        this.toast.showView("手机号有误");
        return false;
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