// pages/post_evaluate/post_evaluate.js
const app = getApp();
var header = getApp().globalData.header;
var ORDER_NO = "";
var ORDERFORM_ID = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate_title_width: wx.getSystemInfoSync().windowWidth*0.88-40,
    img1:"../../images/iconfont-evaluate.png",
    img2:"../../images/iconfont-evaluate.png",
    img3:"../../images/iconfont-bad.png",
    good1:'good1',
    general1:-1,
    bad1:-1,
    DESCRIPTION_EVALUATE:[],
    EVALUATE_INFO:[],
    IP:app.IP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 2000
    })
    var that = this;
    ORDER_NO = options.ORDER_NO;
    ORDERFORM_ID = options.ORDERFORM_ID
    wx.request({
      url: app.IP +'chatEvaluate/evaluate',
      data: { ORDER_NO: ORDER_NO,
        ORDERFORM_ID: ORDERFORM_ID},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res);
        that.setData({
          list: res.data.varList
        })
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideToast();
      },
    })
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
  good:function(e){
    var that = this;
    console.log(e);
    var goods_id = e.currentTarget.dataset.goods_id;
    var list = that.data.list;
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (goods_id == list[i].GOODS_ID) {
        list[i].evaluate_buyer_val = 1;
      }
    }    var that = this;
    var up = "DESCRIPTION_EVALUATE[" + e.currentTarget.dataset.index + "]";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
    console.log(goods_id);
    that.setData({
      list:list,
      [up]:5
    })
  },
  general: function (e) {
    var that = this;
    var goods_id = e.currentTarget.dataset.goods_id;
    var list = that.data.list;
    for(var i=0;i<list.length;i++){
      console.log(list[i]);
      if (goods_id == list[i].GOODS_ID){
        list[i].evaluate_buyer_val=0;
      }
    }
    console.log(goods_id);
    var up = "DESCRIPTION_EVALUATE[" + e.currentTarget.dataset.index + "]";//先用一个变量，把(info[0]
    that.setData({
      list:list,
      [up]: 3
    })
  },
  bad: function (e) {
    var that = this;
    var goods_id = e.currentTarget.dataset.goods_id;
    var list = that.data.list;
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (goods_id == list[i].GOODS_ID) {
        list[i].evaluate_buyer_val = -1;
      }
    }    console.log(goods_id);
    var up = "DESCRIPTION_EVALUATE[" + e.currentTarget.dataset.index + "]";//先用一个变量，把(info[0]
    that.setData({
      list:list,
      [up]: 0
    })
  },
  formBindsubmit: function(e){
    console.log(this.data);
    var EVALUATE_INFO = this.data.EVALUATE_INFO;
    if (this.data.EVALUATE_INFO.length!=this.data.list.length){
      wx.showToast({
        title: '有商品未输入评价内容',
      })
      return false;
    }
    var DESCRIPTION_EVALUATE = this.data.DESCRIPTION_EVALUATE;
    if (this.data.DESCRIPTION_EVALUATE.length != this.data.list.length) {
      wx.showToast({
        title: '有商品未评价',
      })
      return false;
    }
    wx.request({
      url: app.IP +'chatEvaluate/saveEvaluate',
      data: { EVALUATE_INFO: EVALUATE_INFO,
        DESCRIPTION_EVALUATE: DESCRIPTION_EVALUATE,
        ORDER_NO: ORDER_NO,
        ORDERFORM_ID: ORDERFORM_ID},
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res);
        wx.redirectTo({
          url: '../evaluate_management/evaluate_management',
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindblur:function(e){
    var that = this;
    var up = "EVALUATE_INFO[" + e.currentTarget.dataset.index + "]";//先用一个变量，把(info[0]
    that.setData({
      [up]: e.detail.value
    })
    console.log(e);
  }
})