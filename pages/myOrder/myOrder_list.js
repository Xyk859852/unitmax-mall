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
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    page: 2,
    hasMoreData: true,
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (util.isAvalible(options) && util.isAvalible(options.ORDER_STATUS)){
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
    }else{//查询全部
      this.selected();
    }
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
    //       wx.switchTab({
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
    //     wx.hideToast();
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
      page:1,
      ORDER_STATUS:-1
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
          var orderList = res.data.orderList
          if (orderList.length < res.data.pageSize) {
            that.setData({
              orderList: orderListTem.concat(orderList),
              hasMoreData: false
            })
          } else {
            that.setData({
              orderList: orderListTem.concat(orderList),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: res.data.result,
          })
        }

      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "加载失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  cancelOrder: function (e) {
    var that = this;
    var ORDERFORM_ID = e.target.dataset.orderform_id;
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
                that.onShow();
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

  delOrder: function (e) {
    var that = this;
    var ORDERFORM_ID = e.target.dataset.orderform_id;
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
                that.onShow();
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
  confirmReceiveGoods: function(e){
    var that = this;
    var ORDERFORM_ID = e.target.dataset.orderform_id;
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
                that.onShow();
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
  payOrder: function(e){
    var that = this;
    var ORDERFORM_ID = e.target.dataset.orderform_id;
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
              wx.showToast({
                title: "您的账号已被冻结，无法下单，请联系管理员！",
                duration: 1500
              })
            }


            if (res.data.result == "1003") {
              wx.showToast({
                title: "您的余额不足",
                duration: 1500
              })
            }


            if (res.data.result == "1004") {
              wx.showToast({
                title: "支付密码错误",
                duration: 1500
              })
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
  //查看订单详情
  detailOrder: function (e) {
    var ORDERFORM_ID = e.currentTarget.dataset.orderform_id;
    wx.navigateTo({
      url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
    });
  },
  addAfterService: function(e){
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
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 评价商品 
  */
  goEvaluate:function(e){
    console.log(e);
    var ORDER_NO = e.currentTarget.dataset.order_no;
    var ORDERFORM_ID = e.currentTarget.dataset.orderform_id;
      wx.navigateTo({
        url: '../post_evaluate/post_evaluate?ORDER_NO=' + ORDER_NO + '&ORDERFORM_ID=' + ORDERFORM_ID,
      })
  }


})