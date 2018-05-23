// pages/order_detail/order_detail.js
var header = getApp().globalData.header;
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appIP: getApp().IP,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    other_input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    address_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    contact_view_width: wx.getSystemInfoSync().windowWidth * 0.88 - 20,
    service_phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    ORDERFORM_ID: options.ORDERFORM_ID
  });
  //选择组件对象
  this.verifycode = this.selectComponent("#verifycode");
  //选择组件对象
  this.toast = this.selectComponent("#toast");

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
    var that = this;
    wx.request({
      url: getApp().IP + 'chatOrder/orderDetail?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
      data: {},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.result == "true") {
          that.setData({
            order: res.data.order,  
            service_phone: res.data.service_phone        
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  callmobile:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.service_phone
    })
  },
  cancelOrder: function () {
    var that = this;
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定        
          wx.request({
            url: getApp().IP + 'chatOrder/cancelOrder?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              // success
              if (res.data.result == "true") {
                wx.navigateTo({ url: '../myOrder/myOrder_list'});
              }

              if (res.data.result == "1002") {
                wx.switchTab({
                  url: '../mine/mine',
                })
              }
            },
            fail: function () {
              // fail
              setTimeout(function () {
                wx.showToast({
                  title: "请求失败",
                  duration: 1500
                })
              }, 100)
            },
            complete: function () {
              // complete
              wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },

  delOrder: function () {
    var that = this;
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定        
          wx.request({
            url: getApp().IP + 'chatOrder/delOrder?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              // success
              if (res.data.result == "true") {
                wx.navigateTo({ url: '../myOrder/myOrder_list'});
              }

              if (res.data.result == "1002") {
                wx.switchTab({
                  url: '../mine/mine',
                })
              }
            },
            fail: function () {
              // fail
              setTimeout(function () {
                wx.showToast({
                  title: "请求失败",
                  duration: 1500
                })
              }, 100)
            },
            complete: function () {
              // complete
              wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },
  confirmReceiveGoods: function () {
    var that = this;
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.showModal({
      title: '提示',
      content: '确认您已经收到货物？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定        
          wx.request({
            url: getApp().IP + 'chatOrder/confirmReceiveGoods?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              // success
              if (res.data.result == "true") {
                wx.navigateTo({ url: '../myOrder/myOrder_list'});
              }

              if (res.data.result == "1002") {
                wx.switchTab({
                  url: '../mine/mine',
                })
              }
            },
            fail: function () {
              // fail
              setTimeout(function () {
                wx.showToast({
                  title: "请求失败",
                  duration: 1500
                })
              }, 100)
            },
            complete: function () {
              // complete
              wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },
  //支付订单
  payOrder: function () {
    var that = this;
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    that.verifycode.showView({
      phone: '',
      inputSuccess: function (phoneCode) {
        var code = that.verifycode.data.codes;
        code = code.join("");
        that.setData({ ORDERFORM_ID: ORDERFORM_ID });
        wx.request({
          url: app.IP + 'chatOrder/payMoney.do?ORDERFORM_ID=' + ORDERFORM_ID + '&PAY_PASSWORD=' + code,
          data: {
            PHONE: '',
            CODE: code
          },
          header: header,
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            that.verifycode.closeView('');
            if (res.data.result == "true") {
              wx.navigateTo({
                url: '../place_success/place_success?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
              })
            }
            if (res.data.result == "1002") {//未登录
              wx.switchTab({
                url: '../mine/mine',
              })
            }

            if (res.data.result == "10002") {
              that.toast.showView("您的账号已被冻结，无法下单，请联系管理员！");
            }


            if (res.data.result == "1003") {
              that.toast.showView("您的余额不足");
            }


            if (res.data.result == "1004") {
              that.toast.showView("支付密码错误");
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

  },
  addAfterService: function (e) {
    var that = this;
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.navigateTo({
      url: '../after_service_2/after_service_2?ORDERFORM_ID=' + ORDERFORM_ID,
    });
  },
})