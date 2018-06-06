// 引入CryptoJS
var WXBizDataCrypt = require('../../utils/crypto.js');
var header = getApp().globalData.header;
// import tempObj from '../bottom/bottom.js';
var tempObj = require("../../utils/bottom.js");
var util = require("../../utils/util.js");
// var toastPannel = require('../../components/toast/toast.js');
//mine.js
//获取应用实例
const app = getApp();
var sessionKey;
Page({
  data: {
    appIP: getApp().IP,
    content: "自定义toast组件",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    default_head_img: "../../images/default_head_img.png",
    HEADIMGURL: "",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    var that = this;
    var user = wx.getStorageSync("user");
    if (user != undefined && user != '' && user != null) {
      console.log(user);
      that.setData({
        hasUserInfo: true
      })
    }

    //加载信息
    wx.request({
      url: app.IP + 'chatUser/userCenter',
      header: header,
      method: 'GET',
      success: function (res) {
        if (res.data.result == "true") {
          wx.setStorageSync("user", res.data.user);
          that.setData({
            orderCount: res.data.orderCount,
            user: res.data.user,
            NICKNAME: res.data.user.NICKNAME
          });

          if (util.isAvalible(res.data.user.HEADIMGURL)){
            that.setData({
              HEADIMGURL: res.data.user.HEADIMGURL
            });
          }
        }

        if (res.data.result == "1002") {
          wx.navigateTo({
            url: '../mine/mine',
          });
        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    });

  },
  onLoad: function () {
    this.toast = this.selectComponent("#toast");
  },
  getUserInfo: function (e) {
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync("wxuser", e.detail.userInfo);
      console.log(wx.getStorageSync("wxuser"));
      wx.navigateTo({
        url: '../binding_phone/binding_phone'
      })
    } else {

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
    wx.request({
      url: app.IP + 'WxPay/WxXiaoPayS',
      data: { ZHIFUJINE: '0.01' },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.prepay_id,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            // success  
            console.log(res)
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面  
              success: function (res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail: function () {
                // fail  
              },
              complete: function () {
                // complete  
              }
            })
          },
          fail: function () {
            // fail  
            console.log("支付失败")
          },
          complete: function () {
            // complete  
            console.log("pay complete")
          }
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
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
  },
  updateUser: function (e) {
    console.log(e);
    console.log(e.detail.userInfo.nickName);
    console.log(e.detail.userInfo.HEADIMGURL);
    var that = this;
    that.setData({
      NICKNAME: e.detail.userInfo.nickName,
      HEADIMGURL: e.detail.userInfo.HEADIMGURL,
      hasUserInfo: true
    })
    wx.request({
      url: app.IP + 'chatUser/updateUser',
      data: {
        HEADIMGURL: e.detail.userInfo.HEADIMGURL,
        NICKNAME: e.detail.userInfo.nickName
      },
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.result == "true") {
          wx.setStorageSync("user", res.data.user);
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  refund: function (e) {
    wx.request({
      url: app.IP + 'apppay/refundPay',
      data: {
        MONEY: '0.01',
        PAYNO: "f7ee407d6b854390897de2b98d07b3e3"
      },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  gohome: function (e) {
    tempObj.gohome(e);
  },
  gocommodity: function (e) {
    tempObj.gocommodity(e);
  },
  gocategory: function (e) {
    tempObj.gocategory(e);
  },
  goshoppingcart: function (e) {
    tempObj.goshoppingcart(e);
  },
  getUserInfo: function (e) {
    tempObj.getUserInfo(e)
  },
  goMinePage: function(e){
    tempObj.goMinePage(e)
  }
})
