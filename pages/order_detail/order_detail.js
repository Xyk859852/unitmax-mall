// pages/order_detail/order_detail.js
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
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
    btn1_width: wx.getSystemInfoSync().windowWidth * 0.5 - 1,
    service_phone: "",//客服电话
    isOperating: false
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
          var order = res.data.order;
          order.SHIP_PRICE = util.changeTwoDecimal_f(order.SHIP_PRICE);
          order.TOTALPRICE = util.changeTwoDecimal_f(order.TOTALPRICE);
          order.GoodsAllPrice = util.changeTwoDecimal_f(order.TOTALPRICE - order.SHIP_PRICE);
          for (var i = 0; i < order.detailList.length; i++) {
            order.detailList[i].GOODS_PRICE = util.changeTwoDecimal_f(order.detailList[i].GOODS_PRICE);
          }
          that.setData({
            order: order,
            service_phone: res.data.service_phone
          });
        }

        if (res.data.result == "1002") {
          wx.navigateTo({
            url: '../mine/mine',
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
    console.log("刷新页面");
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: getApp().IP + 'chatOrder/orderDetail?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
      data: {},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.result == "true") {
          var order = res.data.order;
          order.SHIP_PRICE = util.changeTwoDecimal_f(order.SHIP_PRICE);
          order.TOTALPRICE = util.changeTwoDecimal_f(order.TOTALPRICE);
          order.GoodsAllPrice = util.changeTwoDecimal_f(order.TOTALPRICE - order.SHIP_PRICE);
          for (var i = 0; i < order.detailList.length; i++) {
            order.detailList[i].GOODS_PRICE = util.changeTwoDecimal_f(order.detailList[i].GOODS_PRICE);
          }
          that.setData({
            order: order,
            service_phone: res.data.service_phone
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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
  callmobile: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.service_phone
    })
  },
  cancelOrder: function () {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定
          that.data.isOperating = true;
          wx.request({
            url: getApp().IP + 'chatOrder/cancelOrder?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              that.data.isOperating = false;
              // success
              if (res.data.result == "true") {
                that.successTip(that, "取消成功");
                //wx.navigateTo({ url: '../myOrder/myOrder_list' });
              }

              if (res.data.result == "1002") {
                wx.redirectTo({
                  url: '../mine/mine',
                })
              }
            },
            fail: function () {
              // fail
              setTimeout(function () {
                that.toast.showView("请求失败");
              }, 100)
            },
            complete: function () {
              // complete
              //wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },

  delOrder: function () {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.data.isOperating = true;
          // 用户点击了确定        
          wx.request({
            url: getApp().IP + 'chatOrder/delOrder?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              that.data.isOperating = false;
              // success
              if (res.data.result == "true") {
                that.onShow();
                // that.toast.showView("删除成功");
                // setTimeout(function () {
                //   wx.navigateTo({ url: '../myOrder/myOrder_list' });
                // }, 2000);

              }

              if (res.data.result == "1002") {
                wx.redirectTo({
                  url: '../mine/mine',
                })
              }
            },
            fail: function () {
              // fail
              setTimeout(function () {
                that.toast.showView("请求失败");
              }, 100)
            },
            complete: function () {
              // complete
              //wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },
  confirmReceiveGoods: function () {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.showModal({
      title: '提示',
      content: '确认您已经收到货物？',
      success: function (sm) {
        if (sm.confirm) {
          that.data.isOperating = true;
          // 用户点击了确定        
          wx.request({
            url: getApp().IP + 'chatOrder/confirmReceiveGoods?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              that.data.isOperating = false;
              // success
              if (res.data.result == "true") {
                that.successTip(that, "确认收货成功");
                //wx.navigateTo({ url: '../myOrder/myOrder_list' });
              }

              if (res.data.result == "1002") {
                wx.redirectTo({
                  url: '../mine/mine',
                })
              }
            },
            fail: function () {
              // fail
              setTimeout(function () {
                that.toast.showView("请求失败");
              }, 100)
            },
            complete: function () {
              // complete
              //wx.hideToast();
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
    wx.request({
      url: app.IP + 'WxPay/WxXiaoPayS',
      //data: { ZHIFUJINE: '0.01' },
      data: { ZHIFUJINE: that.data.order.TOTALPRICE },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.data.PAY_NO = res.data.nonceStr;
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.prepay_id,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {//支付成功
            // success  
            // wx.navigateBack({
            //   delta: 1, // 回退前 delta(默认为1) 页面  
            //   success: function (res) {
            //   },
            //   fail: function () {
            //     // fail  
            //   },
            //   complete: function () {
            //     // complete  
            //   }
            // })
          },
          fail: function (res) {
         
          },
          complete: function (res) {//失败 errMsg:"requestPayment:fail cancel" 成功：errMsg:"requestPayment:ok"
            //再次调用接口查询支付是否成功
            wx.request({
              url: app.IP + 'WxPay/wxPubNumIsPaySuccess',
              data: {
                pay_no: that.data.PAY_NO,
              },
              header: header,
              method: 'GET',
              dataType: 'json',
              success: function (res) {
                if (res.data.result == "true") {//验证支付成功
                  wx.request({
                    url: app.IP + 'chatOrder/wxPayMoneySuccess.do',
                    data: {
                      ORDERFORM_ID: ORDERFORM_ID,
                      PAY_TYPE: "1",//支付方式 1：微信支付 2：支付宝支付 3：余额支付 4：线下支付 5：苹果内购',
                      PAY_NO: that.data.PAY_NO
                    },
                    header: header,
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                      if (res.data.result == "true") {
                        that.successTip(that, "支付成功");
                        // wx.navigateTo({
                        //   url: '../place_success/place_success?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
                        // })
                      }
                    },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                } else {

                }
              },
              fail: function (res) {
                that.toast.showView("支付失败");
              },
              complete: function (res) { },
            })
          }
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    });

    //余额支付
    // that.verifycode.showView({
    //   phone: '',
    //   inputSuccess: function (phoneCode) {
    //     var code = that.verifycode.data.codes;
    //     code = code.join("");
    //     that.setData({ ORDERFORM_ID: ORDERFORM_ID });
    //     wx.request({
    //       url: app.IP + 'chatOrder/payMoney.do?ORDERFORM_ID=' + ORDERFORM_ID + '&PAY_PASSWORD=' + code,
    //       data: {
    //         PHONE: '',
    //         CODE: code
    //       },
    //       header: header,
    //       method: 'GET',
    //       dataType: 'json',
    //       success: function (res) {
    //         that.verifycode.closeView('');
    //         if (res.data.result == "true") {
    //           wx.navigateTo({
    //             url: '../place_success/place_success?ORDERFORM_ID=' + that.data.ORDERFORM_ID,
    //           })
    //         }
    //         if (res.data.result == "1002") {//未登录
    //           wx.navigateTo({
    //             url: '../mine/mine',
    //           })
    //         }

    //         if (res.data.result == "10002") {
    //           that.toast.showView("您的账号已被冻结，无法下单，请联系管理员！");
    //         }


    //         if (res.data.result == "1003") {
    //           that.toast.showView("您的余额不足");
    //         }


    //         if (res.data.result == "1004") {
    //           that.toast.showView("支付密码错误");
    //         }
    //       },
    //       fail: function (res) { },
    //       complete: function (res) { },
    //     })
    //     //调用组件关闭方法

    //     //设置数据
    //     that.setData({
    //       code: phoneCode
    //     });

    //   }
    // });

  },
  addAfterService: function (e) {
    var that = this;
    var ORDERFORM_ID = that.data.ORDERFORM_ID;
    wx.navigateTo({
      url: '../after_service_2/after_service_2?ORDERFORM_ID=' + ORDERFORM_ID,
    });
  },
  /**
   * 评价商品 
  */
  goEvaluate: function (e) {
    console.log(e);
    var ORDER_NO = e.currentTarget.dataset.order_no;
    var ORDERFORM_ID = e.currentTarget.dataset.orderform_id;
    if (ORDER_NO == undefined || ORDER_NO == '' || ORDER_NO == null
      || ORDERFORM_ID == null || ORDERFORM_ID == '' || ORDERFORM_ID == '') {
      this.toast.showView("请求错误");
    } else {
      wx.navigateTo({
        url: '../post_evaluate/post_evaluate?ORDER_NO=' + ORDER_NO + '&ORDERFORM_ID=' + ORDERFORM_ID,
      })

    }

  },
  afterServiceDetail: function (e) {
    console.log(e);
    var sellafterid = e.currentTarget.dataset.sellafterid;
    var orderform_id = e.currentTarget.dataset.orderform_id;
    if (sellafterid == null || sellafterid == '' || sellafterid == undefined
      || orderform_id == null || orderform_id == undefined || orderform_id == '') {
      this.toast.showView("请求错误");
    } else {
      wx.navigateTo({
        url: '../after_service_detail/after_service_detail?sellafterid=' + sellafterid + '&orderform_id=' + orderform_id,
      })

    }


  },
  successTip: function (that, msg) {
    that.onShow();
    that.toast.showView(msg);
    // that.toast.showView(msg);
    // setTimeout(function(){
    //   that.onShow();
    // },2000);
  },
  goodsDetail: function (e) {
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '../commodity_detail/commodity_detail?goods_id=' + goods_id,
    })
  }
})