// 引入CryptoJS
var WXBizDataCrypt = require('../../utils/crypto.js');
//mine.js
//获取应用实例
const app = getApp();
var sessionKey;
Page({
  data: {
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
  onLoad: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(res);
        //微信js_code
        that.setData({ wxcode: res.code });
        //发起网络请求
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: "wx95c4320e48a6e988",
            secret: "a0453042c687e4d8f08616ca4778f23e",
            js_code: code,
            grant_type: 'authorization_code'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'GET',
          success: function (res) {
            console.log(res);
            sessionKey = res.data.session_key;
          }
      })
      }
    })
  },
  getUserInfo: function (e) {
    
  }
  
})
