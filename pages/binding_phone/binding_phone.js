// 引入CryptoJS
var WXBizDataCrypt = require('../../utils/crypto.js');
var header = getApp().globalData.header;
// pages/binding_phone/binding_phone.js
var timer=1;
var sessionKey = '';
const app = getApp();
var phone = '';
var code = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_width: wx.getSystemInfoSync().windowWidth * 0.92 - 186,
    sendmsg: "sendmsg", 
    getmsg: "获取验证码", 
    update:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //选择组件对象
    this.verifycode = this.selectComponent("#verifycode");
    var update = options.updatePhone;
    console.log(update)
    if (update){
      that.setData({
        update:2
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
  /** 
 * 获取短信验证码 
 */
  sendmessg: function (e) {
    var that = this;
    console.log(phone);
    wx.request({
      url: app.IP+'chatUser/updateUsernameByNewPhone',
      data: {PHONE:phone},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if(res.data.result=="success"){
          if (timer == 1) {
            timer = 0
            var that = this
            var time = 60
            that.setData({
              sendmsg: "sendmsgafter",
            })
            var inter = setInterval(function () {
              that.setData({
                getmsg: time + "s后重新发送",
              })
              time--
              if (time < 0) {
                timer = 1
                clearInterval(inter)
                that.setData({
                  sendmsg: "sendmsg",
                  getmsg: "获取验证码",
                })
              }
            }, 1000)
          }
        } else {
          wx.showLoading({
            title: res.data.result,
            duration: 1000
          })
        }
      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })
    
  },
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e);
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      console.log(app.AppID + "----" + wx.getStorageSync("session_key"));
      var pc = new WXBizDataCrypt(app.AppID, wx.getStorageSync("session_key"));
      var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
      console.log('解密后 data: ', data)
      wx.request({
        url: app.IP +'chatUser/registersms',
        data: { PHONE: data.purePhoneNumber},
        header: header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          if (res.data.result=="true"){
            console.log(res);
            that.verifycode.showView({
              phone: data.purePhoneNumber,
              inputSuccess: function (phoneCode) {
                console.log("组件关闭");
                console.log(that.verifycode.data.codes);
                var code = that.verifycode.data.codes;
                code = code.join("");
                console.log(code);
                wx.request({
                  url: app.IP + 'chatUser/isCode',
                  data: {
                    PHONE: data.purePhoneNumber,
                    CODE: code
                  },
                  header: header,
                  method: 'GET',
                  dataType: 'json',
                  success: function (res) {
                    console.log(res);
                    if (res.data.result == "success") {
                      console.log(wx.getStorageSync("wxuser"));
                      wx.request({
                        url: app.IP + 'chatUser/register',
                        data: {
                          OPENID: wx.getStorageSync("openid"),
                          PHONE: data.purePhoneNumber,
                          NICKNAME: wx.getStorageSync("wxuser").nickName,
                          HEADIMGURL: wx.getStorageSync("wxuser").avatarUrl
                        },
                        header: header,
                        method: 'GET',
                        dataType: 'json',
                        success: function (res) {
                          console.log(res);
                          if (res.data.result == "true") {
                            console.log("注册成功");
                            that.verifycode.closeView(data.purePhoneNumber);
                            wx.setStorageSync("user", res.data.user);
                            wx.navigateBack({ changed: true });//返回上一页
                          }
                        },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                    } else {

                    }
                  },
                  fail: function (res) { },
                  complete: function (res) { },
                })
                //调用组件关闭方法

                //设置数据
                that.setData({
                  code: phoneCode
                });

              }
            });
          }else{
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.result,
              success: function (res) { }
            })
          }
         
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  },
  savePhone: function(e){
    phone = e.detail.value;
  },
  saveCode: function(e){
    code = e.detail.value;
  },
  bindUserName: function(e){
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
    if(code==''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: app.IP +'chatUser/bindUserName',
      data: {PHONE:phone,
              CODE:code},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if(res.data.result=="true"){
          wx.setStorageSync("user", res.data.user);
          wx.switchTab({
            url: '../mine/mine',
          })
        }
      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })
  }
})