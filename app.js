// var WXBizDataCrypt = require('../../utils/cryptojs/cryptojs.js');
var AppId = 'wx95c4320e48a6e988';
var AppSecret = 'a0453042c687e4d8f08616ca4778f23e';
//app.js
App({
  // ToastPannel,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //调用登录接口，获取 code
    wx.login({
      success: function (res) {
        //发起网络请求
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: AppId,
            secret: AppSecret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'GET',
          success: function (res) {
            wx.setStorageSync("session_key", res.data.session_key);
            wx.setStorageSync("openid", res.data.openid);
            console.log(wx.getStorageSync("session_key"));
            console.log(wx.getStorageSync("openid"));
          },
          fail: function (res) { },
          complete: function (res) { }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    objArray:[]
  },
  IP: "http://192.168.31.227:8080/",
  AppID:"wx95c4320e48a6e988"
})