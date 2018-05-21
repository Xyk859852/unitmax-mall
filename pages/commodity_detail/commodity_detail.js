//commodity_detail.js
//获取应用实例
const app = getApp();
var header = getApp().globalData.header;
var util = require("../../utils/util.js");
Page({
  data: {
    //轮播图
    imgUrls: [
      '../../images/1.png',
      '../../images/2.png',
      '../../images/3.png'
    ],
    appIP: app.IP,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    selected: true,
    selected1: false,
    selected2: false,
    goodsCartCount: 0,
    evaluate_img_width: wx.getSystemInfoSync().windowWidth*0.292,
    commodity_detail_title_left_width: wx.getSystemInfoSync().windowWidth * 0.85-30,
    evaluate_right_width: wx.getSystemInfoSync().windowWidth*0.88-30
  },
  onLoad: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: getApp().IP + 'chatGoods/goodDetail',
      data: {GOODS_ID:e.goods_id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data.good);

        that.setData({
          good: res.data.good
        });

        if (util.isAvalible(res.data.goodsCartCount)){
          that.setData({
            goodsCartCount: res.data.goodsCartCount
          });
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
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  submitOrder: function (){
    var that = this;
    var goodsArray = [];
    var data = { GOODS_ID: that.data.good.GOODS_ID, goodsCount: 1, GOODS_AMOUNT: 1 };
    goodsArray.push(data);
    wx.request({
      url: getApp().IP + 'chatOrder/placeOrder',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        console.log(JSON.stringify(res.data));

        // success
        if (res.data.result == "true") {//跳转到订单页  
          getApp().globalData.objArray = goodsArray;
          wx.navigateTo({
            url: '../place_order/place_order?IDS='
          });
        } else if (res.data.result == "1002") {//未登录
          wx.switchTab({
            url: '../mine/mine',
          })
        } else if (res.data.result == "10001") {//未设置支付密码
          //window.open("<%=basePath%>RongSafety/goSetPay");
        } else {
          console.log(res.data.result);
          wx.showToast({
            title: res.data.result,
            duration: 1500
          });
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
  addGoods: function(){//加入购物车
    var that = this;
    var user = wx.getStorageSync("user");
    if (!util.isAvalible(user)){//未登录

    }
    var goods = that.data.good;
    var data = {
        GOODS_ID: goods.GOODS_ID, PRICE: goods.GOODS_PRICE, GOODS_PRICE: goods.GOODS_PRICE, 
        GOODSTYPE_ID: goods.GOODSTYPE_ID, GOODSTYPE_NAME: goods.GOODSTYPE_NAME,
        GOODSLEVEL_ID: goods.GOODSLEVEL_ID, GOODSLEVEL_NAME: goods.GOODSLEVEL_NAME,
        COUNT: 1, SPEC_INFO: goods.GOODS_NAME
    };
    wx.request({
      url: getApp().IP + 'chatGoodscart/addGoodsCart',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        console.log(JSON.stringify(res));
        console.log(JSON.stringify(res.data));
        if (res.data.result == "true") {//跳转到订单页  
          that.setData({ goodsCartCount: Number(that.data.goodsCartCount)+1});
          wx.showToast({
            title: "添加成功",
            duration: 1500
          })      
        } else if (res.data.result == "1002") {//未登录
          wx.switchTab({
            url: '../mine/mine',
          })
        } else if (res.data.result == "moreInventory") {//超过库存
          wx.showToast({
            title: "商品加购件数超过库存",
            duration: 1500
          });  
        } else if (res.data.result == "exist"){
          wx.showToast({
            title: "商品已在您的购物车中",
            duration: 1500
          });       
        }else{
          wx.showToast({
            title: res.data.result,
            duration: 1500
          });
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
  } 
})
