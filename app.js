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
            wx.request({
              url: getApp().IP + 'chatUser/openIdLogin',
              data: { OPENID: res.data.openid},
              header: {},
              method: 'GET',
              dataType: 'json',
              success: function (res) {
                console.log(res);
                if (res.data.result == "true") {
                  wx.setStorageSync("user", res.data.user);
                  getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
                  console.log(getApp().globalData.header);
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          fail: function (res) { },
          complete: function (res) { }
        });
      }
    })
  },
  //app.js
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.personInfo) {
      typeof cb == "function" && cb(this.globalData.personInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.personInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.personInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    objArray:[],
    header: { 'Cookie': '', 'content-type':'application/x-www-form-urlencoded' } //这里还可以加入其它需要的请求头，比如'x-requested-with': 'XMLHttpRequest'表示ajax提交，微信的请求时不会带上这个的
  },
  IP: "http://192.168.31.227:8080/",
  AppID:"wx95c4320e48a6e988"
})