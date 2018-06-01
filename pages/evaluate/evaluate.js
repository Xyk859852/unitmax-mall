const app = getApp();
var header = getApp().globalData.header;
// pages/evaluate/evaluate.js
var goods_id = '';
var page = 1;
var EVALUATE_BUYER_VAL = '';
var GetList = function (that) {
  wx.showToast({
    title: "加载中...",
    icon: "loading"
  });
  wx.request({
    url: app.IP + 'chatEvaluate/findEvaluateList',
    data: {
      pageSize: 10,
      pageNo: page,
      GOODS_ID:goods_id,
      EVALUATE_BUYER_VAL: EVALUATE_BUYER_VAL
    },
    header: header,
    method: 'GET',
    dataType: 'json',
    success: function (res) {
      console.log(res.data);
      var l = that.data.list
      for (var i = 0; i < res.data.evaluateList.length; i++) {
        console.log(res.data.evaluateList[i])
        if (res.data.evaluateList[i].NAME != '' && res.data.evaluateList[i].NAME!=undefined){
          if (res.data.evaluateList[i].NAME.length == 1) {
            res.data.evaluateList[i].NAME = res.data.evaluateList[i].NAME + "***" + res.data.evaluateList[i].NAME
          } else if (res.data.evaluateList[i].NAME.length == 2) {
            res.data.evaluateList[i].NAME = res.data.evaluateList[i].NAME + "***" + res.data.evaluateList[i].NAME.slice(res.data.evaluateList[i].NAME.length - 1, res.data.evaluateList[i].NAME.length)
          } else {
            res.data.evaluateList[i].NAME = res.data.evaluateList[i].NAME.slice(0, 2) + "***" + res.data.evaluateList[i].NAME.slice(res.data.evaluateList[i].NAME.length - 1, res.data.evaluateList[i].length)
          }
        }else{
          res.data.evaluateList[i].NAME = "匿名";
        }
        
        l.push(res.data.evaluateList[i])
      }
      that.setData({
        list: l,
        goodsEvaCount: res.data.goodsEvaCount
      });
      page++;
      console.log(l.length);
    },
    fail: function (res) { },
    complete: function (res) { 
      wx.hideToast();
    },
  })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    evaluate_right_width: wx.getSystemInfoSync().windowWidth * 0.88 - 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync("user");
    goods_id = options.goods_id;
    console.log(goods_id);

    page = 1;
    that.setData({
      list: [],
      user: user
    })
    GetList(that);
    //wx.hideToast();
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
    console.log("刷新");
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    page = 1;
    this.setData({
      list: []
    });
    GetList(this);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉");
    var that = this;
    GetList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  selected: function (e) {
    var that = this;
    that.setData({
      list:[],
      selected1: false,
      selected2: false,
      selected3: false,
      selected: true
    })
    EVALUATE_BUYER_VAL = '';
    page = 1;
    GetList(that);
  },
  selected1: function (e) {
    var that = this;
    that.setData({
      list:[],
      selected: false,
      selected2: false,
      selected3: false,
      selected1: true
    })
    EVALUATE_BUYER_VAL = 1;
    page = 1;
    GetList(that);
   
  },
  selected2: function (e) {
    var that = this;
    that.setData({
      list:[],
      selected: false,
      selected1: false,
      selected3: false,
      selected2: true,
    })
    EVALUATE_BUYER_VAL = 0;
    page = 1;
    GetList(that);
  },
  selected3: function (e) {
    var that = this;
    this.setData({
      list:[],
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true,
    })
    EVALUATE_BUYER_VAL = -1;
    page = 1;
    GetList(that);
  }
})