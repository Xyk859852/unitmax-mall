// pages/place_order/place_order.jsvar app = getApp();
var util = require("../../utils/util.js");
var header = getApp().globalData.header;
//获取应用实例
const app = getApp()

var province = (util.province || []).map(v => {
  return v.title
});
// 获取到的province["上海市", "江苏省", "浙江省", "安徽省", "北京市", "重庆市", ...]
var city = ((util.city || []).filter(v => { return v.parent_code == "jt" }) || []).map(v => {
  return v.title
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appIP: app.IP,
    Delivery: "第三方物流",
    payment: "微信",
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 80,
    other_input_width: wx.getSystemInfoSync().windowWidth * 0.88 - 56,
    address_width: wx.getSystemInfoSync().windowWidth * 0.84 - 40,
    address_left: wx.getSystemInfoSync().windowWidth * 0.08 + 20,
    p_c: [["今天"], ["1:00"]],
    //对应的数组下标 eg: pcIndex[1,2]指的是 p_c[0][1] 省的名称 和 p_c[1][2] 市的名称
    pcIndex: [0, 0],
    MSG: '', //留言
    TOTALPRICE: 0.00,  //总价格
    TRANS_FEE: 0.00, //运费
    goodsCartId: '',//购物车id
    goodsList: null,///商品集合
    defaultAddress: {
      CONSIGNEE: "",
      ADDRESSBOOK_ID: "",
      TAKEPHONE: "",
      PROVINCE: "",
      CITY: "",
      DISTRICT: "",
      ADDRESS_DTEAIL: "",
      isOperating: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.p_c[0] = province
    this.data.p_c[1] = city
    //初始化p_c
    this.setData({ p_c: this.data.p_c });
    console.log(this.data.p_c);
    console.log(options);
    this.setData({ goodsCartId: options.IDS });

    //选择组件对象
    this.verifycode = this.selectComponent("#verifycode");
    //选择组件对象
    this.toast = this.selectComponent("#toast");

    this.initData();
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {

  },
  pkIndex: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pcIndex: e.detail.value
    })
  },
  pkCol: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      p_c: this.data.p_c,
      pcIndex: this.data.pcIndex
    };

    //如果选择省则区的数组会变
    if (e.detail.column == 0) {
      //code默认值为上海
      var code = "sh";
      // 获取我们选择省所对应的code
      (util.province || []).some(v => {
        if (v.title == province[e.detail.value]) {
          code = v.code
          // if选择北京 则code值变为 "bj" 并返回true
          return true
        }
        return false
      });
      // 选取parent_code为"bj"的所有区 把所有区的title放到一个city数组里面

      var city = ((util.city || []).filter(v => { return v.parent_code == code }) || []).map(v => {
        return v.title
      });
      //把区的变化和下标的变化设置data里就ok
      data.p_c[1] = city
      data.pcIndex[0] = e.detail.value
    } else {
      data.pcIndex[1] = e.detail.value;
    }
    this.setData(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  showDelivery: function () {
    var that = this;
    var itemList = ['物流', '快递', 'EMS'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex)
        that.setData({
          Delivery: itemList[res.tapIndex]
        });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showpayment: function () {
    var that = this;
    var itemList = ['微信', '支付宝', '余额'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex)
        that.setData({
          payment: itemList[res.tapIndex]
        });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  calculateFinalPrice: function () {
    var TOTALPRICE = 0;
    var TRANS_FEE = 0;
    var goodsList = this.data.goodsList;
    for (var i = 0; i < goodsList.length; i++) {
      TOTALPRICE += goodsList[i].GOODS_PRICE * goodsList[i].buyGoodsCount;
      TRANS_FEE += goodsList[i].TRANS_FEE;
    }
    TOTALPRICE += TRANS_FEE;
    this.setData({
      TOTALPRICE: util.changeTwoDecimal_f(TOTALPRICE),
      TRANS_FEE: util.changeTwoDecimal_f(TRANS_FEE)
    });
  },
  selectAddress: function () {//选择地址
    wx.navigateTo({
      url: '../address_management/address_management?page_from=place_order',
    });

  },
  submitOrder: function () {
    var that = this;
    //判断是否重复提交
    if (that.data.isOperating) {
      that.toast.showView("正在提交，请稍候…");
      return;
    }

    //判断是否选择地址
    if (!util.isAvalible(that.data.defaultAddress)) {
      that.toast.showView("请选择地址");
      return;
    }
    var data = {};
    var SHIP_PRICE = 0.00;
    data.ADDRESSBOOK_ID = that.data.defaultAddress.ADDRESSBOOK_ID;
    data.RECEIVE_TRUENAME = that.data.defaultAddress.CONSIGNEE;
    data.RECEIVE_MOBILE = that.data.defaultAddress.TAKEPHONE;
    data.RECEIVE_PROVINCE = that.data.defaultAddress.PROVINCE;
    data.RECEIVE_CITY = that.data.defaultAddress.CITY;
    data.RECEIVE_DISTRICT = that.data.defaultAddress.DISTRICT;
    data.RECEIVE_ADDRESS = that.data.defaultAddress.ADDRESS_DTEAIL;
    data.MSG = that.data.MSG;
    var goodsList = that.data.goodsList;
    var goodsList2 = [];
    for (var i = 0; i < goodsList.length; i++) {
      var goods = {
        GOODS_ID: goodsList[i].GOODS_ID,
        GOODS_NAME: goodsList[i].GOODS_NAME,
        GOODSTYPE_NAME: goodsList[i].GOODSTYPE_NAME,
        GOODSLEVEL_NAME: goodsList[i].GOODSLEVEL_NAME,
        GOODS_PRICE: goodsList[i].GOODS_PRICE,
        GOODS_IMG: goodsList[i].IMGSRC,
        TRANS_FEE: goodsList[i].TRANS_FEE,
        GOODS_TOTAL_PRICE: util.changeTwoDecimal_f(goodsList[i].buyGoodsCount * goodsList[i].GOODS_PRICE),
        GOODS_AMOUNT: goodsList[i].buyGoodsCount
      }
      goodsList2.push(goods);
      SHIP_PRICE += goodsList[i].TRANS_FEE;
    }
    data.SHIP_PRICE = SHIP_PRICE;
    data.TOTALPRICE = that.data.TOTALPRICE;
    data.goodsList = JSON.stringify(goodsList2);
    if (util.isAvalible(that.data.goodsCartId)) {
      data.IDS = that.data.goodsCartId;
    }
    that.data.isOperating = true;
    wx.request({
      url: app.IP + 'chatOrder/saveOrder',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header,  // 设置请求的 header
      success: function (res) {
        that.data.isOperating = false;
        // success
        if (res.data.result == "true") {
          var ORDERFORM_ID = res.data.ORDERFORM_ID;
          wx.request({
            url: app.IP + 'WxPay/WxXiaoPayS',
            //data: { ZHIFUJINE: '0.01' },
            data: { ZHIFUJINE: that.data.TOTALPRICE },
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
                fail: function (res) {//失败或关闭进入订单详情
                  wx.redirectTo({
                    url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
                  })
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
                              that.toast.showView("支付成功");
                              setTimeout(function(){
                                wx.redirectTo({
                                  url: '../order_detail/order_detail?ORDERFORM_ID=' + ORDERFORM_ID,
                                }) 
                              },2000);
                             
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
                      wx.showToast({
                        title: '支付失败',
                        icon: 'success',
                        duration: 2000
                      });
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
        } else {//未登录
          if (res.data.result == "1002") {//未登录
            wx.navigateTo({
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
    });
  },
  addNum: function (e) {
    var id = e.target.dataset.id;
    var goodsList = this.data.goodsList;
    var TOTALPRICE = this.data.TOTALPRICE;
    var tc = e.detail.value;
    for (var i = 0; i < goodsList.length; i++) {
      if (goodsList[i].GOODS_ID == id) {
        if (goodsList[i].buyGoodsCount < goodsList[i].GOODS_INVENTORY) {
          goodsList[i].buyGoodsCount = goodsList[i].buyGoodsCount + 1;
          TOTALPRICE = util.changeTwoDecimal_f(parseFloat(TOTALPRICE) + parseFloat(goodsList[i].GOODS_PRICE));
        } else {
          this.toast.showView("不能大于库存");
        }
        break;
      }
    }
    this.setData({
      goodsList: goodsList,
      TOTALPRICE: TOTALPRICE
    })
  },
  delNum: function (e) {
    var id = e.target.dataset.id;
    var goodsList = this.data.goodsList;
    var TOTALPRICE = this.data.TOTALPRICE;
    var tc = e.detail.value;
    for (var i = 0; i < goodsList.length; i++) {
      if (goodsList[i].GOODS_ID == id) {
        if (goodsList[i].buyGoodsCount > 1) {
          goodsList[i].buyGoodsCount = goodsList[i].buyGoodsCount - 1;
          TOTALPRICE = util.changeTwoDecimal_f(parseFloat(TOTALPRICE) - parseFloat(goodsList[i].GOODS_PRICE));
        } else {
          // this.toast.showView("不能小于1");
        }
        break;
      }
    }
    this.setData({
      goodsList: goodsList,
      TOTALPRICE: TOTALPRICE
    })
  },
  countInput: function (e) {
    var count = "";
    count = (e.detail.value).replace(/[^\d]/g, '');
    var id = e.target.dataset.id;
    var goodsList = this.data.goodsList;
    for (var i = 0; i < goodsList.length; i++) {
      if (goodsList[i].id == id) {
        if (count < goodsList[i].GOODS_INVENTORY) {
          if (count == 0) {
            count = 1;
          }
          goodsList[i].buyGoodsCount = Number(count);
        } else {
          goodsList[i].buyGoodsCount = Number(goodsList[i].GOODS_INVENTORY);
        }

      }

    }
    this.calculateFinalPrice();
    this.setData({
      goodsList: goodsList
    });

  },
  blurCount: function (e) {
    // var id = e.target.dataset.id;
    // var count = e.detail.value;
    // var goodsList = this.data.goodsList;
    // for (var i = 0; i < goodsList.length; i++) {
    //   if (goodsList[i].id == id) {
    //     if (count < goodsList[i].GOODS_INVENTORY) {
    //       goodsList[i].buyGoodsCount = Number(count);
    //     } else {
    //       count = goodsList[i].GOODS_INVENTORY;
    //       goodsList[i].buyGoodsCount = Number(count);
    //     }

    //   }
    // }
    // this.calculateFinalPrice();
    // this.setData({
    //   goodsList: goodsList
    // })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  initData: function () {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    // 页面显示
    var that = this;
    wx.request({
      url: app.IP + 'chatOrder/placeOrderSuccess',
      data: { goodsObjArray: JSON.stringify(getApp().globalData.objArray), IDS: that.data.goodsCartId },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header,  // 设置请求的 header
      success: function (res) {
        console.log(res);
        // success
        if (res.data.result == "true") {
          var goodsList = res.data.goodsList;
          for (var i = 0; i < goodsList.length; i++) {
            goodsList[i].GOODS_PRICE = util.changeTwoDecimal_f(goodsList[i].GOODS_PRICE);
          }
          that.setData({
            goodsList: res.data.goodsList,
            defaultAddress: res.data.defaultAddress
          });
          that.calculateFinalPrice();
        } else if (res.data.result == "1002") {//未登录
          wx.navigateTo({
            url: '../mine/mine',
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
    });
  },
  msgBlur: function (e) {
    var MSG = e.detail.value;
    this.setData({
      MSG: MSG
    });
  }
})