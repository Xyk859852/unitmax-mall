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
    enshrineimg:"../../images/enshrine.png",
    appIP: app.IP,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    selected: true,
    selected1: false,
    selected2: false,
    goodsCartCount: 0,
    service_phone:"",//客服电话
    swiper_height: wx.getSystemInfoSync().windowWidth,
    evaluate_img_width: wx.getSystemInfoSync().windowWidth*0.292,
    commodity_detail_title_left_width: wx.getSystemInfoSync().windowWidth * 0.88-32,
    evaluate_right_width: wx.getSystemInfoSync().windowWidth*0.88-30
  },
  onLoad: function (e) {
    var that = this;
    //选择组件对象
    this.toast = this.selectComponent("#toast");
    
    wx.request({
      url: getApp().IP + 'chatGoods/goodDetail',
      data: {GOODS_ID:e.goods_id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        res.data.good.GOODS_PRICE = util.changeTwoDecimal_f(res.data.good.GOODS_PRICE);
        that.setData({
          good: res.data.good,
          evaluate: res.data.evaluate,
          service_phone: res.data.service_phone,
          goodsEvaCount: res.data.goodsEvaCount[0].evaluateCount
        });
        if (res.data.favorite>0){
          that.setData({
            enshrineimg: "../../images/owned.png"
          })
        }

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
       // wx.hideToast();
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
  onShareAppMessage: function () {
    var good = this.data.good;
    console.log(good);
    return {
      title: good.GOODS_NAME,
      desc: '小事海淘',
      path: '/page/commodity_detail/commodity_detail'
    }
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
          wx.showModal({
            title: '提示',
            content: '用户是否去登陆？',
            success: function (sm) {
              if (sm.confirm) {
                wx.navigateTo({
                  url: '../mine/mine',
                })
              }
            }
          })
         
        } else if (res.data.result == "10001") {//未设置支付密码
          //window.open("<%=basePath%>RongSafety/goSetPay");
        } else {
          console.log(res.data.result);
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
        //wx.hideToast();
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
          setTimeout(function () {
            wx.showToast({
              title: "添加成功",
              duration: 1500
            });
          }, 100)    
        } else if (res.data.result == "1002") {//未登录
          wx.showModal({
            title: '提示',
            content: '用户是否去登陆？',
            success: function (sm) {
              if (sm.confirm) {
                wx.navigateTo({
                  url: '../mine/mine',
                })
              }
            }
          })
        } else if (res.data.result == "moreInventory") {//超过库存
          that.toast.showView("不能再加了"); 
        } else if (res.data.result == "addCountSuccess"){
          wx.showToast({
            title: "添加成功",
            duration: 1500
          })
        }else{
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
       // wx.hideToast();
      }
    }); 
  },
  go_shopping_cart: function(){
    wx.navigateTo({
      url: '../shopping_cart/shopping_cart',
    })
  },
  enshrine:function(e){
    console.log(e);
    var that = this;
    var goods_id = e.currentTarget.dataset.goods_id;
    var img = that.data.enshrineimg;
    if (img == "../../images/owned.png"){
      wx.request({
        url: app.IP + 'chatSupplier/addunFavorite',
        data: { GOODS_ID:goods_id},
        header: header,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          if(res.data.result=="true"){
            that.toast.showView("取消成功");  
            that.setData({
              enshrineimg: "../../images/enshrine.png"
            })
          }
        },
        fail: function(res) {

        },
        complete: function(res) {

        },
      })
    }else{
      wx.request({
        url: app.IP + 'chatSupplier/addfavorite',
        data: { GOODS_ID: goods_id },
        header: header,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          if (res.data.result == "true") {
            that.setData({
              enshrineimg: "../../images/owned.png"
            })
            wx.showModal({
              title: '提示',
              content: '收藏成功是否去列表查看',
              success: function (sm) {
                if (sm.confirm) {
                  wx.navigateTo({
                    url: '../enshrine/enshrine',
                  })
                }
              }
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    // if (this.data.enshrineimg =="../../images/enshrine.png"){
    //   this.setData({
    //     enshrineimg: "../../images/owned.png"
    //   })
    // }else{
    //   this.setData({
    //     enshrineimg:"../../images/enshrine.png"
    //   })
    // }
  },
  callmobile: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.service_phone
    })
  }
})
