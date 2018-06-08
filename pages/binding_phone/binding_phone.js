// 引入CryptoJS
var WXBizDataCrypt = require('../../utils/crypto.js');
var util = require("../../utils/util.js");
var header = getApp().globalData.header;
// pages/binding_phone/binding_phone.js
var timer = 1;
var sessionKey = '';
const app = getApp();
var phone = '';
var code = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appIP: app.IP,
    phone_input_width: wx.getSystemInfoSync().windowWidth * 0.92 - 56,
    input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 178,
    sendmsg: "sendmsg",
    getmsg: "获取验证码",
    update: 1,
    login_img:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.onLaunch();
    var that = this;
    //选择组件对象
    this.verifycode = this.selectComponent("#verifycode");
    //选择组件对象
    this.toast = this.selectComponent("#toast");
    var update = options.updatePhone;
    if (util.isAvalible(options.fromPage)) {
      that.setData({
        fromPage: options.fromPage
      })
    }
    if (update) {
      that.setData({
        update: 2
      })
    }
    
    //加载信息
    wx.request({
      url: app.IP + 'chatConfig/findByName',
      header: header,
      method: 'GET',
      data: {NAME:"切换账号图标"},
      success: function (res) {      
        console.log(res);
        if (res.data.result == "true") {
          that.setData({
            login_img: res.data.PARAMS
          });
        }else{
         // that.toast.showView(res.data.result);
        }

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    });
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
    if (!util.isAvalible(phone)) {
      that.toast.showView('请输入手机号');
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      that.toast.showView('手机号有误');
      return;
    }

    if (phone.length > 11) {
      that.toast.showView('手机号有误');
      return;
    }

    wx.request({
      url: app.IP + 'chatUser/updateUsernameByNewPhone',
      data: { PHONE: phone },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.result == "true") {
          if (timer == 1) {
            timer = 0
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
      fail: function (res) {

      },
      complete: function (res) {

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
      // wx.showModal({
      //   title: '提示',
      //   showCancel: false,
      //   content: '未授权',
      //   success: function (res) { }
      // })
    } else {
      console.log(app.AppID + "----" + wx.getStorageSync("session_key"));
      var pc = new WXBizDataCrypt(app.AppID, wx.getStorageSync("session_key"));
      var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
      console.log('解密后 data: ', data)
      console.log(data)
      wx.request({
        url: app.IP + 'chatUser/wxQuickLogin',
        data: {
          PHONE: data.purePhoneNumber,
          OPENID: wx.getStorageSync("openid")
          // NICKNAME: wx.getStorageSync("wxuser").nickName,
          // HEADIMGURL: wx.getStorageSync("wxuser").avatarUrl
        },
        header: header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data.result == "true") {
            wx.setStorageSync("user", res.data.user);
            console.log();
            if (util.isAvalible(that.data.fromPage)) {
              wx.redirectTo({
                url: '../' + that.data.fromPage + '/' + that.data.fromPage,
              });             
            } else {
              wx.navigateBack({ changed: true });//返回上一页
            }


            //   console.log(res);
            //   that.verifycode.showView({
            //     phone: data.purePhoneNumber,
            //     inputSuccess: function (phoneCode) {
            //       console.log("组件关闭");
            //       console.log(that.verifycode.data.codes);
            //       var code = that.verifycode.data.codes;
            //       code = code.join("");
            //       console.log(code);
            //       wx.request({
            //         url: app.IP + 'chatUser/isCode',
            //         data: {
            //           PHONE: data.purePhoneNumber,
            //           CODE: code
            //         },
            //         header: header,
            //         method: 'GET',
            //         dataType: 'json',
            //         success: function (res) {
            //           console.log(res);
            //           if (res.data.result == "success") {
            //             console.log(wx.getStorageSync("wxuser"));
            //             wx.request({
            //               url: app.IP + 'chatUser/register',
            //               data: {
            //                 OPENID: wx.getStorageSync("openid"),
            //                 PHONE: data.purePhoneNumber,
            //                 NICKNAME: wx.getStorageSync("wxuser").nickName,
            //                 HEADIMGURL: wx.getStorageSync("wxuser").avatarUrl
            //               },
            //               header: header,
            //               method: 'GET',
            //               dataType: 'json',
            //               success: function (res) {
            //                 console.log(res);
            //                 if (res.data.result == "true") {
            //                   console.log("注册成功");
            //                   that.verifycode.closeView(data.purePhoneNumber);
            //                   wx.setStorageSync("user", res.data.user);
            //                   wx.navigateBack({ changed: true });//返回上一页
            //                 }
            //               },
            //               fail: function (res) { },
            //               complete: function (res) { },
            //             })
            //           } else {
            //             that.toast.showView(res.data.result);
            //           }
            //         },
            //         fail: function (res) { },
            //         complete: function (res) { },
            //       });
            //       //设置数据
            //       that.setData({
            //         code: phoneCode
            //       });

            //     }
            //   });
          } else {
            that.toast.showView(res.data.result);
          }

        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  savePhone: function (e) {
    phone = e.detail.value;
  },
  saveCode: function (e) {
    code = e.detail.value;
  },
  bindUserName: function (e) {
    var that = this;
    if (!util.isAvalible(phone)) {
      that.toast.showView('请输入手机号');
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      that.toast.showView('手机号有误');
      return;
    }
    if (phone.length > 11) {
      that.toast.showView('手机号有误');
      return;
    }

    if (code == '') {
      that.toast.showView('输入验证码');
      return;
    }
    wx.request({
      url: app.IP + 'chatUser/bindUserName',
      data: { PHONE: phone, CODE: code },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.result == "true") {
          wx.setStorageSync("user", res.data.user);
          wx.navigateBack({ changed: true });//返回上一页
          // wx.redirectTo({
          //   url: '../mine/mine',
          // });
        } else {
          that.toast.showView(res.data.result);
        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  }
})