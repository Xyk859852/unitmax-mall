//shopping_cart.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cartlist: [
      {
        id: 1,
        good: {
          title: "雷柏v500 RGB机械游戏键盘 机械键盘 黑轴 青轴 游戏键盘 有线背光",
          pic: "",
          tc: 1,
          tcs: [
            "官方标配",
            "套餐一",
            "套餐二",
            "套餐三"
          ],
          tcprices: [
            169,
            200,
            300,
            400
          ],
          price: 169,
          prevprice: 599,
          store: 4,
          "type": {
            id: 1,
            name: "键盘外设"
          }
        },
        num: 1,
        mode: 0,
        checked: false,
      },
      {
        id: 2,
        good: {
          title: "雷柏v500 RGB机械游戏键盘 机械键盘 黑轴 青轴 游戏键盘 有线背光",
          pic: "",
          tc: 1,
          tcs: [
            "官方标配",
            "套餐一",
            "套餐二",
            "套餐三"
          ],
          tcprices: [
            169,
            200,
            300,
            400
          ],
          price: 169,
          prevprice: 599,
          store: 14,
          "type": {
            id: 1,
            name: "键盘外设"
          }
        },
        num: 1,
        mode: 0,
        checked: false,
      },
      {
        id: 3,
        good: {
          title: "雷柏v500 RGB机械游戏键盘 机械键盘 黑轴 青轴 游戏键盘 有线背光",
          pic: "",
          tc: 1,
          tcs: [
            "官方标配",
            "套餐一",
            "套餐二",
            "套餐三"
          ],
          tcprices: [
            169,
            200,
            300,
            400
          ],
          price: 169,
          prevprice: 599,
          store: 14,
          "type": {
            id: 1,
            name: "键盘外设"
          }
        },
        num: 1,
        mode: 0,
        checked: false,
      },
      {
        id: 4,
        good: {
          title: "雷柏v500 RGB机械游戏键盘 机械键盘 黑轴 青轴 游戏键盘 有线背光",
          pic: "",
          tc: 1,
          tcs: [
            "官方标配",
            "套餐一",
            "套餐二",
            "套餐三"
          ],
          tcprices: [
            169,
            200,
            300,
            400
          ],
          price: 169,
          prevprice: 599,
          store: 14,
          "type": {
            id: 1,
            name: "键盘外设"
          }
        },
        num: 1,
        mode: 0,
        checked: false,
      },
      {
        id: 5,
        good: {
          title: "雷柏v500 RGB机械游戏键盘 机械键盘 黑轴 青轴 游戏键盘 有线背光",
          pic: "",
          tc: 1,
          tcs: [
            "官方标配",
            "套餐一",
            "套餐二",
            "套餐三"
          ],
          tcprices: [
            169,
            200,
            300,
            400
          ],
          price: 169,
          prevprice: 599,
          store: 14,
          "type": {
            id: 1,
            name: "键盘外设"
          }
        },
        num: 1,
        mode: 0,
        checked: false,
      }
    ],
    totalPrice: 0,
    totalCount: 0,
    isAll: false,
  commodity_li_width: wx.getSystemInfoSync().windowWidth * 0.88 - 30,
  commodity_li_right_width: wx.getSystemInfoSync().windowWidth * 0.84-110
  },
  onLoad: function () {
  },

  addNum: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    var tc = e.detail.value;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        if (cartlist[i].num < cartlist[i].good.store) {
          cartlist[i].num = cartlist[i].num + 1;
          this.updateNum(id, cartlist[i].num);
        } else {
          wx.showToast({
            title: "不能再加了"
          })
        }
        cartlist[i].num - 1;
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
        if (cartlist[i].num > 1) {
          cartlist[i].num = cartlist[i].num - 1;
          this.updateNum(id, cartlist[i].num);
        } else {
          wx.showToast({
            title: "不能再减了"
          })
        }
        cartlist[i].num - 1;
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
  calcateTotal: function () {
    var cartlist = this.data.cartlist;
    var totalPrice = 0;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked) {
        totalPrice += cartlist[i].good.tcprices[cartlist[i].good.tc] * cartlist[i].num;
      }
    }
    this.setData({
      totalPrice: totalPrice
    })
  },
  checkItem: function (e) {
    var id = e.target.dataset.id;
    var checked = e.detail.value;
    console.log(id)
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        cartlist[i].checked = checked;
        console.log(cartlist[i])
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
        totalPrice += cartlist[i].good.tcprices[cartlist[i].good.tc] * cartlist[i].num;
      }
    }
    console.log(totalPrice)
    this.setData({
      totalPrice: totalPrice
    })
  },
  checkIsAll: function () {
    var cartlist = this.data.cartlist;
    var isAll = cartlist.length != 0 ? true : false;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked == false) {
        isAll = false;
        break;
      }
    }
    this.setData({
      isAll: isAll
    })
  },
})