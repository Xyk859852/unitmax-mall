// pages/myOrder/myOrder_list.js

var app = getApp();
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
Page({
  data: {
    appIP: app.IP,
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selected4: false,
    isFresh: false,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    page: 2,
    hasMoreData: true,
    orderList: [],
    isShow: true,
    isOperating: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (util.isAvalible(options) && util.isAvalible(options.ORDER_STATUS)) {
      if (options.ORDER_STATUS == 1) {
        this.selected1();
      }
      if (options.ORDER_STATUS == 2) {
        this.selected2();
      }
      if (options.ORDER_STATUS == 3) {
        this.selected3();
      }
      if (options.ORDER_STATUS == 4) {
        this.selected4();
      }
    } else {//查询全部
      this.selected();
    }

    //选择组件对象
    this.toast = this.selectComponent("#toast");
    //选择组件对象
    this.verifycode = this.selectComponent("#verifycode");

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
    // if (that.data.isFresh){
    // that.data.isFresh = false;
    if (that.data.selected1) {
      that.selected1();
    } else if (that.data.selected2) {
      that.selected2();
    } else if (that.data.selected3) {
      that.selected3();
    } else if (that.data.selected4) {
      that.selected4();
    } else {
      that.selected();
    }
    // }
    // this.toast.showView("啦啦啦啦");
    // wx.showToast({
    //   title: "Loading...",
    //   icon: "loading",
    //   duration: 2000
    // })
    // // 页面显示
    // var that = this;
    // wx.request({
    //   url: getApp().IP + 'chatOrder/myOrderList',
    //   // data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: header, // 设置请求的 header
    //   success: function (res) {
    //     // success
    //     if (res.data.result == "true") {
    //       that.setData({
    //         orderList: res.data.orderList,
    //         ORDER_STATUS: res.data.ORDER_STATUS
    //       });
    //     }

    //     if (res.data.result == "1002") {
    //       wx.navigateTo({
    //         url: '../mine/mine',
    //       })
    //     }
    //   },
    //   fail: function () {
    //     // fail
    //     setTimeout(function () {
    //       wx.showToast({
    //         title: "加载失败",
    //         duration: 1500
    //       })
    //     }, 100)
    //   },
    //   complete: function () {
    //     // complete
    //    // wx.hideToast();
    //   }
    // })

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
    console.log("刷新123");
    var that = this;
    // if (that.data.isFresh){
    // that.data.isFresh = false;
    if (that.data.selected1) {
      that.selected1();
    } else if (that.data.selected2) {
      that.selected2();
    } else if (that.data.selected3) {
      that.selected3();
    } else if (that.data.selected4) {
      that.selected4();
    } else {
      that.selected();
    }
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
  selected: function (e) {//查询全部
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected: true,
      page: 1,
      ORDER_STATUS: -1
    });
    this.getMyOrderList('加载更多数据');
  },
  selected1: function (e) {//查询待付款
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected1: true,
      page: 1,
      ORDER_STATUS: 1
    });
    this.getMyOrderList('加载更多数据');
  },
  selected2: function (e) {//查询待发货
    this.setData({
      selected: false,
      selected1: false,
      selected3: false,
      selected2: true,
      selected4: false,
      page: 1,
      ORDER_STATUS: 2
    });
    this.getMyOrderList('加载更多数据');
  },
  selected3: function (e) {//查询待收货
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
      page: 1,
      ORDER_STATUS: 3
    });
    this.getMyOrderList('加载更多数据');
  },
  selected4: function (e) {//查询待评价
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
      page: 1,
      ORDER_STATUS: 4
    });
    this.getMyOrderList('加载更多数据');
  },
  getMyOrderList: function (message) {
    var that = this
    var data = {
      page: that.data.page,
      ORDER_STATUS: that.data.ORDER_STATUS,
    }
    wx.request({
      url: that.data.appIP + 'chatOrder/myOrderList',
      data: data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        var orderListTem = that.data.orderList
        if (res.data.result == "true") {
          if (that.data.page == 1) {
            orderListTem = []
          }

          for (var i = 0; i < res.data.orderList.length; i++) {
            res.data.orderList[i].SHIP_PRICE = util.changeTwoDecimal_f(res.data.orderList[i].SHIP_PRICE);
            res.data.orderList[i].TOTALPRICE = util.changeTwoDecimal_f(res.data.orderList[i].TOTALPRICE);
            for (var j = 0; j < res.data.orderList[i].detailList.length; j++) {
              res.data.orderList[i].detailList[j].GOODS_PRICE = util.changeTwoDecimal_f(res.data.orderList[i].detailList[j].GOODS_PRICE);
            }
          }
          if (res.data.orderList.length < res.data.pageSize) {
            that.setData({
              orderList: orderListTem.concat(res.data.orderList),
              hasMoreData: false
            })
          } else {
            that.setData({
              orderList: orderListTem.concat(res.data.orderList),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          if (res.data.result == "1002") {
            wx.redirectTo({
              url: '../mine/mine',
            })
          } else {
            that.toast.showView(res.data.result);
          }

        }

      },
      fail: function () {
        // fail
        setTimeout(function () {
          that.toast.showView("加载失败");
        }, 100)
      },
      complete: function () {
        // complete
       // wx.hideToast();
      }
    })
  },
  cancelOrder: function (e) {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }
    var ORDERFORM_ID = e.target.dataset.orderform_id;
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.data.isOperating = true;
          // 用户点击了确定        
          wx.request({
            url: getApp().IP + 'chatOrder/cancelOrder?ORDERFORM_ID=' + ORDERFORM_ID,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: header, // 设置请求的 header
            success: function (res) {
              that.data.isOperating = false;
              // success
              if (res.data.result == "true") {
                wx.navigateTo({
                  url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
                });
                that.data.isFresh = true;
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
             // wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },

  delOrder: function (e) {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }
    var ORDERFORM_ID = e.target.dataset.orderform_id;
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
                if (that.data.selected1) {
                  that.selected1();
                } else if (that.data.selected2) {
                  that.selected2();
                } else if (that.data.selected3) {
                  that.selected3();
                } else if (that.data.selected4) {
                  that.selected4();
                } else {
                  that.selected();
                }
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
             // wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },
  confirmReceiveGoods: function (e) {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }
    var ORDERFORM_ID = e.target.dataset.orderform_id;
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
                wx.navigateTo({
                  url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
                });
                that.data.isFresh = true;
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
             // wx.hideToast();
            }
          })
        } else if (sm.cancel) {

        }
      }
    })
  },
  //支付订单
  payOrder: function (e) {
    var that = this;
    var ORDERFORM_ID = e.target.dataset.orderform_id;
    var totalprice = e.target.dataset.totalprice;
    wx.request({
      url: app.IP + 'WxPay/WxXiaoPayS',
      data: { ZHIFUJINE: totalprice },
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
          fail: function () {
            // fail  
            // wx.showToast({
            //   title: '支付失败',
            //   icon: 'success',
            //   duration: 2000
            // });
          },
          complete: function () {
            // complete  
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
                        wx.navigateTo({
                          url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
                        });
                        // wx.navigateTo({
                        //   url: '../place_success/place_success?ORDERFORM_ID=' + ORDERFORM_ID,
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
    //           });
    //           that.data.isFresh = true;
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
  //查看订单详情
  detailOrder: function (e) {
    var ORDERFORM_ID = e.currentTarget.dataset.orderform_id;
    wx.navigateTo({
      url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
    });
  },
  addAfterService: function (e) {
    var ORDERFORM_ID = e.currentTarget.dataset.orderform_id;
    wx.navigateTo({
      url: '../after_service_2/after_service_2?ORDERFORM_ID=' + ORDERFORM_ID,
    });
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getMyOrderList('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getMyOrderList('加载更多数据')
    } else {
      that.toast.showView("没有更多数据");  
    }
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    this.getMyOrderList("加载更多数据");
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }


})