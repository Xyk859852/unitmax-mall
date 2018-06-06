var header = getApp().globalData.header;
var util = require("../../utils/util.js");
var app = getApp();
// pages/usercenter/usercenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appIP: getApp().IP,
    HEADIMGURL: "",
    NICKNAME: "",
    isOperating: false,
    loginStatus: true,
    default_head_img: "../../images/default_head_img.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //选择组件对象
    this.toast = this.selectComponent("#toast");
    var that = this;
    wx.request({
      url: app.IP + 'chatUser/findCurLoginUser',
      data: {},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.result == "true") {
          that.setData({ NICKNAME: res.data.user.NICKNAME, HEADIMGURL: res.data.user.HEADIMGURL });
          //用户信息放进缓存
          wx.setStorageSync("user", res.data.user);
        }

        if (res.data.result == "1002") {
          wx.navigateTo({
            url: '../binding_phone/binding_phone?updatePhone=true',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

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
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        that.uploadHeadImg(tempFilePaths);
      }
    })
  },
  uploadHeadImg: function (imageParth) {
    var that = this;
    wx.uploadFile({
      url: app.IP + 'chatUser/uploadHeadImg',
      filePath: imageParth,
      name: 'file',
      header: {
        'Cookie': '',
        'Content-Type': 'multipart/form-data'
      },
      //formData: data,
      success: function (res) {
        var resdata = JSON.parse(res.data);
        if (resdata.result == "true") {
          that.setData({
            HEADIMGURL:resdata.HEADIMGURL
          });
        }
      },
      fail: function (res) {
        that.toast.showView("上传失败");
      },
      complete: function (res) {

      },
    });
  },
  saveUserInfo: function () {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }

    if (!util.isAvalible(that.data.HEADIMGURL)) {
      that.toast.showView("请上传头像");
      return;
    }

    if (!util.isAvalible(that.data.NICKNAME)) {
      that.toast.showView("请输入昵称");
      return;
    }


    that.data.isOperating = true;
    wx.request({
      url: getApp().IP + 'chatUser/updateUser',
      data: { HEADIMGURL: that.data.HEADIMGURL, NICKNAME: that.data.NICKNAME },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.data.isOperating = false;
        if (res.data.result == "true") {
          wx.showToast({
            title: '保存成功',
            duration: 1500
          })
        }

        if (res.data.result == "1002") {
          wx.navigateTo({
            url: '../binding_phone/binding_phone?updatePhone=true',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  updateNickName: function (e) {
    this.setData({ NICKNAME: e.detail.value });
  },
  //同步用户微信信息
  getUserInfo: function (e) {
    var that = this;
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync("wxuser", e.detail.userInfo);
      //发送后台修改数据
      wx.request({
        url: getApp().IP + 'chatUser/updateUser',
        data: { HEADIMGURL: e.detail.userInfo.avatarUrl, NICKNAME: e.detail.userInfo.nickName,imgFrom:"wxUserInfo" },
        header: header,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          that.data.isOperating = false;
          if (res.data.result == "true") {
            that.setData({ HEADIMGURL: res.data.user.HEADIMGURL, NICKNAME: res.data.user.NICKNAME });
            wx.showToast({
              title: '同步成功',
              duration: 1500
            })
          }

          if (res.data.result == "1002") {
            wx.navigateTo({
              url: '../binding_phone/binding_phone?updatePhone=true',
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
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

    // if (!that.data.loginStatus) {
    //   wx.openSetting({
    //     success: function (data) {
    //       if (data) {
    //         if (data.authSetting["scope.userInfo"] == true) {
    //           that.data.loginStatus = true;
    //           wx.getUserInfo({
    //             withCredentials: false,
    //             success: function (data) {
    //               console.info("2成功获取用户返回数据");
    //               console.info(data.userInfo);
    //             },
    //             fail: function () {
    //               console.info("2授权失败返回数据");
    //             }
    //           });
    //         }
    //       }
    //     },
    //     fail: function () {
    //       console.info("设置失败返回数据");
    //     }
    //   });
    // } else {
    //   wx.login({
    //     success: function (res) {
    //       if (res.code) {
    //         wx.getUserInfo({
    //           withCredentials: false,
    //           success: function (data) {
    //             console.info("1成功获取用户返回数据");
    //             console.info(data.userInfo);
    //           },
    //           fail: function () {
    //             console.info("1授权失败返回数据");
    //             that.data.loginStatus = false;
    //             // 显示提示弹窗
    //             wx.showModal({
    //               title: '提示标题',
    //               content: '提示内容',
    //               success: function (res) {
    //                 if (res.confirm) {
    //                   console.log('用户点击确定')
    //                 } else if (res.cancel) {
    //                   wx.openSetting({
    //                     success: function (data) {
    //                       if (data) {
    //                         if (data.authSetting["scope.userInfo"] == true) {
    //                           that.data.loginStatus = true;
    //                           wx.getUserInfo({
    //                             withCredentials: false,
    //                             success: function (data) {
    //                               console.info("3成功获取用户返回数据");
    //                               console.info(data.userInfo);
    //                             },
    //                             fail: function () {
    //                               console.info("3授权失败返回数据");
    //                             }
    //                           });
    //                         }
    //                       }
    //                     },
    //                     fail: function () {
    //                       console.info("设置失败返回数据");
    //                     }
    //                   });
    //                 }
    //               }
    //             });
    //           }
    //         });
    //       }
    //     },
    //     fail: function () {
    //       console.info("登录失败返回数据");
    //     }
    //   });
    // }
  }
})