//shopping_cart.js
var util = require("../../utils/util.js");
var header = getApp().globalData.header;
var tempObj = require("../../utils/bottom.js");
//获取应用实例
const app = getApp()

Page({
  data: {
    appIP: app.IP,
    totalPrice: '0.00',
    totalCount: 0,
    isAll: false,
    isOperating: false,
    commodity_li_width: wx.getSystemInfoSync().windowWidth * 0.88 - 30,
    commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.84 - 110
  },
  onLoad: function () {
    //选择组件对象
    this.toast = this.selectComponent("#toast");
  },
  onShow: function () {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    // 页面显示
    var that = this;
    wx.request({
      url: app.IP + 'chatGoodscart/toList',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.result == "true") {
          var cartlist = res.data.cartlist;
          for (var i = 0; i < cartlist.length;i++){
            cartlist[i].goods_price = util.changeTwoDecimal_f(cartlist[i].goods_price);
          }
          that.setData({
            cartlist: cartlist,
            totalPrice: '0.00',
            isAll: false,            
          });
        } else if (res.data.result == "noLogin") {//未登录
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
  addNum: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    var tc = e.detail.value;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        if (cartlist[i].count < cartlist[i].goods_inventory) {
          cartlist[i].count = cartlist[i].count + 1;
          this.updateNum(id, cartlist[i].count);
          cartlist[i].price = util.changeTwoDecimal_f(parseFloat(cartlist[i].goods_price) * parseInt(cartlist[i].count));
          this.changeCart(id, cartlist[i].goods_price, cartlist[i].price, cartlist[i].count);
        } else {
          wx.showToast({
            title: "不能再加了"
          })
        }
        cartlist[i].count - 1;
        break;
      }
    }
    this.setData({
      cartlist: cartlist
    })
  },
  delNum: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    var tc = e.detail.value;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        if (cartlist[i].count > 1) {
          cartlist[i].count = cartlist[i].count - 1;
          this.updateNum(id, cartlist[i].count);
          cartlist[i].price = util.changeTwoDecimal_f(parseFloat(cartlist[i].goods_price) * parseInt(cartlist[i].count));
          this.changeCart(id, cartlist[i].goods_price, cartlist[i].price, cartlist[i].count);
        } else {
          wx.showToast({
            title: "不能再减了"
          })
        }
        cartlist[i].count - 1;
        break;
      }
    }
    this.setData({
      cartlist: cartlist
    })
  },
  updateNum: function (id, num) {
    // wx.showToast({
    //   title: "Loading...",
    //   icon: "loading",
    //   duration: 300000
    // })
    // var that = this;
    // wx.request({
    //   url: 'http://localhost:8080/Wxmini/cart_changeNum.do?id=' + id + '&num=' + num,
    //   // data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function (res) {
    //     console.log(res.data)
    //     if (res.data.flag) {
    //       setTimeout(function () {
    //         wx.showToast({
    //           title: "成功",
    //           duration: 1500
    //         })
    //       }, 100)
    //     }
    //   },
    //   fail: function () {
    //     setTimeout(function () {
    //       wx.showToast({
    //         title: "操作失败"
    //       })
    //     }, 100)
    //   },
    //   complete: function () {
    //     wx.hideToast()
    //   }
    // })
    this.calcateTotal()
  },
  checkItem: function (e) {
    var id = e.target.dataset.id;
    var checked = e.detail.value;
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        cartlist[i].checked = checked;
        break;
      }
    }
    this.setData({
      cartlist: cartlist
    })
    this.calcateTotal()
    this.checkIsAll()
  },
  checkAll: function (e) {
    var checked = e.detail.value;
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      cartlist[i].checked = checked;
    }
    this.setData({
      cartlist: cartlist
    })
    this.calcateTotal()
  },
  calcateTotal: function () {
    var cartlist = this.data.cartlist;
    var totalPrice = 0;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked) {
        totalPrice += cartlist[i].goods_price * cartlist[i].count;
      }
    }
    var totalPrice2 = totalPrice.toFixed(3);
    totalPrice = totalPrice2.substring(0, totalPrice2.lastIndexOf('.') + 3);
    this.setData({
      totalPrice: totalPrice
    })
  },
  checkIsAll: function () {
    var cartlist = this.data.cartlist;
    var isAll = cartlist.length != 0 ? true : false;
    for (var i = 0; i < cartlist.length; i++) {
      if (!cartlist[i].checked) {
        isAll = false;
        break;
      }
    }
    this.setData({
      isAll: isAll
    })
  },
  //改变购物车
  changeCart: function (id, goodsprice, price, count) {
    if (id != '' && goodsprice != '' && price != '' && count != '') {
      wx.request({
        url: this.data.appIP + 'appSupplier/change.json',
        data: { ID: id, COUNT: count, PRICE: price, GOODS_PRICE: goodsprice },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: header, // 设置请求的 header
        success: function (res) {

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
    }
  },
  submitOrder: function () {
    var that = this;
    //检查是否选择
    var cartlist = that.data.cartlist;
    var goodsArray = [];
    var IDS = "";
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked) {
        //购物车id
        if (IDS == "") {
          IDS += cartlist[i].id;
        } else {
          IDS += "," + cartlist[i].id;
        }
        //组件选中商品对象数据
        var data = { GOODS_ID: cartlist[i].goods_id, goodsCount: cartlist[i].count, GOODS_AMOUNT: cartlist[i].count };
        goodsArray.push(data);
      }
    }
    if (goodsArray.length == 0) {
      wx.showToast({
        title: "请勾选宝贝",
        duration: 1500
      });
      return;
    }

    wx.request({
      url: that.data.appIP + 'chatOrder/placeOrder',
      data: { goodsObjArray: JSON.stringify(goodsArray) },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.result == "true") {//跳转到订单页  
          getApp().globalData.objArray = goodsArray;
          wx.navigateTo({
            url: '../place_order/place_order?IDS=' + IDS
          });
        } else if (res.data.result == "1002") {//未登录
          wx.navigateTo({
            url: '../mine/mine',
          })
        } else if (res.data.result == "10001") {//未设置支付密码
          //window.open("<%=basePath%>RongSafety/goSetPay");
        } else {
          that.toast.showView(res.data.result);
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

    // getApp().globalData.objArray = goodsArray;
  },
  countInput: function (e) {
    var count = "";
    count = (e.detail.value).replace(/[^\d]/g, '');
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        if (count < cartlist[i].goods_inventory) {
          // if (count == 0) {
          //   count = 1;
          // }
          cartlist[i].count = Number(count);
        }else{
          cartlist[i].count = Number(cartlist[i].goods_inventory);
        }

      }
      this.updateNum(id, cartlist[i].count);
    }
    this.setData({
      cartlist: cartlist
    });
    
  },
  blurCount: function (e) {
    var id = e.target.dataset.id;
    var count = e.detail.value;
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        if (count < cartlist[i].goods_inventory) {
          cartlist[i].count = Number(count);
        } else {
          count = cartlist[i].goods_inventory;
          cartlist[i].count = Number(count);
        }
        this.updateNum(id, cartlist[i].count);
        cartlist[i].price = util.changeTwoDecimal_f(parseFloat(cartlist[i].goods_price) * parseInt(count));
        this.changeCart(id, cartlist[i].goods_price, cartlist[i].price, count);
      }
    }
    this.setData({
      cartlist: cartlist
    })
  },
  gohome: function (e) {
    tempObj.gohome(e);
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
  goodsDetail: function (e) {
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '../commodity_detail/commodity_detail?goods_id=' + goods_id,
    })
  }
})