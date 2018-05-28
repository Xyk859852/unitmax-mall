// 引入CryptoJS
var WXBizDataCrypt = require('../../utils/crypto.js');
// var toastPannel = require('../../components/toast/toast.js');
//mine.js
//获取应用实例
const app = getApp();
var sessionKey;
Page({
  data: {
    content: "自定义toast组件",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    var that = this;
    var user = wx.getStorageSync("user");
    if (user != undefined && user != '' && user != null) {
      that.setData({
        hasUserInfo: true
      })
    }
  },
  onLoad: function () {
    let app = getApp();
   // new app.ToastPannel();
    var that = this;
    var user = wx.getStorageSync("user");
    console.log(user);
    if(user!=undefined&&user!=''&&user!=null){
      that.setData({
        hasUserInfo:true
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e);
    if (e.detail.errMsg =="getUserInfo:ok"){
      wx.setStorageSync("wxuser", e.detail.userInfo);
      console.log(wx.getStorageSync("wxuser"));
      wx.navigateTo({
        url: '../binding_phone/binding_phone'
      })
    }else{
      console.log("拒绝授权");
      wx.openSetting({
        success: function (res) {
          if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
            //这里是授权成功之后 填写你重新获取数据的js
            //参考:
            // that.getLogiCallback('', function () {
            //   callback('')
            // })
          }
        }
      })
    }
  },
  openToastPannel: function () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    let app = getApp();
    // new app.ToastPannel();
    var that = this;
    var user = wx.getStorageSync("user");
    console.log(user);
    if (user != undefined && user != '' && user != null) {
      that.setData({
        hasUserInfo: true
      })
    }
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
  
})
